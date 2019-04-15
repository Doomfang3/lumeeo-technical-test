const request = require("request");
const cheerio = require("cheerio");

const baseUrl = "https://www.efficity.com/";
const listUrl = "consultants-immobilier/";

const customHeaderRequest = request.defaults({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
  }
});

customHeaderRequest.get(baseUrl + listUrl, (err, resp, body) => {
  $ = cheerio.load(body);
  let links = $(".c-content-list > li > a");
  const listOfLinks = [];
  $(links).each((i, link) => {
    listOfLinks.push($(link).attr("href"));
  });
});
