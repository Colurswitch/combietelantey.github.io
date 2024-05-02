import data from "./menu.json"

const menu = document.querySelector("body > div > div > div.mdl-layout__drawer > nav");
const menuItems = JSON.parse(data);
console.log(data);