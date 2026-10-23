# English expression course

One pack is one topic. Each topic has six lessons: two beginner, two
intermediate, and two advanced. Each lesson has 15–16 expressions, so each
topic has at least 30 expressions at every proficiency level. The level is
stored on the node and travels with roadmap and learning responses.

Use `polite` as the ordinary respectful conversational register, `casual` for
frequent expressions between familiar people, and `formal` where a professional
setting calls for it. Include some natural casual expressions in every level;
do not construct matching casual and polite versions of every sentence.

## Topic order

| Order | Topic |
| --- | --- |
| 1 | Greetings and goodbyes |
| 2 | Introductions and personal details |
| 3 | Clarifying and checking understanding |
| 4 | Thanks and apologies |
| 5 | Requests and offers |
| 6 | Time and scheduling |
| 7 | Family and relationships |
| 8 | Daily routines |
| 9 | Hobbies and free time |
| 10 | Small talk |
| 11 | Emergencies and safety |
| 12 | Restaurants and cafes |
| 13 | Groceries |
| 14 | Shopping |
| 15 | Payments and returns |
| 16 | Directions and public transit |
| 17 | Airports and tickets |
| 18 | Lodging |
| 19 | Appointments |
| 20 | Phone calls |
| 21 | Health and medical visits |
| 22 | Housing and repairs |
| 23 | Banking and public services |
| 24 | Online orders and delivery |
| 25 | School and learning |
| 26 | Social invitations |
| 27 | Travel plans |
| 28 | Workplace basics |
| 29 | Customer service |
| 30 | Job interviews |
| 31 | Meetings |
| 32 | Work calls, emails, and presentations |
| 33 | Experiences and storytelling |
| 34 | News and feelings |
| 35 | Giving and receiving advice |
| 36 | Agreement and disagreement |
| 37 | Problem solving |
| 38 | Persuasion and negotiation |
| 39 | Culture, media, and sports |
| 40 | Social issues |

The English registry imports complete topics explicitly. Validate without
touching the database:

```powershell
pnpm --filter api seed:validate-expressions --courseId=en-general
```

Running `seed:expressions` writes to the database and is a separate operation.
