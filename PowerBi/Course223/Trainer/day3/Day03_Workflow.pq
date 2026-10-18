// Optional instructor reference. Create a Text parameter named Day03Root first.
// Its current value is the actual Day03 folder containing Sources and Reference.
let
    Root = Text.TrimEnd(Day03Root, {"/", Character.FromNumber(92)}),
    Columns = {"RecordID", "EmployeeID", "Department", "EvaluationType", "Period", "EvaluationDate", "EvaluatorID", "ObjectiveID", "ObjectiveWeight", "KPIID", "Score", "Status"},
    CleanText = (value as any) as nullable text =>
        if value = null then null
        else Text.Trim(Text.Clean(Text.Replace(Text.From(value), Character.FromNumber(160), " "))),
    ReadCsv = (content as binary) as table =>
        Table.PromoteHeaders(Csv.Document(content, [Delimiter=",", Encoding=65001, QuoteStyle=QuoteStyle.Csv]), [PromoteAllScalars=true]),
    CleanEvaluation = (content as binary) as table =>
        let
            Raw = ReadCsv(content),
            SchemaChecked = if List.Sort(Table.ColumnNames(Raw)) = List.Sort(Columns) then Raw
                else error Error.Record("Schema", "Unexpected CSV columns", Table.ColumnNames(Raw)),
            Trimmed = Table.TransformColumns(SchemaChecked, List.Transform(Columns, (column) => {column, CleanText, type nullable text})),
            TextFixed = Table.TransformColumns(Trimmed, {
                {"Department", each if _ = "HR" then "Human Resources" else _, type text},
                {"EvaluationType", each Text.Proper(_), type text},
                {"Status", each Text.Proper(_), type text}}),
            Typed = Table.TransformColumns(TextFixed, {
                {"Score", each if _ = null or _ = "" then null else
                    let n = Number.FromText(Text.Trim(Text.Replace(_, "pts", "")), "en-US")
                    in if n >= 0 and n <= 100 then n else error Error.Record("Score", "Score outside 0-100", n), Int64.Type},
                {"ObjectiveWeight", each Number.FromText(_, "en-US"), Int64.Type},
                {"EvaluationDate", each Date.FromText(_, [Format="dd/MM/yyyy", Culture="en-GB"]), type date}}),
            UniqueRows = Table.Distinct(Typed)
        in UniqueRows,
    Files = Folder.Files(Root & "/Sources"),
    CsvFiles = Table.SelectRows(Files, each Text.Lower([Extension]) = ".csv" and Text.StartsWith([Name], "Evaluations_") and [Attributes]?[Hidden]? <> true),
    Tables = Table.AddColumn(CsvFiles, "Data", (file) => Table.AddColumn(CleanEvaluation(file[Content]), "Source.Name", each file[Name], type text)),
    Combined = if Table.RowCount(Tables) = 0 then error "No evaluation CSV files in Sources" else Table.Combine(Tables[Data]),
    RecordChecked = if Table.RowCount(Combined) = Table.RowCount(Table.Distinct(Table.SelectColumns(Combined, {"RecordID"}))) then Combined
        else error "RecordID repeated across files. Review source files before loading.",
    EmployeesRaw = ReadCsv(File.Contents(Root & "/Reference/Employees.csv")),
    EmployeesText = Table.TransformColumns(EmployeesRaw, List.Transform(Table.ColumnNames(EmployeesRaw), (column) => {column, CleanText, type nullable text})),
    Employees = Table.TransformColumns(EmployeesText, {{"Department", each if _ = "HR" then "Human Resources" else _, type text}}),
    EmployeesChecked = if Table.RowCount(Employees) = Table.RowCount(Table.Distinct(Table.SelectColumns(Employees, {"EmployeeID"})))
        then Employees else error "Duplicate EmployeeID in lookup. Review before Merge.",
    Merged = Table.NestedJoin(RecordChecked, {"EmployeeID"}, EmployeesChecked, {"EmployeeID"}, "Employee", JoinKind.LeftOuter),
    Expanded = Table.ExpandTableColumn(Merged, "Employee", {"EmployeeName", "Department", "Location"}, {"EmployeeName", "EmployeeDepartment", "Location"})
in
    Expanded
