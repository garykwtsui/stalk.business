fetch("https://api.turnip.exchange/islands/", {
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
});
