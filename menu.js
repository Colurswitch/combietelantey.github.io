const menu = document.querySelector("body > div > div > div.mdl-layout__drawer > nav");
const menuItems = [
    {
        "title": "Home",
        "link": "/index.html"
    }
]
console.log(menuItems);

menu.innerHTML = menuItems.map((item) => {
    `<a class="mdl-navigation__link" href="${item.link}">${item.title}</a>`
})