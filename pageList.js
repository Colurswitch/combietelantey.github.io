const pageList = {
    generate: function(id,pageList) {
        document.getElementById(id).innerHTML = '';
        pageList.map( page => {
            `<div class="box" onclick="pageList.navigate('${page.destination}')">
                <h1 class="page-icon material-icons">${page.icon}</h1>
                <h3 class="page-title">${page.title}</h3>
            </div>`
        }).forEach(element => {
            document.getElementById(id).innerHTML += element;
        });
    }
}