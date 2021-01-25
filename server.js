const fetch = require('node-superfetch');
const { author, version } = require("./package.json");

module.exports = class MiounApi {
  constructor() {
    this.author = author;
    this.version = version;
  }
  async github(name) {
    const gname = encodeURI(name);
    const { body: github } = await fetch.get(`https://api.github.com/users/${gname}`);
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
  async anime() {
    const { body: anime } = await fetch.get('https://nezumiapi.veguiizumi.repl.co/api/anime')
    return anime;
  }
  async aes(text) {
    const atext = encodeURIComponent(text);
    const {  body: aesthetic } = await fetch.get(`https://nezumiapi.veguiizumi.repl.co/api/aesthetic?text=${atext}`);
    return aesthetic;
  }
  async trakteer(name) {
    const tname = encodeURIComponent(name);
    const res = await fetch.get(`https://api.mioun.my.id/trakteer?name=${tname}`)
    return res;
  }
}
