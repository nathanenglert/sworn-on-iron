const fs = require("fs");
const handlebars = require("./handlebars");
const dataforged = require("../dataforged/assets.json");

handlebars.registerHelper("times", function (n, block) {
  var accum = "";
  for (var i = 0; i < n; ++i) accum += block.fn(i);
  return accum;
});

const temp = Object.keys(dataforged).flatMap((category) => {
  return Object.keys(dataforged[category]["Assets"]).map((assetName) => {
    let categoryName = category.replace(/\W/g, "_");
    let fileName = assetName.replace(/\W/g, "_");
    let asset = dataforged[category]["Assets"][assetName];

    return {
      Name: assetName,
      Category: categoryName,
      FileName: `${categoryName}_${fileName}`,
      Input: asset.Inputs ? Object.keys(asset.Inputs).map((k) => ({ Label: k })) : [],
      "Condition meter": asset["Condition meter"],
      Abilities: asset.Abilities.map((a) => ({ Text: a.Text })),
    };
  });
});

// fs.writeFile(
//   "assets-min.json",
//   JSON.stringify({
//     Assets: temp,
//   }),
//   (err) => {
//     if (err) throw err;

//     console.log("Done");
//   }
// );

fs.readFile("../../Templates/Asset_Template.md", function (err, data) {
  if (err) throw err;

  const template = data.toString();

  temp.map((asset) => {
    const output = render(template, asset);
    writeFile(asset.Category, asset.FileName, output);
  });
});

function render(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

function writeFile(folder, fileName, data) {
  fs.mkdir(`../../Assets/${folder}`, (err) => {
    if (err && err.code !== "EEXIST") return;

    fs.writeFile(`../../Assets/${folder}/${fileName}.md`, data, (err) => {
      if (err) throw err;

      console.log("Done");
    });
  });
}
