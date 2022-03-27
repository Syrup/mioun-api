const express = require("express");
const router = express.Router();
const request = require("request"),
  cheerio = require("cheerio");

router.get("/", (req, res) => {
  let name = req.query.name;
  res.header("Content-Type", "application/json");

  let target = "https://trakteer.id/" + name;
  let r = res;
  request(target, function (err, res, body) {
    if (!err && res.statusCode == 200) {
      let $ = cheerio.load(body);

      let name = $("h1.username").text();
      let username = $("div.bg-profile").children("div.mb-5").first().text();
      let occupation = $("div.bg-profile")
        .children("div.occupation")
        .first()
        .text();
      let status = $("div.status")?.html()?.replace(/<br>/g, "\n");
      let links = $("div.summary").children("div.links");
      let goals = $("div.goal");
      let goalsTarget = goals
        .children("label")
        .children("span.explanation")
        .children("span.text-no-wrap")
        .text();
      let goalsTitle = goals
        .children("label")
        .first()
        .children("div.description")
        .text()
        .replace(/^\s/, "")
        .replace(/\s$/, "");
      let goalsReached = goals
        .children("label")
        .first()
        .children("span.explanation")
        .children("strong.text-no-wrap")
        .text();
      let goalsDescription = $("div.modal-goal-description")
        .children("article")
        .children("section")
        .children("div")
        .text()
        .trim();
      let not_found = $("div.d-flex").children("h1").text().includes("404")
        ? true
        : false;
      let not_active = $("div.d-flex")
        .children("h1")
        .text()
        .includes("Halaman creator ini tidak aktif");
      if (not_found)
        return r.status(404).send(
          JSON.stringify(
            {
              code: 404,
              why: "User not found",
            },
            null,
            2
          )
        );
      if (not_active)
        return r.status(404).send(
          JSON.stringify(
            {
              code: 404,
              why: "User not active",
            },
            null,
            2
          )
        );
      let pfp = $("div.bg-profile").children("img.avatar").attr("data-src");
      let cover = $("div.cover").attr("data-background-image");

      let json = {
        name,
        username,
        occupation,
        status,
        avatar: pfp,
        cover,
        links: {
          facebook: links.children("a.btn-facebook").attr("href"),
          youtube: links.children("a.btn-youtube").attr("href"),
          instagram: links.children("a.btn-instagram").attr("href"),
          website: links.children("a.btn-website").attr("href"),
          length: links.children().length,
        },
        goals: {
          title: goalsTitle,
          description: goalsDescription,
          target: goalsTarget,
          reached: goalsReached,
        },
      };
      r.status(200).send(JSON.stringify(json, null, 2));
    }
  });
});

module.exports = {
  router: router,
  help: {
    name: "trakteer",
    category: "api",
    parameters: ["?name=string"],
  },
};
