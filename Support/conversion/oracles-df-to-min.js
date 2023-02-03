const fs = require("fs");
const dataforged = require("../dataforged/oracles.json");

const temp = Object.keys(dataforged).flatMap((category) => {
  return Object.keys(dataforged[category]["Tables"]).map((oracle) => {
    let categoryName = category.replace(/\W/g, "_");
    let fileName = oracle.replace(/\W/g, "_");

    if (categoryName == "Action_and_Theme") {
      categoryName = "Core";
    }

    return {
      Name: oracle,
      Category: categoryName,
      FileName: `${categoryName}_${fileName}`,
      Dice: "" + dataforged[category]["Tables"][oracle].Table.length,
      Table: dataforged[category]["Tables"][oracle].Table.map((row) => ({
        Floor: row.Floor,
        Ceiling: row.Ceiling,
        Result: row.Result,
      })),
    };
  });
});

fs.writeFile(
  "oracles-min.json",
  JSON.stringify({
    Oracles: temp,
  }),
  (err) => {
    if (err) throw err;

    console.log("Done");
  }
);
