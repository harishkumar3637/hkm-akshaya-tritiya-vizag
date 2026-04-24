# MongoDB CMS Content Model

The CMS stores event content in the `event_sections` collection by default.

Each document represents one typed section of one event page:

```json
{
  "slug": "akshaya-tritiya",
  "section": "importance",
  "value": {
    "eyebrow": "Temple Significance",
    "title": "Akshaya Tritiya Importance",
    "description": "A sacred day...",
    "items": []
  },
  "updatedAt": "2026-04-22T00:00:00.000Z"
}
```

The app creates a unique index on `{ slug: 1, section: 1 }`, so saving from the admin screen updates each section independently.

Supported `section` values:

```txt
themeName
hero
overview
importance
impact
privileges
donationHighlights
seva
contributors
donationForm
```

Environment variables:

```env
MONGODB_URI="mongodb+srv://USER:PASSWORD@CLUSTER.mongodb.net/event?retryWrites=true&w=majority"
MONGODB_DB_NAME="event"
MONGODB_EVENT_SECTIONS_COLLECTION="event_sections"
```

If `MONGODB_URI` is missing, the app falls back to the static event data in `src/data/events`.
