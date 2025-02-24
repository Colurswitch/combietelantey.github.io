var appValues = {
    tvmode: false, // Whether to use TV mode. (Not implemented, yet.)
    am_pm: true, // Whether to use AM/PM time or 24-hour time
    panicLinks : [ // Panic links
        'https://classroom.google.com',
        'https://ixl.com',
        'http://www.skyward.com/',
        'http://launchpad.classlink.com'
    ],
    background: "rgb(158, 24, 24)", // CSS background
}

const wapp = {
    panic: function (idx) {
        if (idx >= appValues.panicLinks.length) {
            console.log("CANNOT PANIC. Index out of bounds.");
            return;
        }
        console.log("PANIC: " + appValues.panicLinks[idx]);
        window.location.href = appValues.panicLinks[idx];
    },
    storageAvailable: function (type) {
        let storage;
        try {
          storage = window[type];
          const x = "__storage_test__";
          storage.setItem(x, x);
          storage.removeItem(x);
          return true;
        } catch (e) {
          return (
            e instanceof DOMException &&
            e.name === "QuotaExceededError" &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
          );
        }
    },
    setup: function () {
        // When key combo is pressed, trigger panic function, based on pressed number key
        /*document.addEventListener('keydown', function(event) {
            const key = event.key;
            const keyNum = parseInt(key);
            if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= panicLinks.length && event.ctrlKey && event.altKey && event.shiftKey) {
                app.panic(keyNum - 1);
            }
            // Prevent default browser action for number keys
            event.preventDefault();
        });*/

        // Can we use localStorage?
        if (wapp.storageAvailable('localStorage')) {
            console.log("localStorage available.");
            if (localStorage["settings"] != null) {
                appValues = JSON.parse(localStorage["settings"]);
            } else {
                console.log("localStorage not found, using default values.");
                localStorage["settings"] = JSON.stringify(appValues);
            }
        } else {
            console.log("localStorage NOT available.");
        }

        // Style body::before
        var newStyle = document.getElementById('settingStyle');
        newStyle.type = 'text/css'; newStyle.innerHTML = "body::before{background:"+appValues.background+"!important;}";
    },
    save: function() {
        if (wapp.storageAvailable('localStorage')) {
            console.log("localStorage available.");
            localStorage["settings"] = JSON.stringify(appValues);
        } else {
            console.log("localStorage NOT available.");
        }
    }
};