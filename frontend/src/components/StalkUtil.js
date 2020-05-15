class StalkUtil {
  static sleep(ms) {
    console.log("Going to sleep for " + ms + "ms");
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

export default StalkUtil;
