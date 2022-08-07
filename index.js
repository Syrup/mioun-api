let express = require("express");

let app = express();
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);
app.set("view engine", "ejs");
app.use(express.static("public"));
app.disable("x-powered-by");

let apis = [];
async function load() {
  let paths = await globPromise(`${process.cwd()}/apis/**/*.js`);
  paths.forEach((path) => {
    let file = require(path);
    let conf = {};
    if(file.help.category) conf[`${file.help.category}`][`${file.help.name}`] = file.help;
    conf[file.help.name] = file.help
    apis.push(conf);
    app.use(`/${file.help.category}/${file.help.name}`, file.router);
  });
}

load();

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json");
  if (req.method === "GET") res.status(200).send(JSON.stringify(apis, null, 2));
});

app.get("/docs", (req, res) => {
  res.render("index", { api: api });
});

app.listen(process.env.PORT || 3000);
