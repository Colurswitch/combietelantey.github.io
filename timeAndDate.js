const tad = {
    time: new Date(),
    createTime: function(id, am_pm) {
        setInterval(() => {
            let time = am_pm ? (this.time.getHours()+1)%12 + ":" + this.time.getMinutes() + ":" + this.time.getSeconds() + " " + (this.time.getHours()+1)>12?"PM":"AM" : (this.time.getHours()+1) + ":" + this.time.getMinutes() + ":" + this.time.getSeconds();
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