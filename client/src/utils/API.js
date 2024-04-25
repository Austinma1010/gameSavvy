export const getDeals = async (maxPrice) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const deals = await fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=1&upperPrice=${maxPrice}`, requestOptions);

        if (!deals) {
            return console.log("Couldn't find Deals");
        }

        return deals;
      } catch(err) {
        console.error(err);
      }
};

export const getDeal = async (id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const deal = await fetch(`https://www.cheapshark.com/api/1.0/deals?id=${id}`, requestOptions);

        if (!deal) {
            return console.log("Couldn't find Deal");
        }

        return deal;
      } catch(err) {
        console.error(err);
      }
};

export const gameSearch = async (title) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const games = await fetch(`https://www.cheapshark.com/api/1.0/games?title=${title}`, requestOptions);

        if (!games) {
            return console.log("Couldn't find Games");
        }

        return games;
      } catch(err) {
        console.error(err);
      }
};

export const gameSearchExact = async (title) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const games = await fetch(`https://www.cheapshark.com/api/1.0/games?exact=true&title=${title}`, requestOptions);

        if (!games) {
            return console.log("Couldn't find Games");
        }

        return games;
      } catch(err) {
        console.error(err);
      }
};

export const gameSearchbyId = async (id) => {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };

      try {
        const game = await fetch(`https://www.cheapshark.com/api/1.0/games?id=${id}`, requestOptions);

        if (!game) {
            return console.log("Couldn't find Game");
        }

        return game;
      } catch(err) {
        console.error(err);
      }
};