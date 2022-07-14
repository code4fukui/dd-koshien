import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { DOMParser } from "https://js.sabae.cc/DOMParser.js";
import { writeData } from "https://js.sabae.cc/writeData.js";

const url = "https://www.cas.go.jp/jp/seisaku/digital_denen/koushien.html";
const html = await fetchOrLoad(url);
//console.log(html);
const dom = new DOMParser().parseFromString(html, "text/html");
//console.log(dom);
const links = dom.querySelectorAll("a").map(a => {
  const url = a.getAttribute("href");
  const name = a.textContent.substring(1);
  return { url, name };
}).filter(a => a.url.startsWith("chiiki/"));
//console.log(links);

const trim2 = (s) => s[0] == "・" || s[0] == "●" ? s.substring(1).trim() : s.trim();

const list = [];
const base = "https://www.cas.go.jp/jp/seisaku/digital_denen/";
for (const link of links) {
  const url = base + link.url;
  const html = await fetchOrLoad(url);
  const dom = new DOMParser().parseFromString(html, "text/html");
  const tags = dom.querySelectorAll(".contents > *");
  let data = null;
  for (const tag of tags) {
    //console.log(tag.tagName);
    if (tag.tagName == "H2") {
      if (data) {
        data.src = url;
        list.push(data);
      }
      data = { pref: link.name };
      data.category = tag.textContent;
    } else if (tag.tagName == "UL") {
      data.url = base + "chiiki/" + tag.querySelector("a").getAttribute("href");
    } else if (tag.tagName == "CENTER") {
      const id = tag.querySelector("div > div").getAttribute("id").substring(5);
      const murl = `https://nettv.gov-online.go.jp/prg/prg${id}.html`;
      data.nettvid = id;
      data.movie = murl;
      const mhtml = await fetchOrLoad(murl);
      const mdom = new DOMParser().parseFromString(mhtml, "text/html");
      mdom.querySelectorAll("meta").forEach(meta => {
        const p = meta.getAttribute("property");
        if (p == "og:image") {
          data.image = meta.getAttribute("content");
        }
      });
      const title = mdom.querySelector("title").textContent.split("｜");
      data.city = title[0];
      data.title = title[1];
      const date = mdom.querySelector(".ci-date strong").textContent;
      //data.date = date; // 全部 2022-06-15?
    } else if (tag.tagName == "P") {
      const st = tag.querySelector("strong");
      if (st) {
        data.name = trim2(st.textContent);
      } else {
        data.description = trim2(tag.textContent);
      }
    }
  }
  if (data) {
    data.src = url;
    list.push(data);
  }
}
await writeData("../data/dd-koshien-2022s", list);
