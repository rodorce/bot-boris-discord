const fetchMatchesByPUID = async (puid) => {
  try {
    const url = `https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puid}/ids?start=0&count=20`;
    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY
      }
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data; // Return the data obtained from the API response
  } catch (error) {
    // Handle errors
    console.error(error);
    throw error;
  }
};

module.exports = fetchMatchesByPUID;
