const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const writeStream = fs.createWriteStream("result.csv");

const baseUrl = "https://www.efficity.com/";
const listUrl = "consultants-immobilier/";

const customHeaderRequest = request.defaults({
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2987.133 Safari/537.36"
  }
});

writeStream.write(`Nom,Prenom,Telephone, E-Mail \n`);

customHeaderRequest.get(baseUrl + listUrl, (err, resp, body) => {
  if (!err && resp.statusCode == 200) {
    $ = cheerio.load(body);
    let links = $(".c-content-list > li > a");
    const listOfLinks = [];
    $(links).each((i, link) => {
      listOfLinks.push($(link).attr("href"));
    });
    listOfLinks.forEach(link => {
      customHeaderRequest.get(baseUrl + link, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
          const contact = { lastname: "", firstname: "", phone: "", email: "" };
          $ = cheerio.load(body);

          let namePosition = $(".toolbarcontact h2")
            .text()
            .trim()
            .split(" ");
          let firstname = namePosition.splice(0, 1);
          let lastname = namePosition.join(" ");

          let phonePosition = $(".toolbarcontact h3 > span");
          let phone = $(phonePosition)
            .text()
            .trim()
            .split(" ")
            .join("");

          let emailPosition = $(".toolbarcontact h3 > a");
          let email = $(emailPosition)
            .text()
            .trim();

          writeStream.write(`${lastname}, ${firstname}, ${phone}, ${email} \n`);
        }
      });
    });
  }
});
