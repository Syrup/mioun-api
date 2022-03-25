const express = require("express")
const router = express.Router()
const superagent = require("superagent")

router.get("/", async (req, res) => {
  res.header("Content-Type", "application/json")
  const { text } = await superagent.get(process.env.heroname)
  const hero = req.query.hero ? req.query.hero.toLowerCase() : req.query.hero;
  let result = JSON.parse(text)
  // console.log(hero, result[hero])

  if(hero) {
    if(!result[hero]) return res.status(404).send(JSON.stringify({ code: 404, msg: "Not Found" }))
    let json = {
      hero: result[hero]
    }

    return res.status(200).send(JSON.stringify(json, null, 2))  
  }


  return res.status(200).send(text)
})

module.exports = {
  router: router,
  help: {
    name: "heroname",
    category: "ml",
    parameters: ["[?heroname=string]"]
  }
}