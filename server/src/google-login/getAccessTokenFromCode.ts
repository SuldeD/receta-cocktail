import fetch from "node-fetch";
import * as queryString from "query-string";

export async function getAccessTokenFromCode(code: any) {
  console.log("secret:", process.env.GOOGLE_CLIENT_SECRET);

  const postData = queryString.stringify({
    client_id: process.env.GOOGLE_CLIENT_ID,
    client_secret: process.env.GOOGLE_CLIENT_SECRET,
    grant_type: "authorization_code",
    redirect_uri: `https://receta-server.onrender.com/google/callback`,
    code,
  });

  const { access_token }: any = await fetch(
    "https://oauth2.googleapis.com/token",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Content-Length": postData.length + "",
      },
      body: postData,
    }
  ).then((response) => response.json());

  return access_token;
}
