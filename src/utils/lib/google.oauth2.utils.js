import { google } from "googleapis";
import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(
  process.env.OAUTH2CLIENT_NAME,
  process.env.OAUTH2CLIENT_API_KEY,
  process.env.OAUTH2CLIENT_SECRET_KEY
);
oauth2Client.setCredentials({
  refresh_token: process.env.OAUTH2CLIENT_REFRESH_TOKEN,
});

export { oauth2Client };
