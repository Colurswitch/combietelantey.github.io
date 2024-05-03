const menu = document.querySelector(".mdl-layout__drawer .mdl-navigation");
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