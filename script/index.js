// Get the URL of the article from command line parameters.
const getThirdParam = () => {
  return new Promise((resolve, reject) =>{
    const thirdParam = process.argv[2];
    console.log("thirdParam:", thirdParam);
    if(typeof(thirdParam) === "undefined"){
      reject("ERR_HHH");
    } else {
      resolve(thirdParam);
    }
  });
};

getThirdParam().then(
  (log)=>{
    console.log(log);
  }
).catch(
  (err)=>{
    console.log(err);
  }
);
