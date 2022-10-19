import cheerio from "cheerio";

export const getData = async (link: string) => {
  const url = `https://cors-anywhere.herokuapp.com/${link}`;
  // const url = link;

  const response = await fetch(url);
  const body = await response.text();

  let $ = cheerio.load(body);

  const data = [""];

  $("td.l").each((i, element) => {
    if (element.children.length === 1) {
      if (element.children[0].type === "text") {
        if (element.children[0].data === "zajęcia dodatkowe") {
          data.push("zajecia dodatkowe");
        } else {
          data.push("okienko");
        }
      }
    }
    element.children.forEach((x) => {
      if (x.type === "tag") {
        if (x.children[0]) {
          if (x.children.length > 1) {
            if (x.children[0].type === "tag") {
              if (x.children[0].children[0].type === "text") {
                data.push(x.children[0].children[0].data);
              }
            }
            if (x.children[4].type === "tag") {
              if (x.children[4].children[0].type === "text") {
                data.push(x.children[4].children[0].data);
              }
            }
            return
          }
          if (x.children[0].type === "tag") {
            if (x.children[0].children[0].type === "text") {
              data.push(x.children[0].children[0].data);
            }
          } else if (x.children[0].type === "text") {
            if (x.children[0].data.includes("#")) return;
            data.push(x.children[0].data);
          }
        } else {
          data.push("<br>");
        }
      } else if (x.type === "text") {
        if (x.data.trim() === "-(P)" || x.data.trim() === "-(N)") {
          data.push(x.data);
        }
      }
    });
  });
  data.shift();
  return data;
};

const Scrapper = async (url: string) => {
  return await getData(url);
};

export default Scrapper;