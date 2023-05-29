const sendMessageIfInGame = async (encryptedSummoners) => {
  const fetchPromises = encryptedSummoners.map(async (summoner) => {
    const url = `https://la1.api.riotgames.com/lol/spectator/v4/active-games/by-summoner/${summoner.id}`;
    const response = await fetch(url, {
      headers: {
        'X-Riot-Token': process.env.RIOT_API_KEY
      }
    });

    if (!response.ok) {
      summoner.inMatch = false;
      return summoner
    }
    
    summoner.inMatch = true
    return summoner
  });

  const responses = await Promise.all(fetchPromises);
  // console.log(responses);

  return responses;
};

module.exports = sendMessageIfInGame;
