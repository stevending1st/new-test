let { exec } = require('child_process');

const {
  getThirdParam,
} = require("./toMarkdownSubfun.js");

let returnCode;

(async function toMarkdown() {
  try{
    const thirdParam = await getThirdParam();
    if ( Number(thirdParam) % 2 === 1 ) {
      // console.log(true);
      // returnCode = true
      let p1 = exec('echo "DONEXT=${{ true }}" >> $GITHUB_ENV; echo 1;', function(err, stdout, stderr) {
        console.log(stdout)
      });
      // console.log("1");
      // return true
    } else {
      // console.log(false);
      let p1 = exec('echo "DONEXT=${{ false }}" >> $GITHUB_ENV; echo 2;', function(err, stdout, stderr) {
        console.log(stdout)
      });
      returnCode = false
      // console.log("2");
      // return false
    }
  } catch(e) {
    // console.log("ERR:", e);
    // returnCode = false
    let p1 = exec('echo "DONEXT=${{ false }}" >> $GITHUB_ENV; echo 3;', function(err, stdout, stderr) {
      console.log(stdout)
    });
    console.log("3");
    // return false
  }
})();

// async function fn() {
//   return false;
// }

// toMarkdown().then(e=>e).catch(e=>e)

// console.log("1");

// let go = () =>{
// toMarkdown()
//   .then((value)=>{
//     return value;
//   }).catch((err) => {
//     return err;
//   });
// }

// console.log(go);
