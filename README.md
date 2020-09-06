# Mioun API

first you must be install package
```bash
npm i --save mioun-api
```

### List Api:
1. [Github](#Github)
2. [Kiss](#Kiss)
3. [Hug](#Hug)

## How to use
```js
const mioun = require('mioun-api');
const api = new mioun();
const git = await api.github('miouns');

console.log(git.login); // => Miouns
```

### Github
```js
const mioun = require('mioun-api');
const api = new mioun();
const git = await api.github('miouns');

console.log(git) // => {
//   "login": "Miouns",
//   "id": 54355288,
//   "node_id": "MDQ6VXNlcjU0MzU1Mjg4",
//   "avatar_url": "https://avatars3.githubusercontent.com/u/54355288?v=4",
//   "gravatar_id": "",
//   "url": "https://api.github.com/users/Miouns",
//   "html_url": "https://github.com/Miouns",
//   "followers_url": "https://api.github.com/users/Miouns/followers",
//   "following_url": "https://api.github.com/users/Miouns/following{/other_user}",
//   "gists_url": "https://api.github.com/users/Miouns/gists{/gist_id}",
//   "starred_url": "https://api.github.com/users/Miouns/starred{/owner}{/repo}",
//   "subscriptions_url": "https://api.github.com/users/Miouns/subscriptions",
//   "organizations_url": "https://api.github.com/users/Miouns/orgs",
//   "repos_url": "https://api.github.com/users/Miouns/repos",
//   "events_url": "https://api.github.com/users/Miouns/events{/privacy}",
//   "received_events_url": "https://api.github.com/users/Miouns/received_events",
//   "type": "User",
//   "site_admin": false,
//   "name": "Fabian maulana",
//   "company": null,
//   "blog": "https://miouns.github.io",
//   "location": "Jawa Tengah, Semarang",
//   "email": null,
//   "hireable": null,
//   "bio": "I'm Happy",
//   "twitter_username": null,
//   "public_repos": 27,
//   "public_gists": 0,
//   "followers": 0,
//   "following": 0,
//   "created_at": "2019-08-21T09:45:37Z",
//   "updated_at": "2020-09-06T12:33:33Z"
// }
console.log(git.login); // => Miouns
console.log(git.avatar_url); // => https://avatars3.githubusercontent.com/u/54355288?v=4
```

### Kiss
```js
const mioun = require('mioun-api');
const api = new mioun();
const kiss = await api.kiss();

console.log(kiss) // => {"url":"https://cdn.nekos.life/kiss/kiss_001.gif"}
console.log(kiss.url) // => https://cdn.nekos.life/kiss/kiss_001.gif
```

### Hug
```js
const mioun = require('mioun-api');
const api = new mioun();
const hug = await api.hug();

console.log(kiss) // => {"url":"https://cdn.nekos.life/hug/hug_076.gif"}
console.log(kiss.url) // => https://cdn.nekos.life/hug/hug_076.gif
```
