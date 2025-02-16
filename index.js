const panicLinks = [
    'https://classroom.google.com',
    'https://ixl.com',
    'http://www.skyward.com/',
    'http://launchpad.classlink.com'
];

const app = {
    panic: function (idx) {
        if (idx >= panicLinks.length) {
            console.log("CANNOT PANIC. Index out of bounds.");
            return;
        }
        console.log("PANIC: " + panicLinks[idx]);
        window.location.href = panicLinks[idx];
    },
    setup: function () {
        // When key combo is pressed, trigger panic function, based on pressed number key
        document.addEventListener('keydown', function(event) {
            const key = event.key;
            const keyNum = parseInt(key);
            if (!isNaN(keyNum) && keyNum >= 1 && keyNum <= panicLinks.length) {
                app.panic(keyNum - 1);
            }
            // Prevent default browser action for number keys
            event.preventDefault();
        });
    }
};