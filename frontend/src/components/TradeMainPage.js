import React, { Component } from "react";
import { Icon, Container } from "semantic-ui-react";
import Cookies from "universal-cookie";
import StalkMarketTable from "./StalkMarketTable";
import YourInformation from "./YourInformation";
import YourStalkTable from "./YourStalkTable";
import StalkUtil from "./StalkUtil";
import ReactAudioPlayer from "react-audio-player";
import dingMP3 from "../resources/ding.mp3";
import waterdropMP3 from "../resources/waterdrop2.mp3";
import errorMP3 from "../resources/computerError2.mp3";
import Facilitator from "../utils/facilitator";

class TradeMainPage extends Component {
  constructor(props) {
    super(props);

    const cookies = new Cookies();
    this.cookies = cookies;
    this.visitorIDs = {};
    this.failedTrades = {};
    if (!cookies.get("tradeState")) {
      this.state = {
        islands: [],
        visitorName: "",
        yourPlaces: [],
        yourTrades: [],
        visitorIDs: {},
        dodoCodes: {},
        turnipQueueIDs: {},
      };
    } else {
      this.state = {
        islands: [],
        visitorIDs: cookies.get("visitorIDs"),
        visitorName: cookies.get("visitorName"),
        yourTrades: cookies.get("yourTrades"),
        yourPlaces: cookies.get("yourPlaces"),
        turnipQueueIDs: cookies.get("turnipQueueIDs"),
        dodoCodes: {},
      };
      this.visitorIDs = cookies.get("visitorIDs");
    }
    this.state.statuses = {};
    this.handlePing = this.handlePing.bind(this);
    this.handleJoin = this.handleJoin.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handleYourPlaces = this.handleYourPlaces.bind(this);
    this.handleVisitorID = this.handleVisitorID.bind(this);
    this.handleReconnect = this.handleReconnect.bind(this);
    this.currentButtonElement = null;
  }

  handleReconnect() {
    for (let turnipCode in this.visitorIDs) {
      let visitorID = this.visitorIDs[turnipCode];
      console.log("Trying to reconnect: (" + turnipCode + ") - " + visitorID);
      this.handleVisitorID(turnipCode, visitorID);
    }
  }

  handleVisitorID(turnipCode, visitorID) {
    console.log("handleVisitorID: " + turnipCode);
    let wss_url =
      "wss://w92pvtybp7.execute-api.us-west-2.amazonaws.com/production";
    const ws = new WebSocket(wss_url);
    var self = this;

    return new Promise(function (resolve, reject) {
      ws.onopen = function (event) {
        let data = {
          action: "join",
          turnipCode: turnipCode,
          visitorID: visitorID, // null to create a new one.
        };
        ws.send(JSON.stringify(data));
      };
      ws.onerror = function (event) {
        console.log("Error opening ws connection");
        console.log(event);
        reject();
      };

      ws.onmessage = function (event) {
        console.log(event);
        let obj = JSON.parse(event.data);
        if (!self.state.statuses[turnipCode]) {
          self.state.statuses[turnipCode] = [];
        }
        self.state.statuses[turnipCode].push({
          action: obj.action,
          data: obj.data,
        });

        self.setState({
          statuses: self.state.statuses,
        });
        console.log("Status Updated:");
        console.log(self.state.statuses);
        switch (obj.action) {
          case "joined":
            if (obj.data.visitorID !== undefined) {
              self.state.visitorID = obj.data.visitorID;
              console.log(
                "VisitorID obtained for (" +
                  turnipCode +
                  "): " +
                  self.state.visitorID
              );

              self.visitorIDs[turnipCode] = obj.data.visitorID;
              self.autoSave();
            }
            break;
          case "queueUpdated":
            break;
          default:
            console.log("Unknown wss action: " + obj.action);
        }
        console.log("done handling ws");
        resolve();
      };
    });
  }

  handleYourPlaces(action, data, turnipCode) {
    switch (action) {
      case "update":
        if (data["yourPlace"]) {
          // this condition is only for playing the sound.
          // if (this.state.yourPlaces[turnipCode] !== data.yourPlace) {
          //   // this.waterdrop.audioEl.current.play();
          //   console.log("Do you still need this code path?");
          // }
          // Investigation: why is this failing?
          // this.state.yourPlaces[turnipCode] = data.yourPlace;
        }
        break;
      case "remove":
        if (this.state.yourPlaces[turnipCode]) {
          delete this.state.yourPlaces[turnipCode];
        }
        break;
      default:
        console.log("unknown your places' action type");
        break;
    }
    this.autoSave();
  }

