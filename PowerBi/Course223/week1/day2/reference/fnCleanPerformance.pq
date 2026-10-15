// Blank Query -> Advanced Editor -> paste as fnCleanPerformance
// Invoke with the Content (Binary) of the chosen CSV. Returns Clean, Review and Audit tables.
(Source as binary) as record =>
let
    Raw = Table.PromoteHeaders(Csv.Document(Source,[Delimiter=",",Encoding=65001,QuoteStyle=QuoteStyle.Csv]),[PromoteAllScalars=true]),
    Exact = Table.Buffer(Table.Distinct(Raw)),
    Normalize = (v as any) as text => if v=null then "" else Text.Trim(Text.Clean(Text.Replace(Text.From(v),Character.FromNumber(160)," "))),
    Texts = Table.TransformColumns(Exact,List.Transform(Table.ColumnNames(Exact),(c)=>{c,Normalize,type text})),
    Counts = Table.Group(Texts,{"RecordKey"},{{"Versions",each Table.RowCount(_),Int64.Type}}),
    Joined = Table.NestedJoin(Texts,{"RecordKey"},Counts,{"RecordKey"},"Counts",JoinKind.LeftOuter),
    Expanded = Table.ExpandTableColumn(Joined,"Counts",{"Versions"}),
    Reason = Table.AddColumn(Expanded,"ReviewReason",each Text.Combine(List.RemoveNulls({if [Versions]>1 then "ConflictingKey" else null,if [EmployeeID]="" then "MissingEmployeeID" else null}),"|"),type text),
    Review = Table.RemoveColumns(Table.SelectRows(Reason,each [ReviewReason]<>""),{"Versions"}),
    Accepted = Table.RemoveColumns(Table.SelectRows(Reason,each [ReviewReason]=""),{"Versions","ReviewReason"}),
    MapValue = (v as text, pairs as list) as text => let hit=List.Select(pairs,each _{0}=v) in if List.IsEmpty(hit) then v else hit{0}{1},
    Mapped = Table.TransformColumns(Accepted,{
      {"Department",each MapValue(_,{{"HR","Human Resources"},{"Human Resorces","Human Resources"},{"IT","Information Technology"},{"Finanace","Finance"},{"","Unassigned"}}),type text},
      {"EvaluationType",each MapValue(_,{{"Self Assessment","Self"},{"Manager Evaluation","Manager"},{"Manger","Manager"},{"Upward Feedback","Upward"}}),type text},
      {"Status",each MapValue(_,{{"complete","Completed"},{"Done","Completed"},{"PENDING","Pending"},{"In progress","Pending"}}),type text}}),
    ScoreParsed = Table.AddColumn(Mapped,"ScoreClean",each let n=try Number.FromText(Text.Replace([Score]," pts",""),"en-US") otherwise null in if [Status]="Pending" then null else if n=null then null else if n<0 or n>100 then null else n,type nullable number),
    DateParsed = Table.AddColumn(ScoreParsed,"DateClean",each try (let s=[EvaluationDate],fmt=if Text.Contains(s,"-") then "yyyy-MM-dd" else if Text.Length(Text.BeforeDelimiter(s,"/"))=4 then "yyyy/MM/dd" else "dd/MM/yyyy" in Date.FromText(s,[Format=fmt,Culture="en-GB"])) otherwise null,type nullable date),
    Quality = Table.AddColumn(DateParsed,"QualityFlag",each Text.Combine(List.RemoveNulls({if [ScoreClean]=null then "MissingOrInvalidScore" else null,if [DateClean]=null then "DateReview" else null,if [Department]="Unassigned" then "DepartmentReview" else null}),"|"),type text),
    Removed = Table.RemoveColumns(Quality,{"Score","EvaluationDate"}),
    Renamed = Table.RenameColumns(Removed,{{"ScoreClean","Score"},{"DateClean","EvaluationDate"}}),
    Typed = Table.TransformColumnTypes(Renamed,{{"ExpectedKPIs",Int64.Type},{"ObjectiveWeight",type number}},"en-US"),
    Indexed = Table.AddIndexColumn(Typed,"SourceOrder",0,1,Int64.Type),
    BatchNull = Table.ReplaceValue(Indexed,"",null,Replacer.ReplaceValue,{"BatchLabel"}),
    Batches = Table.Group(BatchNull,{"BatchID"},{{"Rows",each Table.FillDown(Table.Sort(_ ,{{"SourceOrder",Order.Ascending}}),{"BatchLabel"}),type table}}),
    Clean = Table.RemoveColumns(Table.Sort(Table.Combine(Batches[Rows]),{{"SourceOrder",Order.Ascending}}),{"SourceOrder"}),
    Audit = #table({"Metric","Value"},{{"RawRows",Table.RowCount(Raw)},{"ExactDuplicates",Table.RowCount(Raw)-Table.RowCount(Exact)},{"ReviewRows",Table.RowCount(Review)},{"CleanRows",Table.RowCount(Clean)},{"ValidScores",List.NonNullCount(Clean[Score])},{"ScoreSum",List.Sum(Clean[Score])}})
in [Clean=Clean,Review=Review,Audit=Audit]
