const handlebars = require("./handlebars");
const fs = require("fs");
const json = require("./oracles-min.json");

fs.readFile("../../Templates/Oracle_Template.md", function (err, data) {
  if (err) throw err;

  const template = data.toString();

  json.Oracles.map((oracle) => {
    const output = render(template, oracle);
    writeFile(oracle.Category, oracle.FileName, output);
  });
});

function render(source, data) {
  var template = handlebars.compile(source);
  var outputString = template(data);
  return outputString;
}

function writeFile(folder, fileName, data) {
  fs.mkdir(`../../Oracles/${folder}`, (err) => {
    if (err && err.code !== "EEXIST") return;

    fs.writeFile(`../../Oracles/${folder}/${fileName}.md`, data, (err) => {
      if (err) throw err;

      console.log("Done");
    });
  });
}
