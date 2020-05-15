const fetch = require("node-fetch");
const Island = require("./Island");
let fetchUtils = require("./fetchUtils.js");

async function join(turnipCode, visitorID, visitorName) {
  // let url = "https://api.turnip.exchange/island/queue/ac5315b5?visitorID=c1d3881f-fbec-4082-af82-148f96e14475";
  let url =
    "https://api.turnip.exchange/island/queue/" +
    turnipCode +
    "?visitorID=" +
    visitorID;
  console.log("Debug: " + url);
  let response = await fetch(url, {
    headers: {
      accept: "application/json",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      "content-type": "application/json",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
      "x-discord-id": "",
      "x-patreon-id": "",
      "x-recaptcha-token":
        "03AGdBq24duRzRZDL_lRXgiAN594PxEb12cONU-d3qMQG6T-utHmxIj0gdn9sh6LXsY9AsIt4xSPL9CUVMHzbHN7R3Jcwid8hDNW0TvGdToeQ__HPnhGw_iue3Ty6IuB5WdEdByMP0_tf_9qIurOGgTb2SIfL02wxIjW-P3Zk-JgtjMj_BP8-9_1_Ei9BHMwzxgzickff1EMNwIXG3GsjS5xPz5PnXQOoyzM_ZG_idNNB3T-cXVEMGXOe6Uipj-Gf8DwW-NEzzTC3_jJ_Q_MjorNiEjb4QABM7cE1pwK-B60Vmv5YqpYZePE9L4MqDrmTwBaXAKvM7czlyhOVQZxq6WJVmSb_p_Y-SswMzyule-ILPVk_tVie8C47sL59nqlLvUJABAwCwzIb2",
    },
    referrer: "https://turnip.exchange/island/6059fe99",
    referrerPolicy: "no-referrer-when-downgrade",
    body: '{"name": "' + visitorName + '"}',
    method: "PUT",
    mode: "cors",
  });

  return response.json();
}

async function ping(turnipCode, visitorID, visitorName) {
  // let url = "https://api.turnip.exchange/island/queue/ac5315b5?visitorID=c1d3881f-fbec-4082-af82-148f96e14475";
  let url =
    "https://api.turnip.exchange/island/queue/" +
    turnipCode +
    "?visitorID=" +
    visitorID;
  console.log("Debug: " + url);

  let response = await fetch(url, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://turnip.exchange/island/ce602006",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "POST",
    mode: "cors",
  });

  return response.json();
}

async function leave(turnipCode, visitorID, visitorName) {
  // let url = "https://api.turnip.exchange/island/queue/ac5315b5?visitorID=c1d3881f-fbec-4082-af82-148f96e14475";
  let url =
    "https://api.turnip.exchange/island/queue/" +
    turnipCode +
    "?visitorID=" +
    visitorID;
  console.log("Debug: " + url);
  let response = await fetch(url, {
    headers: {
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      "cache-control": "no-cache",
      pragma: "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-site",
    },
    referrer: "https://turnip.exchange/island/07c13aa3",
    referrerPolicy: "no-referrer-when-downgrade",
    body: null,
    method: "DELETE",
    mode: "cors",
  });

  return response.json();
}

async function grab(turnipCode, visitorID, visitorName) {
  let response = await fetch(
    "https://api.turnip.exchange/island/queue/" +
      turnipCode +
      "/grab?visitorID=" +
      visitorID,
    {
      headers: {
        accept: "application/json",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "no-cache",
        "content-type": "application/json",
        pragma: "no-cache",
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://turnip.exchange/island/ac5315b5",
      referrerPolicy: "no-referrer-when-downgrade",
      body: null,
      method: "POST",
      mode: "cors",
    }
  );

  return response.json();
}

module.exports = {
  join,
  leave,
  grab,
  ping,
};
