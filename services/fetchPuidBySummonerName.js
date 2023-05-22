const fetchPuidBySummonerName = async (summonerName) => {
  try {
    const url = `https://la1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}`;
    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.puuid; // Return the data obtained from the API response
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
};

module.exports = fetchPuidBySummonerName;