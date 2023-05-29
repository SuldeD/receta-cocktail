import fetch from "node-fetch";

export async function getGoogleUserInfo(access_token: string) {
  const profile = await fetch("https://www.googleapis.com/oauth2/v2/userinfo", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  }).then((res) => res.json());
  return profile;
}
