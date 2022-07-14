import {} from "https://nettv.gov-online.go.jp/common/js/jquery.js";

const cr = (tag) => document.createElement(tag);

export const createNetTV = (id) => {
  const c = cr("span");
  const div = cr("div");
  div.id = "movi_" + id;
  div.className = "nettv";
  c.appendChild(div);
  const sc = cr("script");
  sc.src = `https://nettv.gov-online.go.jp/common/js/inettv.js?p=${id}&w=&h=&fp=0&lm=0&pt=0&l=0&e=0&s=1&o=1`;
  c.appendChild(sc);
  return c;
};
