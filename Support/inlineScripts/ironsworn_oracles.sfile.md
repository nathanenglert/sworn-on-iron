---
obsidianUIMode: preview
---

This shortcut-file includes shortcuts made for Ironsworn Oracles.

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
^getOracle ("[^ \t\\:*?"<>|][^\t\\:*?"<>|]*"|[^ \t\\:*?"<>|]+)$
__
```js
oracle = $1.replaceAll(/^\"|\"$/g, "");
let iResult = expand("tbl roll " + $1);
let capResult = iResult[0].toUpperCase();
var trueResult = "";
var result1 = "";
var result2 = "";
if (capResult.contains("ROLL TWICE")) {
    result1 = expand("tbl roll " + oracle);
    result2 = expand("tbl roll " + oracle);
    trueResult = "Roll Twice - " + result1 + ", " + result2;
} else if (capResult.contains("ACTION") && capResult.contains("THEME")) {
    result1 = expand("tbl roll Oracles/Core/Core_Action.md");
    result2 = expand("tbl roll Oracles/Core/Core_Theme.md");
    trueResult = "Action/Theme - " + result1 + " " + result2;
} else if (capResult.contains("DESCRIPTOR") && iResult[0].contains("FOCUS")) {
    result1 = expand("tbl roll Oracles/Core/Core_Descriptor.md");
    result2 = expand("tbl roll Oracles/Core/Core_Focus.md");
    trueResult = "Descriptor/Focus - " + result1 + " " + result2;
} else {
    trueResult = iResult[0];
}
return trueResult;
```
__
getOracle {path} - get oracle result but check for Roll Twice, Action/Theme, and Descriptor/Focus

__
^oracle (.+)$
__
```js
var result1 = "";
var result2 = "";
var addDetails = "";
var extra1 = "";
var extra2 = "";
var question = $1;
if ($1.toUpperCase() == "AT") {
    result1 = expand("tbl roll Oracles/Core/Core_Action.md");
    result2 = " " + expand("tbl roll Oracles/Core/Core_Theme.md");
    question = "Action/Theme";
} else if ($1.toUpperCase() == "DF") {
    result1 = expand("tbl roll Oracles/Core/Core_Descriptor.md");
    result2 = " " + expand("tbl roll Oracles/Core/Core_Focus.md");
    question = "Descriptor/Focus";
} else {
    result1 = expand("tbl roll");
}
if (result1[0].includes("Descriptor") && result1[0].includes("Focus")) {
    extra1 = expand("tbl roll Oracles/Core/Core_Descriptor.md");
    extra2 = expand("tbl roll Oracles/Core/Core_Focus.md");
    addDetails = "Descriptor/Focus: " + extra1 + " " + extra2 + "\n\n";
} else if (result1[0].includes("Action") && result1[0].includes("Theme")) {
    extra1 = expand("tbl roll Oracles/Core/Core_Action.md");
    extra2 = expand("tbl roll Oracles/Core/Core_Theme.md");
    addDetails = "Action/Theme: " + extra1 + " " + extra2 + "\n\n";
} else {
    addDetails = "\n\n"
}
let calloutTitle = "> [!oracle]- " + question + " Result: " + result1 + result2 + " " + extra1 + " " + extra2;
let outcome = "\n> **Additional Details:** ";
let callout = calloutTitle + outcome + addDetails;
return callout;
```
__
oracle {the question you are asking} - Type in the oracles initials to roll.

__
^yesno ([a-zA-Z]*) (.+)$
__
```js
let theRoll = Math.floor(Math.random() * 100 + 1);
var yesCeiling = 50;
var chances = "Fifty-Fifty";
var randD6 = Math.floor(Math.random() * 6 + 1);
switch ($1.toUpperCase()) {
    case "AC":
        yesCeiling = 90;
        chances = "Almost Certain";
        break;
    case "L":
        yesCeiling = 75;
        chances = "Likely";
        break;
    case "FF":
        yesCeiling = 50;
        chances = "Fifty-Fifty";
        break;
    case "U":
        yesCeiling = 25;
        chances = "Unlikely";
        break;
    case "SC":
        yesCeiling = 10;
        chances = "Small Chance";
        break;
    default:
        yesCeiling = 50;
        chances = "Fifty-Fifty";
        break;
}
var result = theRoll.toString();
if (theRoll <= yesCeiling) {
    result += ", Yes";
} else {
    result += ", No";
}
if (theRoll == 100 || theRoll % 11 == 0) {
    result += " with a MATCH!";
} else if (theRoll <= yesCeiling && randD6 == 1) {
    result += " but";
} else if (theRoll > yesCeiling && randD6 == 6) {
    result += " but";
}
let calloutTitle = "> [!oracle]- " + $2 + " (" + chances + ") Result: " + result;
let outcome = "\n> **Additional Details:** ";
callout = calloutTitle + outcome + "\n\n";
return callout;
```
__
yesno {chances initials} {question to ask} - AC for Almost Certain, L for Likely, FF for Fifty-Fifty, U for Unlikely, SC for Small Chance.

__
^at (.+)$
__
```js
let action = expand("tbl roll Oracles/Core/Core_Action.md");
let theme = expand("tbl roll Oracles/Core/Core_Theme.md");
let calloutTitle = "> [!oracle]- " + $1 + " Action/Theme: " + action + " " + theme;
let outcome = "\n> **Additional Details:** \n\n";
return calloutTitle + outcome;
```
__
at {question you need action/theme for} - Use this function to ask a question seeking more details with the Action/Theme oracles.

__
^waypoint
__
```js
let descriptor = expand("tbl roll Oracles/Feature/Feature_Aspect.md");
let focus = expand("tbl roll Oracles/Feature/Feature_Focus.md");
let calloutTitle = "> [!oracle]- You reached a waypoint. Aspect/Focus: " + descriptor + " " + focus;
let outcome = "\n> **Additional Details:** \n\n";
return calloutTitle + outcome;
```
__
waypoint - Use this function to describe a waypoint that you found.

__
^monstrosity
__
```js
let form = "Form: " + expand("getOracle Oracles/Monstrosity/Monstrosity_Primary_Form.md");
var size = "**Size:** " + expand("tbl roll Oracles/Monstrosity/Monstrosity_Size.md");
let characteristics = "**Characteristics:** " + expand("tbl roll Oracles/Monstrosity/Monstrosity_Characteristics.md");
let abilities = "**Abilities:** " + expand("tbl roll Oracles/Monstrosity/Monstrosity_Abilities.md");
let callout = "> [!oracle]- Creature: " + form;
return callout + "\n> " + size + "\n> " + characteristics + "\n> " + abilities + "\n\n";
```
__
monstrosity - gets a random monstrosity

__
^ptp
__
```js
let result = expand("getOracle Oracles/Moves/Moves_Pay_the_Price.md");
let callout = "> [!oracle]- Pay the Price! **Result:** " + result + "\n> \n> **Additional Details:** \n\n";
return callout;
```
__
ptp - Rolls the oracle on the Pay the Price move.

__
^tbl multiroll (n|y) (.*)$
__
```js
// Turn the second parameter into an array of paths
const tables = $2.split(" ");

// Initialize an array for table roll results
let result = [];

// Roll once for each table
for (const table of tables)
{
	// Roll on the table
	const tableResult = expand("tbl roll " + table);

	// If an error is encountered then quit, returning the error
	if (!tableResult[0])
	{
		return tableResult;
	}

	// Add the table roll result to the array
	result.push(tableResult);
}

// Turn the array into a string of spaced items
result = result.join(" ");

// If the first parameter is "y" use expFormat()
return ($1 === "n") ? result : expFormat(result);
```
__
tbl multiroll {use expansion format: y OR n} {table files: space-separated path texts} - Rolls one instance of each table in {table files}. If {use expansion format} is "y", prints the expansion using the standard expansion format.