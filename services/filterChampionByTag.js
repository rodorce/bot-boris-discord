const fetchChampionsData = require('./fetchChampionsData');

const filterChampionsByTag = async (tag) => {
  const filteredChampions = [];
  const championData = await fetchChampionsData()
  
  for (const champion in championData.data) {
    if (championData.data[champion].tags.includes(tag)) {
      filteredChampions.push(championData.data[champion].name);
    }
  }
var randomIndex = Math.floor(Math.random() * filteredChampions.length);
var randomChampData = filteredChampions[randomIndex];
  console.log(randomChampData)
  return randomChampData;
}


module.exports = filterChampionsByTag;
