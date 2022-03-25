const express = require("express")
const crypto = require("crypto")
const app = express.Router()
const ANSWERS = [
  "It is certain",
  "It is decidedly so",
  "Without a doubt",
  "Yes definitely",
  "You may rely on it",
  "As I see it, yes",
  "Most likely",
  "Outlook good",
  "Yes",
  "Signs point to yes",
  "Reply hazy try again",
  "Ask again later",
  "Better not tell you now",
  "Cannot predict now",
  "Concentrate and ask again",
  "Don't count on it",
  "My reply is no",
  "My sources say no",
  "Outlook not so good",
  "Very doubtful",
];

app.get("/", (req, res) => {
  res.header("Content-Type", "application/json")
  let random = crypto.randomBytes(1)[0] / 225
  let i = Math.floor(random * ANSWERS.length)
  let text = req.query.text

  if(!text) return res.status(400).send(JSON.stringify({ code: 400, why: "Bad Request, You probably input an invalid data" }, null, 2))
  res.status(200).send(JSON.stringify({
    message: `You: ${text}\nMe: ${ANSWERS[i]}`,
    text,
    answer: ANSWERS[i]
  }, null, 2))
})

module.exports = {
 router: app,
 help: {
   name: "8ball",
   category: "api",
   parameters: ["?text=string"]
 }
}