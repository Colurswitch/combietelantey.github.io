const menu = document.querySelector(".mdl-layout__drawer .mdl-navigation");
const menuItems = [
    {
        "title": "Home",
        "link": "/index.html"
    }
]
console.log(menuItems);

menu.innerHTML = "";
menuItems.map((item) => {
    var temp = document.createElement("a");
    temp.setAttribute("href",item.link);
    temp.classList.add("mdl-navigation__link");
    temp.innerText = item.title;
    menu.appendChild(temp);
    console.log(temp.outerHTML);
})