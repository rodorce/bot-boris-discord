const fetchChampionsData = async () => {
    try {
        const url = `http://ddragon.leagueoflegends.com/cdn/13.10.1/data/en_US/champion.json`;
        const response = await fetch(url, {
            headers: {
                'Accept': 'application/json',
            }
        });

        const data = await response.json();
        return data
    } catch (error) {
        throw error;
    }
}

module.exports = fetchChampionsData