# Word collections

Collections are an additive membership layer over the existing vocabulary.
They store references to active `Word._id` values, never copies of words.
`Word`, `placements`, `UserWordProgress`, seeds and existing `/words` routes do
not require a migration or backfill. Collection reads do not mark words seen.

The original course is always available as `course-ko-general` or
`course-en-general`, built from current placements without inserting a document.
Its groups have IDs such as `s1-u2` and preserve the original unit ordering.
Course-level counts deduplicate words which occur in more than one unit.

## Learner API

All endpoints require the existing app JWT. Supply `courseId` and
`targetLanguage` consistently (`ko-general`/`ko` or `en-general`/`en`). Missing
scope retains the existing Korean default. Wrong-course collection IDs return 404. Metadata `lang` is the UI language; word `lang` is the explanation language.

| Method | Path                                      | Purpose                                                    |
| ------ | ----------------------------------------- | ---------------------------------------------------------- |
| GET    | `/word-collections`                       | Localized collection summaries and this user's saved state |
| GET    | `/word-collections/:id`                   | Summary, groups, and the user's last position              |
| GET    | `/word-collections/:id/words?groupId=...` | Existing word response, collection order, shared SRS       |
| POST   | `/word-collections/:id/save`              | Save a collection                                          |
| DELETE | `/word-collections/:id/save`              | Unsave while retaining the cursor and all word progress    |
| PATCH  | `/word-collections/:id/position`          | Save `{groupId,cardIndex,lastWordId?}` and mark as saved   |

Word pages accept `limit` (1–100) and `cursor` (the last returned word code).
An unrelated cursor is rejected. Positions are anchored to the original word
ID, so an editorial reorder can update the numeric index without changing the
word being resumed. Enrollment and position documents are isolated by user ID
and collection ID; they never replace `UserWordProgress`.

Lists place recently studied collections first. Saving or unsaving alone does
not update study recency. A virtual course with existing word progress initially
appears saved; an explicit unsave takes precedence.

## Authoring API

Deploy the API before the new clients. No new production content is automatically
published by this change, and no seed-writing command is needed.

The existing admin JWT and `content:read` / `content:write` permissions protect
`/admin/content/word-collections`. Available operations are GET list (scoped),
GET `/:id`, POST create, PUT `/:id` full metadata replacement, and DELETE `/:id`
archive. Writes are recorded through the existing admin audit service.

Example create body, replacing every placeholder with an existing active word
ID from the same course:

```json
{
  "code": "ko-classroom-basics",
  "courseId": "ko-general",
  "targetLanguage": "ko",
  "kind": "topic",
  "level": "beginner",
  "cover": "paper",
  "title": {
    "ko": "교실에서 쓰는 한국어",
    "en": "Korean in the classroom",
    "uz": "Sinfda ishlatiladigan koreyscha so‘zlar",
    "ru": "Корейские слова для занятий"
  },
  "groups": [
    {
      "id": "classroom-1",
      "title": {
        "ko": "첫 번째 묶음",
        "en": "First group",
        "uz": "Birinchi guruh",
        "ru": "Первая группа"
      },
      "wordIds": ["<existing Word _id>"]
    }
  ],
  "isActive": false
}
```

All four title/group translations are required. An optional description follows
the same four-language shape. `kind` is `course`, `textbook`, `exam`, `level`, or
`topic`; level is `beginner`, `intermediate`, `advanced`, or `mixed`. Covers are
`paper`, `ink`, `violet`, or `mist`. Do not infer textbook membership or exam
frequency from existing course placement; an editor must verify those sources.

Creation defaults to inactive. After reviewing references, translations and the
actual content, PUT the complete body with `isActive: true`. Stable `code`,
`courseId` and `targetLanguage` cannot be changed after creation. Reusing a word
in another group or collection shares its existing memory state. Removing a
reference or archiving a collection affects membership/visibility only.

The existing 64 KB HTTP body limit still applies; no global request limits are
expanded. Each group accepts at most 500 IDs and a document at most 200 groups
and 10,000 distinct references, subject to that request limit. Existing active
course placement is required so the original seen/review APIs remain valid.

## Checks

```powershell
pnpm --filter api exec jest --runInBand word-collections.spec.ts words-course.spec.ts
pnpm --filter api build
```
