// var fetch = require("fetch").fetchUrl;
const fetch = require("node-fetch");
const Island = require("./Island");
let fetchUtils = require("./fetchUtils.js");

function fetchBuyer() {
  return fetch("https://api.turnip.exchange/islands/", {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-island-id": "",
    },
    referrer: "https://turnip.exchange/islands",
    referrerPolicy: "no-referrer-when-downgrade",
    body: '{"islander":"neither","category":"turnips","fee":0}',
    method: "POST",
    mode: "cors",
  })
    .then(fetchUtils.status)
    .then(fetchUtils.json);
}

function fetchSeller() {
  return fetch("https://api.turnip.exchange/islands/", {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-island-id": "",
    },
    referrer: "https://turnip.exchange/islands",
    referrerPolicy: "no-referrer-when-downgrade",
    body: '{"islander":"daisy","category":"turnips","fee":0}',
    method: "POST",
    mode: "cors",
  })
    .then(fetchUtils.status)
    .then(fetchUtils.json);
}

async function fetchAndOrganize() {
  const sellerPromise = fetchSeller();
  const buyerPromise = fetchBuyer();
  let results;
  await Promise.all([sellerPromise, buyerPromise]).then((responses) => {
    results = organize(responses[0].islands, responses[1].islands);
  });

  return results;
}

function organize(sell_side_data, buy_side_data) {
  // 1. store (buy-side, sell-side)
  // 2. sort
  //      - buy-side-sell-side sort with about 15 mins in between them.
  //          - so-called intelligent sorting
  //              1. sort by max price?
  //              2. sort by lowest queued/maxQ ratio
  //              3. (compute average wait-time? - average queueTime)
  // 3. create pairs
  islands_buyside = []; // nooks buy
  islands_sellside = []; // daisy sells
  for (let elem of sell_side_data) {
    let island = new Island(elem);
    if (island.turnipPrice >= 90 && island.turnipPrice <= 120) {
      islands_sellside.push(island);
    } else {
      // check description
      console.log("Warning: Daisy's price range out of range.");
      console.log(
        "Warning: should impl. NL/regex to extract from description."
      );
    }
  }
  // sort price asc first
  islands_sellside.sort(function (a, b) {
    return a.turnipPrice - b.turnipPrice;
  });

  // sort position asc then.
  islands_sellside.sort(function (a, b) {
    return a.queued - b.queued;
  });

  for (let elem of buy_side_data) {
    let island = new Island(elem);
    // just in case.
    switch (island.islander) {
      case "daisy":
        islands_sellside.push(island);
        break;
      case "celeste":
        break;
      default:
        if (island.turnipPrice >= 300) {
          islands_buyside.push(island);
        }
        break;
    }
  }

  // sort price desc first
  islands_buyside.sort(function (a, b) {
    return b.turnipPrice - a.turnipPrice;
  });

  // sort positions asc then
  islands_buyside.sort(function (a, b) {
    return a.queued - b.queued;
  });

  // compute dist.
  let available_island_pairs = [];
  for (let daisy of islands_sellside) {
    for (let nook of islands_buyside) {
      if (shouldPair(daisy, nook)) {
        let entry = {
          seller: daisy,
          buyer: nook,
        };
        available_island_pairs.push(entry);
      }
    }
  }

  return available_island_pairs;
}

// Pre: (sellside, sorted asc), (buyside, sorted desc)
function shouldPair(islands_sellside, islands_buyside) {
  // naive approach
  let dist0 = distanceQ(islands_sellside, islands_buyside);
  let dist1 = distanceP(islands_sellside, islands_buyside);
  if (dist0 < 0 && -dist0 > 4 && -dist0 < 16) {
    if (dist1 > 0) {
      return true;
    }
  }
  return false;
}

function distanceQ(island_s, island_b) {
  let dist0 = island_s.queuedPos - island_b.queuedPos;

  return dist0;
}

function distanceP(island_s, island_b) {
  let dist0 = island_b.turnipPrice - island_s.turnipPrice;
  return dist0;
}

module.exports = {
  fetchAndOrganize,
  organize,
  shouldPair,
  distanceP,
  distanceQ,
};
