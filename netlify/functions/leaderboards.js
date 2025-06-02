exports.handler = async function(event, context) {
  const API_KEY = "14FD3B8969C12D5F24D06833B72EC023";
  const APP_ID = "3331770";
  const LEADERBOARD_NAME = "TotalScore";

  // Steg 1: Hent alle leaderboards for å finne ID
  const lbListUrl = `https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardsForGame/v2/?key=${API_KEY}&appid=${APP_ID}`;
  const lbListResp = await fetch(lbListUrl);

  // Skriv ut hele responsen som tekst (ikke JSON)
  const text = await lbListResp.text();

  // Returner rått svar (så vi kan feilsøke)
  return {
    statusCode: 200,
    body: text,
    headers: {
      "Content-Type": "text/plain",
      "Access-Control-Allow-Origin": "*"
    }
  };
};
