const TVSidebar = {
    sidebar: null,
    init(id, menuData = {}, isClosed = false, frame, keyToOpen = "o") {
        var sidebar = document.querySelector("#" + id);
        if (menuData.title && menuData.items) {
            sidebar.innerHTML = `<div class="tvs-side-top">
            <h1>${menuData.title}</h1>
          </div>`;
          const tvsSideBottom = document.createElement("div");
          tvsSideBottom.classList.add("tvs-side-bottom");
          menuData.items.forEach(item => {
            const tvsSideItem = document.createElement("div");
            tvsSideItem.classList.add("tvs-side-item");
            tvsSideItem.classList.add(
                menuData.items.indexOf(item) < 1? "is-selected" : ""
            );
            tvsSideItem.onclick = item.callback;
            tvsSideItem.innerHTML = `
              <div class="tvs-side-item-left">
                <span class="material-icons">${item.icon}</span>
              </div>
              <div class="tvs-side-item-right">
                <h2>${item.title}</h2>
                <h2>${item.description}</h2>
              </div>
            `;
            tvsSideBottom.appendChild(tvsSideItem);
          });
          sidebar.appendChild(tvsSideBottom);
        }
        var sidebarItems = document.querySelectorAll(
            `#${id} .tvs-side-bottom .tvs-side-item`
        );
        
        this.sidebar = sidebar;
        var scrollOptions = { behavior: "smooth", block: "center" };
        var ovr = 0;
        frame.contentWindow.onkeydown = (event) => {window.onkeydown(event)}
        window.onkeydown = (event) => {
            for (var i = 0; i < sidebarItems.length; i++) {
                if (sidebarItems[i].classList.contains("is-selected")) {
                    console.log(event.key);
                    switch (event.code) {
                        case "KeyW":
                        case "ArrowUp":
                            if (sidebarItems[i].previousElementSibling != null) {
                                sidebarItems[i].classList.remove("is-selected");
                                sidebarItems[i].previousElementSibling.classList.add(
                                    "is-selected"
                                );
                                sidebarItems[i].previousElementSibling.scrollIntoView(
                                    scrollOptions
                                );
                            }
                            break;
                        case "KeyS":
                        case "ArrowDown":
                            if (sidebarItems[i].nextElementSibling != null && ovr == 0) {
                                sidebarItems[i].classList.remove("is-selected");
                                sidebarItems[i].nextElementSibling.classList.add("is-selected");
                                sidebarItems[i].nextElementSibling.scrollIntoView(
                                    scrollOptions
                                );
                                ovr = 1;
                            }
                            break;
                        case "Enter":
                            sidebarItems[i].click()
                            break;
                        case "Backquote":
                            sidebar.classList[
                                sidebar.classList.contains("is-hidden") ? "remove" : "add"
                            ]("is-hidden");
                    }
                }
            }
            if (!sidebar.classList.contains("is-hidden")) {
                event.preventDefault();
            }
            ovr = 0;
        };
        if (isClosed) sidebar.classList.add("is-hidden")
    },
    readKey() {
        return new Promise((resolve) => {
            window.addEventListener("keypress", resolve, { once: true });
        });
    },
    async alertDLG(text, options) {
        this.sidebar.classList.add("is-hidden");
    },
};
