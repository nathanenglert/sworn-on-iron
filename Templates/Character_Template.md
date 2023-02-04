---
Name: Character Name
Edge: 3
Heart: 2
Iron: 1
Shadow: 1
Wits: 2
Health: 5
Spirit: 5
Supply: 5
Momentum: 2
Wounded: ⬡
Shaken: ⬡
Unprepared: ⬡
Encumbered: ⬡
Maimed: ⬡
Corrupted: ⬡
Cursed: ⬡
Tormented: ⬡
XPSpent: 0
Bonds_Progress: 0
Bonds_TrackImage: "[[progress-track-0.svg]]"
Bonds_XPEarned: 0
Quests_Progress: 0
Quests_TrackImage: "[[progress-track-0.svg]]"
Quests_XPEarned: 0
---
# `=this.Name`
Maybe image here

## Stats
| Edge | Heart | Iron | Shadow | Wits |
| --- | --- | --- | --- | --- |
| `=this.Edge` | `=this.Heart` | `=this.Iron` | `=this.Shadow` | `=this.Wits` |

## Meters
| Health | Spirit | Supply | Momentum |
| --- | --- | --- | --- |
| `=this.Health` | `=this.Spirit` | `=this.Supply` | `=this.Momentum` |

## DEBILITIES
| Misfortunes | Banes | Burdens |
| --- | --- | --- |
| `=this.Wounded` Wounded | `=this.Maimed` Maimed | `=this.Cursed` Cursed |
| `=this.Shaken` Shaken | `=this.Corrupted` Corrupted | `=this.Tormented` Tormented |
| `=this.Unprepared` Unprepared |  |  |
|  `=this.Encumbered` Encumbered |  |  |

## Legacies
| XP Earned | XP Spent |
| --- | --- |
| `=this.Bonds_XPEarned+this.Quests_XPEarned` | `=this.XPSpent` |
### Bonds (Rolled Over? `=choice(this.Bonds_Progress > 40, "Yes", "No")`)
```dataview
LIST without id embed(link(meta(Bonds_TrackImage).path, "350"))
WHERE contains(file.path, this.file.path)
```
### Quests (Rolled Over? `=choice(this.Quests_Progress > 40, "Yes", "No")`)
```dataview
LIST without id embed(link(meta(Quests_TrackImage).path, "350"))
WHERE contains(file.path, this.file.path)
```
## Vows / Progress Tracks
```dataview
TABLE Name, embed(link(meta(TrackImage).path, "150")) AS Progress
FROM #incomplete WHERE file.name != "Progress_Template" 
```
## Assets
Embed assets here like this:
![[Sniper]]