  handleJoin(side, turnipCode, data) {
    console.log("Join: " + side);
    console.log(data);
    if (side === "sell") {
    } else if (side === "buy") {
    }

    if (!data.success) {
      // that means we couldn't join for some reasons.
      this.failedTrades[turnipCode] = data.message;
    } else {
      // add to $id table
      // console.log("Missing Impl: Should build data.$id-turnipCode map");
      // turnipIDMap[turnipCode] = data.$id
      let mapping =
        this.state.turnipQueueIDs && this.state.turnipQueueIDs !== "undefined"
          ? this.state.turnipQueueIDs
          : {};
      mapping[turnipCode] = data.$id;
      console.log("Obtained IDs");
      console.log(mapping);
      this.setState({
        turnipQueueIDs: mapping,
      });
      // this.state.turnipQueueIDs[turnipCode] = data.$id;
    }

    // if (type === "leave") {
    //   this.handleYourPlaces("remove", null, turnipCode);
    // }
  }

  handleGrab() {
    // {success: true, message: "Grabbed code!", dodoCode: "6Y81G"}
    // {success: true, grabbed: false}
  }

  handlePing(side, turnipCode, data) {
    console.log("Ping: " + side);
    console.log(data);
    if (side === "sell") {
    } else if (side === "buy") {
    }
    if (!data.yourPlace && data.onIsland) {
      console.log("Uh-oh: you've lost your place " + side + ":" + turnipCode);
      data.yourPlace = "-1";
    }

    this.handleYourPlaces("update", data, turnipCode);
    console.log(this.state.yourPlaces);
    // do you want to differentiate by data?
    // grab has dodoCode (ping might have it too)
    //
    if (data.success) {
      // data.dodoCode should appear in both pinging and grabbing.
      if (data.dodoCode) {
        // play the ding.
        // this.ding.audioEl.current.play();
        this.state.dodoCodes[turnipCode] = data.dodoCode;
        this.playSound("ding");
      } else {
        console.log("no dodocode");
      }
    }
  }

  handleFetch(url, side, turnipCode, callback) {
    fetch(url)
      .then((response) => response.json())
      .then((data) => callback(side, turnipCode, data));
  }

  async handleQueue(actionType, sellerTurnipCode, buyerTurnipCode) {
    console.log("handleFetch");
    var callBack = this.handleJoin;
    var sleepCount = 3000;
    if (actionType === "grab" || actionType === "ping") {
      callBack = this.handlePing;
      sleepCount = 0;
    }
    if (sellerTurnipCode) {
      let seller_url =
        "/queue/action/" +
        actionType +
        "/turnipCode/" +
        sellerTurnipCode +
        "/visitorID/" +
        this.visitorIDs[sellerTurnipCode] +
        "/visitorName/" +
        this.state.visitorName;
      console.log("Fetch: " + seller_url);
      this.handleFetch(seller_url, "sell", sellerTurnipCode, callBack);
    }

    if (actionType === "join") {
      await StalkUtil.sleep(sleepCount);
    }

    if (buyerTurnipCode) {
      let buyer_url =
        "/queue/action/" +
        actionType +
        "/turnipCode/" +
        buyerTurnipCode +
        "/visitorID/" +
        this.visitorIDs[buyerTurnipCode] +
        "/visitorName/" +
        this.state.visitorName;
      console.log("Fetch: " + buyer_url);
      this.handleFetch(buyer_url, "buy", buyerTurnipCode, callBack);
    }

    if (actionType === "join" || actionType === "leave") {
      this.setTrades(actionType, sellerTurnipCode, buyerTurnipCode);
    } else {
      this.getTrades();
    }
  }

