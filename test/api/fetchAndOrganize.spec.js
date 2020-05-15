let assert = require("assert");
let fs = require("fs");
let uuid = require("uuid");
let validate = require("uuid-validate");
let fetchAndOrganize = require("../../src/api/fetchAndOrganize.js");
let queue = require("../../src/api/queue.js");
let Island = require("../../src/api/Island.js");
var uuid2 = require("uuid-random");

describe("fetchAndOrganize", function () {
  describe("join queue", function () {
    it("", async function () {
      const v4options = {
        random: [
          0x10,
          0x91,
          0x56,
          0xbe,
          0xc4,
          0xfb,
          0xc1,
          0xea,
          0x71,
          0xb4,
          0xef,
          0xe1,
          0x67,
          0x1c,
          0x58,
          0x36,
        ],
      };

      var visitorID = uuid.v4(v4options);
      console.log(
        "Version: " + validate.version("0d414b75-421e-478f-a7e3-4e1ed4edac7d")
      );
      console.log(
        "Version: " + validate("0d414b75-421e-478f-a7e3-4e1ed4edac7d")
      );

      console.log("Version: " + validate.version(visitorID));
      console.log("Version: " + validate(visitorID));
      console.log("Version: " + uuid2.test(visitorID));
      visitorID = uuid2();
      console.log(visitorID);
      visitorID1 = "0d414b75-421e-478f-a7e3-4e1ed4edac7d";
      visitorID2 = "781e2e73-c879-4544-b8b8-321b827a9e5f";
      visitorID3 = "7b5adcf8-f736-4e4a-86bd-e0aca5b25ad0";
      visitorID4 = "e7731989-ca73-4efd-b39c-1bde2d0b05d5";
      let response = await queue.join("9b1ea6cb", visitorID4);
      console.log(response);
    });
  }),
    describe("basic cases", function () {
      xit("fetch and organize", async function () {
        // let islands = await fetchAndOrganize.fetchAndOrganize();
        // console.log("Total paired islands: " + islands.length);
      }),
        xit("island", function () {
          let obj = {
            name: "test",
            turnipPrice: 90,
            maxQueue: 50,
            queued: "10/50",
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          assert(new Island(obj) !== null);
        }),
        xit("island bad queued str", function () {
          let obj = {
            name: "test",
            turnipPrice: 90,
            maxQueue: 50,
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          let island = new Island(obj);
          assert(island !== null);
          assert(island.queuedPos == 0);
        }),
        xit("island should pair", function () {
          let a = {
            name: "test",
            turnipPrice: 90,
            maxQueue: 50,
            queuedPos: 10,
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          let b = {
            name: "test",
            turnipPrice: 110,
            maxQueue: 50,
            queuedPos: 20,
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          assert.equal(true, fetchAndOrganize.shouldPair(a, b));
        }),
        xit("island should NOT pair", function () {
          let a = {
            name: "test",
            turnipPrice: 90,
            maxQueue: 50,
            queuedPos: 10,
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          let b = {
            name: "test",
            turnipPrice: 89,
            maxQueue: 50,
            queuedPos: 20,
            turnipCode: "abbb3a1",
            islandTime: "someTime",
            creationTime: "someTime",
            description: "blah",
            islander: "neither",
          };
          assert.equal(false, fetchAndOrganize.shouldPair(a, b));
        });
    });
  // describe("basic organize from a test json", function () {
  //   const islands_sell_side_json = fs.readFileSync(
  //     "./resource/scripts/daisy_resp.json"
  //   );
  //   const islands_buy_side_json = fs.readFileSync(
  //     "./resource/scripts/turnip_resp.json"
  //   );
  //   it("should be able to process the json", function () {
  //     let islands = fetchAndOrganize.organize(
  //       JSON.parse(islands_sell_side_json),
  //       JSON.parse(islands_buy_side_json)
  //     );
  //     assert.notEqual(islands.length, 0);
  //     console.log("Total paired islands: " + islands.length);
  //     let r_index = Math.floor(Math.random() * islands.length);
  //     let pair = islands[r_index];

  //     assert.notEqual(pair.seller.name, undefined);
  //     assert.notEqual(pair.seller.turnipPrice, undefined);
  //     assert.notEqual(pair.seller.maxQueue, undefined);
  //     assert.notEqual(pair.seller.queuedStr, undefined);
  //     assert.notEqual(pair.seller.turnipCode, undefined);
  //     assert.notEqual(pair.seller.islandTime, undefined);
  //     assert.notEqual(pair.seller.creationTime, undefined);
  //     assert.notEqual(pair.seller.description, undefined);
  //     assert.notEqual(pair.seller.islander, undefined);

  //     assert.notEqual(pair.buyer.name, undefined);
  //     assert.notEqual(pair.buyer.turnipPrice, undefined);
  //     assert.notEqual(pair.buyer.maxQueue, undefined);
  //     assert.notEqual(pair.buyer.queuedStr, undefined);
  //     assert.notEqual(pair.buyer.turnipCode, undefined);
  //     assert.notEqual(pair.buyer.islandTime, undefined);
  //     assert.notEqual(pair.buyer.creationTime, undefined);
  //     assert.notEqual(pair.buyer.description, undefined);
  //     assert.notEqual(pair.buyer.islander, undefined);
  //   });
  // });
});
