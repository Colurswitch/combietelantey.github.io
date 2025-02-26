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
        // Initialize error handling
        window.onerror = function(message, url, lineNo, columnNo, error) {
            console.error('Error: ', message);
            console.error('URL: ', url);
            console.error('Line No: ', lineNo);
            console.error('Column No: ', columnNo);
            console.error('Error object: ', error);
            // Use toastr.js to display error message
            toastr.error('An error occurred: '+ message + '\n'
                + 'URL: '+ url + '\n'
                + 'Line No: '+ lineNo + '\n'
                + 'Column No: '+ columnNo + '\n'
                + 'Error: '+ error
                //,"Error"
            );
        }

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
            toastr.info("Local storage not available.");
        }

        // Style body::before
        var newStyle = document.getElementById('settingStyle');
        newStyle.type = 'text/css'; newStyle.innerHTML = "body::before{background:"+appValues.background+"!important;}";

        // Initialize toastr.js
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-bottom-right",
            "preventDuplicates": false,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "2000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
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