  async handleClick(element, type, sellerTurnipCode, buyerTurnipCode) {
    console.log(type + ":" + sellerTurnipCode + ":" + buyerTurnipCode);
    this.currentButtonElement = element;
    if (type === "join") {
      this.playSound("waterdrop");
      if (!this.state.statues) {
        this.state.status = {};
      }
      if (!this.state.statuses[sellerTurnipCode]) {
        this.state.statuses[sellerTurnipCode] = [
          {
            action: "testing",
            data: "ABCD",
          },
        ];
      }
      if (!this.state.statuses[buyerTurnipCode]) {
        this.state.statuses[buyerTurnipCode] = [
          {
            action: "testing",
            data: "ABCD",
          },
        ];
      }

      console.log("Generating visitorID");
      await this.handleVisitorID(sellerTurnipCode, null);
      console.log("Generating visitorID");
      await this.handleVisitorID(buyerTurnipCode, null);
    }
    this.handleQueue(type, sellerTurnipCode, buyerTurnipCode);
  }

  setTrades(type, sellerTurnipCode, buyerTurnipCode) {
    // could have used index, but the table gets updated dynamically
    // so might need to discrepancies
    // giving up on performance.
    if (type === "join") {
      let sellerIsland;
      let buyerIsland;
      this.state.islands.map((island) => {
        if (island.seller.turnipCode === sellerTurnipCode) {
          sellerIsland = island.seller;
        }
        if (island.buyer.turnipCode === buyerTurnipCode) {
          buyerIsland = island.buyer;
        }
      });

      if (
        this.failedTrades[sellerIsland.turnipCode] ||
        this.failedTrades[buyerIsland.turnipCode]
      ) {
        // play error
        // notify
        // this.errorSound.audioEl.current.play();
        // this.notify(
        //   "❌ Unable to join the queues: " +
        //     this.failedTrades[sellerIsland.turnipCode]
        //     ? "(" +
        //         sellerIsland.name +
        //         ")" +
        //         this.failedTrades[sellerIsland.turnipCode]
        //     : "" + this.failedTrades[buyerIsland.turnipCode]
        //     ? "(" +
        //       buyerIsland.name +
        //       ")" +
        //       this.failedTrades[buyerIsland.turnipCode]
        //     : ""
        // );
        console.log(
          "Unable to add trade: " +
            sellerIsland.turnipCode +
            " - " +
            buyerIsland.turnipCode
        );
      } else {
        // all good!
        this.state.yourTrades.push({
          seller: sellerIsland,
          buyer: buyerIsland,
        });
      }
    } else if (type === "leave") {
      let rId = -1;
      this.state.yourTrades.map((island, index) => {
        if (
          island.seller.turnipCode === sellerTurnipCode &&
          island.buyer.turnipCode === buyerTurnipCode
        ) {
          rId = index;
        }
      });
      if (rId > -1) {
        console.log("Removing your trades: " + rId);
        this.state.yourTrades.splice(rId, 1);
      }
      console.log("Removing visitorIDs");
      if (this.visitorIDs) {
        delete this.visitorIDs[sellerTurnipCode];
        delete this.visitorIDs[buyerTurnipCode];
      }

      console.log("Removing turnipQueueIDs");
      if (this.state.turnipQueueIDs) {
        delete this.state.turnipQueueIDs[sellerTurnipCode];
        delete this.state.turnipQueueIDs[buyerTurnipCode];
      }
    }
    this.setState({
      yourTrades: this.state.yourTrades,
    });
    this.autoSave();
    this.currentButtonElement.toggleLoading();
  }

  notify(message) {
    // toaster.notify(message, {
    //   duration: 2000,
    // });
  }

  playSound(type) {
    var audioEl = document.getElementsByClassName("audio-element-error")[0];
    switch (type) {
      case "ding":
        audioEl = document.getElementsByClassName("audio-element-ding")[0];
        break;
      case "waterdrop":
        audioEl = document.getElementsByClassName("audio-element-waterdrop")[0];
        break;
      default:
    }
    audioEl.play();
    // console.log("playSound");
    // this.alertSound.audioEl.current.src = dingMP3;
    // this.alertSound.audioEl.current.play();
  }

