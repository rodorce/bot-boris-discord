const fetchMatch = async (matchId, summonerName) => {
  try {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/${matchId}`;
    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    const userData = data.info.participants.filter(obj => obj.summonerName === summonerName);
    console.log(userData)
    return {
      "kills": userData[0].kills,
      "deaths": userData[0].deaths,
      "assists": userData[0].assists,
      "gameMode": data.info.gameMode,
      "champion": userData[0].championName,
      "profileIcon": userData[0].profileIcon,
      "items": [userData[0].item6, userData[0].item0,userData[0].item1,userData[0].item2,userData[0].item3,userData[0].item4,userData[0].item5]
    };
  } catch (error) {
    throw error;
  }
};

module.exports = fetchMatch;
