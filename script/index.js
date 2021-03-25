
// Get the URL of the article from command line parameters.
const getThirdParam = () => {
  return new Promise((resolve, reject) =>{
    const thirdParam = process.argv[2];
    if(typeof(thirdParam) === "undefined"){
      reject(Err_DontGetThirdParam);
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