  getTradesServer() {
    fetch("/getTrades")
      // fetch("/getTradesTest")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((islands) => {
        this.setState({
          islands: islands,
          visitorName: this.state.visitorName,
          visitorIDs: this.visitorIDs,
        });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  async getTradesDirect() {
    let islands = await Facilitator.getTrades();
    this.setState({
      islands: islands,
      visitorName: this.state.visitorName,
      visitorIDs: this.visitorIDs,
    });
  }
  getTrades() {
    this.prevState = this.state;
    console.log("consolidating trades...");
    this.notify();
    this.getTradesServer();
    // this.getTradesDirect();
  }

  autoSave() {
    console.log("auto-saving trade states");
    this.cookies.set("tradeState", "activated", { path: "/" });
    this.cookies.set("visitorIDs", this.visitorIDs, {
      path: "/",
    });
    this.cookies.set("visitorName", this.state.visitorName, { path: "/" });
    // this.cookies.set("yourPlaces", this.state.yourPlaces, { path: "/" });
    this.cookies.set("yourTrades", this.state.yourTrades, { path: "/" });
    this.cookies.set("turnipQueueIDs", this.state.turnipQueueIDs, {
      path: "/",
    });
    console.log("New values: ");
    console.log(this.cookies.cookies);
  }

  autoPing() {
    console.log("auto ping");
    this.state.yourTrades.map((trade) => {
      this.handleQueue("ping", trade.seller.turnipCode, null);
      this.handleQueue("ping", null, trade.buyer.turnipCode);
      this.handleQueue("grab", trade.seller.turnipCode, null);
      this.handleQueue("grab", null, trade.buyer.turnipCode);

      // debug only.
      // this.state.dodoCodes[trade.seller.turnipCode] = Math.floor(
      //   Math.random() * 1000
      // );
      // this.state.dodoCodes[trade.buyer.turnipCode] = Math.floor(
      //   Math.random() * 1000
      // );
    });
  }

  autoRefresh() {
    var self = this;
    setInterval(function () {
      self.getTrades();
      self.autoSave();
      self.autoPing();
    }, 30000);
  }

  componentDidMount() {
    this.handleReconnect();
    this.getTrades();
    this.autoRefresh();
  }

  handleInfo(event) {
    switch (event.target.name) {
      case "Name":
        this.state.visitorName = event.target.value;
        break;
      default:
        console.log("Warning: unknown event + " + event.target.name);
        break;
    }
    this.autoSave();
  }

  handleClear(event) {
    console.log("Clearing visitorID");
    this.state.visitorIDs = {};
    this.autoSave();
  }

  render() {
    return (
      <React.Fragment>
        <Container>
          {/* <ReactAudioPlayer
            src={dingMP3}
            ref={(element) => {
              this.ding = element;
            }}
          />
          <ReactAudioPlayer
            src={waterdropMP3}
            ref={(element) => {
              this.waterdrop = element;
            }}
          />
          <ReactAudioPlayer
            src={errorMP3}
            ref={(element) => {
              this.errorSound = element;
            }}
          /> */}
          <ReactAudioPlayer
            ref={(element) => {
              this.alertSound = element;
            }}
          />

          <YourInformation
            visitorName={this.state.visitorName}
            onInfoChanged={this.handleInfo.bind(this)}
          />
          <YourStalkTable
            trades={this.state.yourTrades}
            yourPlaces={this.state.yourPlaces}
            dodoCodes={this.state.dodoCodes}
            statuses={this.state.statuses}
            queueIDs={this.state.turnipQueueIDs}
            sectionName="Your Stalks"
            sectionIcon={<Icon name="dolly" />}
            onHandleClick={this.handleClick.bind(this)}
          />
          <StalkMarketTable
            trades={this.state.islands}
            queueIDs={this.state.turnipQueueIDs}
            onHandleClick={this.handleClick.bind(this)}
            sectionName="Stalk Market"
            sectionIcon={<Icon name="money bill alternate" />}
          />
          {
            // below is ugly, to be refactored
          }
          <div>
            <audio className="audio-element-ding">
              <source src={dingMP3}></source>
            </audio>
          </div>
          <div>
            <audio className="audio-element-error">
              <source src={errorMP3}></source>
            </audio>
          </div>
          <div>
            <audio className="audio-element-waterdrop">
              <source src={waterdropMP3}></source>
            </audio>
          </div>
        </Container>
      </React.Fragment>
    );
  }
}

export default TradeMainPage;
