import { fetchOrLoad } from "https://js.sabae.cc/fetchOrLoad.js";
import { DOMParser } from "https://js.sabae.cc/DOMParser.js";
import { CSV } from "https://js.sabae.cc/CSV.js";

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

const list = [];
const base = "https://www.cas.go.jp/jp/seisaku/digital_denen/";
for (const link of links) {
  const html = await fetchOrLoad(base + link.url);
  const dom = new DOMParser().parseFromString(html, "text/html");
  const tags = dom.querySelectorAll(".contents > *");
  let data = null;
  for (const tag of tags) {
    //console.log(tag.tagName);
    if (tag.tagName == "H2") {
      if (data) {
        list.push(data);
      }
      data = { pref: link.name };
      data.category = tag.textContent;
    } else if (tag.tagName == "UL") {
      data.url = base + "chiiki/" + tag.querySelector("a").getAttribute("href");
    } else if (tag.tagName == "CENTER") {
      const id = tag.querySelector("div > div").getAttribute("id");
      const murl = `https://nettv.gov-online.go.jp/prg/prg${id.substring(5)}.html`;
      data.movie = murl;
      const mhtml = await fetchOrLoad(murl);
      const mdom = new DOMParser().parseFromString(mhtml, "text/html");
      mdom.querySelectorAll("meta").forEach(meta => {
        const p = meta.getAttribute("property");
        if (p == "og:image") {
          data.image = meta.getAttribute("content");
        }
      });
    } else if (tag.tagName == "P") {
      const st = tag.querySelector("strong");
      if (st) {
        data.name = st.textContent.substring(1).trim();
      } else {
        data.description = tag.textContent.substring(1).trim();
      }
    }
  }
  if (data) {
    list.push(data);
  }
}
await Deno.writeTextFile("../data/dd-koshien.csv", CSV.stringify(list));
