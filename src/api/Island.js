class Island {
  //name
  //turnipPrice
  //maxQueue
  //queued
  //turnipCode
  //islandTime
  //creationTime
  //description
  //islander (daisy, neither, celeste)
  constructor(obj) {
    this.name = obj.name;
    this.turnipPrice = obj.turnipPrice;
    this.maxQueue = obj.maxQueue;
    this.queuedStr = obj.queued;
    this.queuedPos = (function (obj) {
      if (obj["queued"]) {
        if (typeof obj.queued === "string") {
          return obj.queued.split("/")[0];
        }
      }
      console.log(
        "Warning: (" + obj.turnipCode + ") queued is not defined properly"
      );
      return 0;
    })(obj); // should expect an exception.
    this.queuedPosPercentage = (function (obj) {
      if (obj["queued"]) {
        if (typeof obj.queued === "string") {
          return eval(obj.queued);
        }
      }
      console.log(
        "Warning: (" + obj.turnipCode + ") queued is not defined properly"
      );
      return 0;
    })(obj);
    this.turnipCode = obj.turnipCode;
    this.islandTime = obj.islandTime;
    this.creationTime = obj.creationTime;
    this.description = obj.description;
    this.islander = obj.islander;
  }
}

module.exports = Island;
