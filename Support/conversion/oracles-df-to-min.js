const fs = require("fs");
const dataforged = require("../dataforged/oracles.json");

const temp = Object.keys(dataforged).flatMap((category) => {
  return Object.keys(dataforged[category]["Tables"]).map((oracle) => {
    let categoryName = category;
    if (categoryName == "Action and Theme") {
      categoryName = "Core";
    }

    return {
      Name: oracle,
      Category: categoryName,
      FileName: `${categoryName} ${oracle}`,
      Dice: "" + dataforged[category]["Tables"][oracle].Table.length,
      Table: dataforged[category]["Tables"][oracle].Table.map((row) => ({
        Floor: row.Floor,
        Ceiling: row.Ceiling,
        Result: row.Result,
      })),
    };
  });
});

fs.writeFile("oracles-min.json", JSON.stringify(temp), (err) => {
  if (err) throw err;

  console.log("Done");
});
