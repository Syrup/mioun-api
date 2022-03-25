const express = require("express")
const router = express.Router()
const superagent = require("superagent")

router.get("/", async (req, res) => {
  res.header("Content-Type", "application/json")
  let withHero = false;
  
  let { text: data } = await superagent.get(process.env.heroid)
  let hero = req.query.hero // .toLowerCase()
  if(hero) withHero = true;
  
  let jsonParse = JSON.parse(data)

  let json = JSON.stringify(jsonParse, null, 2)
  // console.log(JSON.parse(data), process.env.URL)
  if(withHero) {
    if(!jsonParse[hero]) return res.status(404).send(JSON.stringify({ code: 404, msg: "Not Found" }, null, 2))
    let jso = {
      hero: hero.toLowerCase(),
      id: jsonParse[hero.toLowerCase()]
    }

    json = JSON.stringify(jso, null, 2)
    return res.status(200).send(json)
  }
  return res.status(200).send(json)
})

module.exports = {
  router: router,
  help: {
    name: "heroid",
    category: "ml",
    parameters: ["[?heroname=string]"]
  }
}