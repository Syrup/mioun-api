const fetch = require('node-superfetch');
const { author, version } = require("./package.json");

module.exports = class MiounApi {
  constructor() {
    this.author = author;
    this.version = version;
  }
async github(name) {
  const { body: github } = await fetch.get(`https://api.github.com/users/${name}`);
  return github;
};
async kiss() {
  const { body: kiss } = await fetch.get('https://nekos.life/api/kiss')
  return kiss;
};
async hug() {
  const { body: hug } = await fetch.get('https://nekos.life/api/hug');
  return hug;
}
}
