---
obsidianUIMode: preview
---

This shortcut-file includes shortcuts made for Ironsworn Moves.

__

__
```js
function getVar(notePath, fmVar) {
    // Remove any quotes around the note path parameter
    notePath = notePath.replaceAll(/^\"|\"$/g, "");

    // If notename is ".", change it to the current file
    if (notePath === ".") { notePath = app.workspace.getActiveFile()?.path; }

    // Get the file object for the specified note.  Early if not available or is a folder
    const file = app.vault.fileMap[notePath] || app.vault.fileMap[notePath + ".md"];
    if (!file)
    {
        return expFormat([ "", "No value.  Note __" + notePath + "__ not found." ]);
    }
    if (file.children)
    {
        return expFormat(
            [ "", "No value.  __" + notePath + "__ is a folder." ]);
    }

    // Get the file's cached data.  Early out if not available.
    const cache = app.metadataCache.getFileCache(file);
    if (!cache)
    {
        return expFormat(
            [ "", "No value.  Note __" + notePath + "__ is not properly cached by Obsidian." ]);
    }

    // Get the front-matter object
    // If no front-matter, early out (no message, since it technically worked, but the
    // variable is empty)
    const fm = cache.frontmatter;
    if (!fm)
    {
        return null;
    }

    // Get the variable valuable
    const result = fm[fmVar] || fm[fmVar + ":"] || null;

    // Return the result.  If it's an array, it's joined to a single string.
    return Array.isArray(result) ? result.join(",") : result;
}
```
__

__

__
```js
function getSoloCharacter() {
    const file = app.vault.fileMap["Characters"];
    return file.children[0].name.replace(".md", "");
}
```
__


__
^getmovename ([a-zA-Z]*)$
__
```js
let anyCase = $1;
let moveInitials = anyCase.toUpperCase();

var moveName = "";

switch (anyCase.toUpperCase()) {
	case "AAT": // <-------------------------------
		moveName = "Advance a Threat";
		break;	
    case "ADVANCE":
        moveName = "Advance";
        break;  
    case "ATO":
        moveName = "Ask the Oracle";
        break;        
    case "AYA":
        moveName = "Aid Your Ally";
        break;
    case "BATTLE":
        moveName = "Battle";
        break;          
    case "CAMP":
	    moveName = "Make Camp";
	    break;
	case "CEH":
        moveName = "Companion Endure Harm";
        break;	    
    case "CLASH":
        moveName = "Clash";
        break;  	    
    case "COMPEL":
        moveName = "Compel";
        break;	
	case "CYG":
        moveName = "Check Your Gear";
        break;	        
	case "DAS": // <-------------------------------
		moveName = "Discover a Site";
		break;    
	case "DTD": // <-------------------------------
		moveName = "Delve the Depths";
		break;				        
    case "DUEL":
        moveName = "Draw the Circle";
        break;   
    case "EH":
        moveName = "Endure Harm";
        break;        
    case "ENDF":
        moveName = "End the Fight";
        break;          
    case "ETF":
        moveName = "Enter the Fray";
        break;         
    case "EPILOGUE":
        moveName = "Write Your Epilogue";
        break;  
    case "ES":
        moveName = "Endure Stress";
        break; 
	case "ETD": // <-------------------------------
		moveName = "Escape the Depths";
		break;	                             
    case "FAB":
        moveName = "Forge a Bond";
        break;    
	case "FAO": // <-------------------------------
		moveName = "Find an Opportunity";
		break;	         
	case "FDANGER":
        moveName = "Face Danger";
        break;
    case "FDEATH":
        moveName = "Face Death";
        break;    
    case "FDESOLATION":
        moveName = "Face Desolation";
        break;  
    case "FORSAKE":
        moveName = "Forsake Your Vow";
        break;            
	case "FSETBACK":
        moveName = "Face Setback";
        break;  
    case "FULFILL":
        moveName = "Fulfill Your Vow";
        break;                        
	case "GI":
        moveName = "Gather Information";
        break;
    case "HEAL":
        moveName = "Heal";
        break;
	case "LFYF": // <-------------------------------
		moveName = "Learn From Your Failures";
		break;        
	case "LYO": // <-------------------------------
		moveName = "Locate Your Objective";
		break;	
	case "MYF": // <-------------------------------
		moveName = "Mark Your Failure";
		break;		        
    case "OOS":
        moveName = "Out of Supply";
        break;   
    case "PTP":
        moveName = "Pay the Price";
        break;   
	case "RAD": // <-------------------------------
		moveName = "Reveal a Danger";
		break;               
    case "RAM":
        moveName = "Reach a Milestone";
        break;            
    case "RESUPPLY":
        moveName = "Resupply";
        break;
    case "RYD":
        moveName = "Reach Your Destination";
        break;                                  
    case "SAA":
        moveName = "Secure an Advantage";
        break;  
    case "SAIV":
        moveName = "Swear an Iron Vow";
        break;                    
    case "SOJOURN":
        moveName = "Sojourn";
        break;        
    case "STRIKE":
        moveName = "Strike";
        break;   
    case "TAH": // <-------------------------------
        moveName = "Take a Hiatus";
        break;             
    case "TTT":
        moveName = "Turn the Tide";
        break;               
    case "TYB":
        moveName = "Test Your Bond";
        break;          
    case "UAJ":
        moveName = "Undertake a Journey";
        break;  
	case "WAR": // <-------------------------------
		moveName = "Wield a Rarity";
		break;	              
    default:
        moveName = "No such move!";
}

var splitStr = moveName.toLowerCase().split(' ');
for (var i = 0; i < splitStr.length; i++) {
   // You do not need to check if i is larger than splitStr length, as your for does that for you
   // Assign it back to the array
   splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
}
// Directly return the joined string
let capName = splitStr.join(' '); 

return moveName;
```
__
getmovename {move initials} - A helper function to get the full name of a move or the markdown of the full move.  IMPORTANT: Single word moves use the full word rather than the initials.

