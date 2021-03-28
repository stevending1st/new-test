const fs = require("fs");

const cheerio = require("cheerio");
const TurndownService = require("turndown");
const turndownPluginGfm = require("turndown-plugin-gfm");

const {
  Path_ArticleFolder_R,
  Err_DontGetThirdParam,
  Err_DontGetTrueRoute,
  Err_SameNameFile,
  Err_NoPath,
  Err_DOMWrong,
  hostURL_EN,
  options
} = require("./toMarkdownConstant.js");

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

// Check the input parameters, and get the routing address of the article.
// - 原文网址：[原文标题](https://www.freecodecamp.org/news/xxxxxxx/
const getRouteAddr = (URL) => {
  // console.log(URL);
  return new Promise((resolve, reject) => {
    const re = /原文网址：\[[0-9a-zA-Z\-]+\]\(https:\/\/www\.freecodecamp\.org\/news\/(?<articleFileName>[0-9a-zA-Z\-]+)\//g;
    // const URLArr = URL.match(re);
    let URLArr = re.exec(URL);
    if(URLArr === null) {
      reject(Err_DontGetTrueRoute);
    }else{
      // console.log(URLArr);
      resolve(URLArr.groups.articleFileName);
    };
  });
};

// Check if the ${routerAddr}.md exists.If it exists, an error is reported.
const haveRouterAddrmd = (routerAddr) => {
  return new Promise((resolve, reject) => {
    fs.access(Path_ArticleFolder_R + routerAddr + ".md", fs.constants.F_OK, (err)=>{
      if(err){
        // There is no file with the same name.
      }else{
        // There is one file with the same name.
        reject(Err_SameNameFile);
      }
      const fileName = routerAddr + ".md";
      resolve(fileName);
    })
  })
};

// Convert HTML to markdown.
const HTMLtoMarkdown = (html) => {
  return new Promise((resolve, reject) => {
    if(options.path == "") {
      reject(Err_NoPath);
    }

    const $ = cheerio.load(html);

    // Original article Title
    const articleTitle = $(".post-full-title").text();
    // Original article address
    const articleURL = "https://" + options.hostname + options.path;
    // Original author's signature 
    const authorName = $(".author-card-name").children("a").text();
    // Original author's personal page
    const authorURL = hostURL_EN + $(".author-card-name").children("a").attr("href");
    if(articleTitle === "" || authorName === "" || authorURL === hostURL_EN){
      reject(Err_DOMWrong);
    }

    // full image
    let fullImage = $(".post-full-image").children("img");
    let fullImageURL;
    // Is there a full image
    if(fullImage === null) {
      fullImage = "";
    }else{
      fullImageURL = fullImage.attr("src");
      // Whether the src of the full image is empty
      if (fullImageURL === "") {
        reject(Err_DOMWrong);
      }else{
        const re = /^http/;
        // Is the src of the full image quoted from an external website
        if (re.test(fullImageURL)){
        }else{
          fullImageURL = hostURL_EN + fullImageURL;
          fullImage.attr("src", fullImageURL);
        }
      }
    }

    const article = fullImage + $(".post-content");

    const articleHeader =
`> -  原文地址：[${articleTitle}](${articleURL})
> -  原文作者：[${authorName}](${authorURL})
> -  译者：
> -  校对者：`;

    const strikethrough = turndownPluginGfm.strikethrough;
    const tables = turndownPluginGfm.tables;
    const taskListItems = turndownPluginGfm.taskListItems;
    const gfm = turndownPluginGfm.gfm;

    const turndownService = new TurndownService({
      headingStyle: "atx",
      bulletListMarker: "-",
      codeBlockStyle: "fenced"
    });

    turndownService.use(strikethrough);
    turndownService.use(tables);
    turndownService.use(taskListItems);
    turndownService.use(gfm);

    const markdown = turndownService.turndown(article);

    resolve(articleHeader + "\n\n" +markdown);
  });
}

// Write content to file.
const writetoFile = (content, fileName) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(Path_ArticleFolder_R + fileName, content, "utf8", (err) => {
      if(err){
        reject(err);
      }
    })
  });
}

module.exports = {
  getThirdParam,
  getRouteAddr,
  haveRouterAddrmd,
  HTMLtoMarkdown,
  writetoFile
}
