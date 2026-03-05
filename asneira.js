// converter-cookies.js
const fs = require("fs");

// 1) Cole seu conteúdo em cookies.txt (NÃO aqui no chat)
const raw = fs.readFileSync("cookies.txt", "utf8").trim();

// 2) Split por ; e parse de cada JSON
const parts = raw.split(";").map(s => s.trim()).filter(Boolean);

const mapSameSite = (v) => {
  // Aceitos por muitos importadores: "None", "Lax", "Strict"
  const x = String(v || "").toLowerCase();
  if (x === "lax") return "Lax";
  if (x === "strict") return "Strict";
  // "no_restriction", "unspecified", vazio -> "None"
  return "None";
};

const cookies = parts.map((p) => {
  const c = JSON.parse(p);

  // normalizações comuns
  if (typeof c.expirationDate !== "undefined") {
    c.expirationDate = Math.floor(Number(c.expirationDate));
  }
  c.sameSite = mapSameSite(c.sameSite);

  // Alguns importadores preferem "url decode" no value; outros NÃO.
  // Deixe como está. Se seu importador exigir, descomente a linha abaixo:
  // c.value = decodeURIComponent(c.value);

  return c;
});

// 3) Salva em cookies.json
fs.writeFileSync("cookies.json", JSON.stringify(cookies, null, 2));
console.log("OK: gerado cookies.json");