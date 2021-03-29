const {
  getThirdParam,
} = require("./toMarkdownSubfun.js");

(async function toMarkdown() {
  try{
    const thirdParam = await getThirdParam();
    if ( Number(thirdParam) % 2 === 1 ) {
      return true
    } else {
      return false
    }
  } catch(e) {
    console.log("ERR:", e);
    return false
  }
})();
