const pageList = {
    generate: function(id,pageList) {
        document.getElementById(id).innerHTML = '';
        pageList.forEach(page => {
            document.getElementById(id).innerHTML += `<div class="box" onclick="pageList.navigate('${page.url}')">
                <h1 class="page-icon material-icons">${page.icon}</h1>
                <h3 class="page-title">${page.title}</h3>
            </div>`;
        });
    },
    navigate: function(destination) {
        // Navigate to the specified destination page
        console.log(`Navigating to ${destination}`);
        
        document.getElementById("inner-page-view").src = destination;
        document.getElementById("main-view").style.display = "none";
        document.getElementById("page-view").style.display = "block";
    }
}