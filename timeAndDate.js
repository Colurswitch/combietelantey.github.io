const tad = {
    time: new Date(),
    createTime: function(id, am_pm) {
        setInterval(() => {
            let time = am_pm ? 
                (this.time.getHours())%12 + ":"
                + this.time.getMinutes() + ":"
                + (this.time.getSeconds()<10?"0"+this.time.getSeconds():this.time.getSeconds()) + " "
                + ((this.time.getHours())>12?"PM":"AM") :
                (this.time.getHours()) + ":" + this.time.getMinutes() + ":" + this.time.getSeconds();
            document.getElementById(id).innerHTML = time;
        }, 100);
    },
    createDate: function(id) {
        setInterval(() => {
            let date = this.time.toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
              });
            document.getElementById(id).innerHTML = date;
        }, 1000);
    }
}

setInterval(() => {
    tad.time = new Date();
}, 100);