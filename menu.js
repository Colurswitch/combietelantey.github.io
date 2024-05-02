const menu = document.querySelector("body > div > div > div.mdl-layout__drawer > nav");
const menuItems = JSON.parse(fetch("/menu.json").then((res) => {
    console.log(res.json())
    return res.json()
}))