let express = require("express");
let app = express();
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
app.set("view engine", "ejs");
app.use(express.static("public"));

let api = {};
async function load() {
  let paths = await globPromise(`${process.cwd()}/apis/**/*.js`);
  console.log(paths);
  paths.forEach((path) => {
    let file = require(path);
    api[`/${file.help.name}`] = file.help.parameters;
    app.use(`/${file.help.category}/${file.help.name}`, file.router);
  });
}

load();

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  if (req.method === "GET")
    /*var api = {
      "/api": ['/trakteer?name='],
      "/ml": ["/heroname[?hero=]", "/heroid[?hero=]"]
    };*/

    res.status(200).send(JSON.stringify(api, null, 2));
});

app.get("/docs", (req, res) => {
  res.render("index", { api: api });
});

app.listen(process.env.PORT || 3000);