__
^move ([a-zA-Z]*) ([a-zA-Z]*) ([0-9]*) ?([_a-zA-Z0-9]*)$
__
```js
var characterFile = "Character_File_Name_Here";
let moveName = expand("getmovename " + $1);
let statName = $2.charAt(0).toUpperCase() + $2.slice(1).toLowerCase();
var addValue = $3;
if (!$4) {
	characterFile = getSoloCharacter();
} else {
    characterFile = $4;
}

let statValue = getVar("Characters/" + characterFile, statName);
let d10A = Math.floor(Math.random() * 10) + 1;
let d10B = Math.floor(Math.random() * 10) + 1;
let d6 = Math.floor(Math.random() * 6) + 1;
var actionRoll = d6 + Number(statValue) + Number(addValue);
if (actionRoll > 10) {actionRoll = 10;}
var result = "";
var image = "";
let calloutType = "> [!challenge-miss]+";
if (actionRoll > d10A && actionRoll > d10B) {
    result = "Strong Hit";
    calloutType = "> [!challenge-strong]-";
    image = "![[outcome-strong-hit.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
} else if (actionRoll > d10A || actionRoll > d10B) {
    result = "Weak Hit";
    calloutType = "> [!challenge-weak]-";
    image = "![[outcome-weak-hit.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
} else {
    result = "Miss";
    calloutType = "> [!challenge-miss]-";
    image = "![[outcome-miss.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
}
let characterName = getVar("Characters/" + characterFile, "Name");
let calloutTitle = calloutType + " " + characterName + " " + moveName + ": " + statName + " + " + addValue;
let actionResult = "\n> ![[d6-" + d6 + "-t.svg#invert_W|50]]![[plus-t.svg#invert_W|15]]![[stat-" + statValue + "-t.svg#invert_W|50]]![[plus-t.svg#invert_W|15]]![[add-" + addValue + "-t.svg#invert_W|50]]![[equals-t.svg#invert_W|15]]![[total-" + actionRoll + "-t.svg#invert_W|50]]";
let challengeResult = "\n> ![[vs-t.svg#invert_W|50]]![[d10-" + d10A + "-t.svg#invert_W|50]]![[and-t.svg#invert_W|50]]![[d10-" + d10B + "-t.svg#invert_W|50]]";
let outcome = "\n> ### Result: " + image + " " + result;
resultCallout = calloutTitle + actionResult + challengeResult + outcome + "\n\n";
return resultCallout;
```
__
move {move initials} {stat} {add value} {optional: Which character filename?} - For this to know which character stat to use, make sure to use the EXACT file name of the character in the Character folder which can include letters, numbers, and underscore. If left out, it defaults to the first file name in the Character folder.  Then this shortcut will make a challenge roll using the provided stat and add amount on the move provided.  IMPORTANT: Single word moves use the full word rather than the initials. i.e. Use "Battle" instead of just "B".   

