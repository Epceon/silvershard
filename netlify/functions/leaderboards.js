exports.handler = async function(event, context) {
  const API_KEY = "14FD3B8969C12D5F24D06833B72EC023";
  const APP_ID = "3331770";
  const LEADERBOARD_NAME = "TotalScore";

  // Hent alle leaderboards for å finne ID
  const lbListUrl = `https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardsForGame/v2/?key=${API_KEY}&appid=${APP_ID}`;
  const lbListResp = await fetch(lbListUrl);
  const lbList = await lbListResp.json();
  let leaderboardId = null;
  for (const lb of lbList.leaderboards) {
    if (lb.name === LEADERBOARD_NAME) {
      leaderboardId = lb.id;
      break;
    }
  }
  if (!leaderboardId) {
    return {
      statusCode: 404,
      body: JSON.stringify({ error: "Leaderboard not found" }),
    };
  }

  // Hent entries fra leaderboard
  const entriesUrl = `https://partner.steam-api.com/ISteamLeaderboards/GetLeaderboardEntries/v1/?key=${API_KEY}&appid=${APP_ID}&leaderboardid=${leaderboardId}&type=0&range_start=1&range_end=20`;
  const entriesResp = await fetch(entriesUrl);
  const entries = await entriesResp.json();

  return {
    statusCode: 200,
    body: JSON.stringify(entries.response.leaderboard_entries),
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  };
};
