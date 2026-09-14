# X Academy — Guided Learning Enrollment Experience

Rebuilt from the supplied X Academy project as a new Vanilla HTML/CSS/JavaScript experience.

## Public journey
- Arabic default (Almarai), full Arabic/English toggle (English uses Inter)
- `LEARN. ANALYSE. LEAD.` accessible scramble loader with reduced-motion fallback
- Ultra-clean editorial hero
- Course selection shows only course names + availability state
- Strict linear full-screen journey
- Overview → Outcomes → Curriculum → Schedule → Certificate → Name → Mobile → Job Title → Email → Review → Price/Offer → Manual Payment → Confirmation
- Information-only and full-course flows adapt automatically
- Arab-country phone selector with flags and dialing codes
- Local draft persistence
- Firebase registrations + visit/session/event tracking
- UTM, referrer, device, viewport, visitor/session tracking

## Admin
Open `admin.html` and sign in with the existing Firebase Authentication admin account.
- Hybrid dashboard with conversion funnel
- Dynamic Courses collection: add/edit/hide/information/open/closed
- Arabic + English content fields
- Certificate image URL + copy
- Cohorts: price, status, capacity, promotion, payment instructions, schedule generator
- Registrations: search/filter/export/status/payment verification
- Visitors detail
- Audit log

## Firebase
Project: `x-academy-registration` (same supplied Firebase project).

### Important deployment step
Publish the included `firestore.rules` to Firebase Firestore Rules before relying on the new `courses`, `cohorts`, and `auditLogs` collections.

The first admin dashboard provides **تهيئة البيانات الحالية** if the new collections are empty. It seeds the supplied Excel and Power BI content and schedules into `courses` and `cohorts`.

## Hosting
All public files are static and suitable for GitHub Pages/Firebase Hosting. Serve over HTTP(S); do not open `index.html` directly with the `file://` protocol because ES modules require a web server.