__
^moved ([a-zA-Z]*) ([a-zA-Z]*) ([0-9]*) ([0-9]*) ([0-9]*) ?([_a-zA-Z0-9]*)$
__
```js
var characterFile = "Character_File_Name_Here";
let moveName = expand("getmovename " + $1);
let statName = $2.charAt(0).toUpperCase() + $2.slice(1).toLowerCase();
let d10A = Number($3);
let d10B = Number($4);
let d6 = Number($5);
if (!$6) {
	characterFile = getSoloCharacter();
} else {
    characterFile = $6;
}

let statValue = getVar("Characters/" + characterFile, statName);
var actionRoll = d6 + Number(statValue);
if (actionRoll > 10) {actionRoll = 10;}
var result = "";
var image = "";
let calloutType = "> [!challenge-miss]+";
if (actionRoll > d10A && actionRoll > d10B) {
    result = "Strong Hit";
    calloutType = "> [!challenge-strong]-";
    image = "![[outcome-strong-hit.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
} else if (actionRoll > d10A || actionRoll > d10B) {
    result = "Weak Hit";
    calloutType = "> [!challenge-weak]-";
    image = "![[outcome-weak-hit.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
} else {
    result = "Miss";
    calloutType = "> [!challenge-miss]-";
    image = "![[outcome-miss.svg|50]]";
    if (d10A == d10B) {
        result = result + " with a MATCH!";
    }
}
let characterName = getVar("Characters/" + characterFile, "Name");
let calloutTitle = calloutType + " " + characterName + " " + moveName + ": " + statName;
let actionResult = "\n> ![[d6-" + d6 + "-t.svg#invert_W|50]]![[plus-t.svg#invert_W|15]]![[stat-" + statValue + "-t.svg#invert_W|50]]![[equals-t.svg#invert_W|15]]![[total-" + actionRoll + "-t.svg#invert_W|50]]";
let challengeResult = "\n> ![[vs-t.svg#invert_W|50]]![[d10-" + d10A + "-t.svg#invert_W|50]]![[and-t.svg#invert_W|50]]![[d10-" + d10B + "-t.svg#invert_W|50]]";
let outcome = "\n> ### Result: " + image + " " + result;
resultCallout = calloutTitle + actionResult + challengeResult + outcome + "\n\n";
return resultCallout;
```
__
moved {move initials} {stat} {d10A} {d10B} {d6} {optional: Which character filename?} - For this to know which character stat to use, make sure to use the EXACT file name of the character in the Character folder which can include letters, numbers, and underscore. If left out, it defaults to the first file name in the Character folder.    

__
^moveref ([a-zA-Z]*)$
__
```js
let moveName = expand("getmovename " + $1);
let moveCallout = "> [!mechanics]- " + moveName + "\n> ![[" + moveName.replace(/ /g,"_") + "]]\n\n";
return moveCallout;
```
__
moveref {move initials} - gives a callout box with the move information

__
^mech
__
```js
return ">[!mechanics]- Mechanical Results or Choices\n>";
```
__
mech - Returns the beginning of a mechanics box for you to detail the mechanical consequences of a move or action.