var express = require("express");
var fs = require("fs");
var router = express.Router();

let fetchAndOrganize = require("../src/api/fetchAndOrganize.js");
let queue = require("../src/api/queue.js");
let Island = require("../src/api/Island.js");

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express - Gary" });
});

router.get("/getTrades", async function (req, res, next) {
  let islands = await fetchAndOrganize.fetchAndOrganize();
  var retryCount = 0;
  if (islands.length <= 0) {
    console.log("WARNING: no islands found !?");
    while (retryCount < 3) {
      console.log("WARNING: Going to retry !?");
      // sleep
      await sleep(2000);
      islands = await fetchAndOrganize.fetchAndOrganize();
      if (islands.length > 0) {
        console.log("INFO: found islands");
        break;
      }
      retryCount++;
    }
  }
  res.json(islands);
});

router.get(
  "/queue/action/:action/turnipCode/:turnipCode/visitorID/:visitorID/visitorName/:visitorName",
  async function (req, res, next) {
    // let visitorID = "c1d3881f-fbec-4082-af82-148f96e14475";
    // let turnipCode = req.params["turnipCode"];
    let result;
    let action = req.params["action"];
    let visitorID = req.params["visitorID"];
    let visitorName = req.params["visitorName"];
    let turnipCode = req.params["turnipCode"];
    switch (action) {
      case "join":
        result = await queue.join(turnipCode, visitorID, visitorName);
        break;
      case "leave":
        result = await queue.leave(turnipCode, visitorID, visitorName);
        break;
        break;
      case "grab":
        result = await queue.grab(turnipCode, visitorID, visitorName);
        break;
      case "ping":
        result = await queue.ping(turnipCode, visitorID, visitorName);
      default:
        console.log("unknown action: " + action);
        break;
    }
    // console.log(result);
    res.send(result);
  }
);

router.get("/getTradesTest", function (req, res, next) {
  console.log(process.cwd());
  const islands_sell_side_json = fs.readFileSync(
    "./app/resource/scripts/daisy_resp.json"
  );
  const islands_buy_side_json = fs.readFileSync(
    "./app/resource/scripts/turnip_resp.json"
  );
  let islands = fetchAndOrganize.organize(
    JSON.parse(islands_sell_side_json).islands,
    JSON.parse(islands_buy_side_json).islands
  );
  res.json(islands);
});
module.exports = router;
