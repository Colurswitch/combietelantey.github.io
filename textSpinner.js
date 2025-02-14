var interval; var iteration = 0;
var spinner = ['|', '/', '-', '\\'];

const textSpinner = {
    create: function(id) {
        interval = setInterval(function() {
            iteration = (iteration + 1) % spinner.length;
            document.getElementById(id).textContent = 'Loading'+ spinner[iteration];
        }, 100);
    },
    stop: function(id) {
        clearInterval(interval);
        document.getElementById(id).textContent = 'Loading complete!';
    }
};