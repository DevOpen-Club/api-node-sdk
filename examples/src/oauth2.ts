import { App } from 'fanbook-api-node-sdk';

const CLIENT_ID = '在此填入你的应用的 Client ID';
const CLIENT_SECRET = '在此填入你的应用的 Client Secret';
const REDIRECT_URL = '在此填入 OAuth 2.0 redirect url';
const CODE = '在此填入 OAuth 2.0 authorization code';

const app = new App(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);
const session = await app.codeToToken(CODE);
console.log('Session:', session);
console.log('User:', await app.getUser(session.access_token));
const guilds = await app.listUserGuild(session.access_token);
console.log('Number of guilds:', guilds.length);
