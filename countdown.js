// Set the date we're counting down to
var countDownDate = new Date(2024,4,24,11,54).getTime();
// Set the HTML element the timer will display in
var element = document.getElementsByClassName("mdl-card__title-text").item(0);

// Update the count down every 1 second
window.onload = function () {
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Display the result in the element with id="demo"
        element.innerHTML = days + " days, " + hours + " hours, "
            + minutes + " minutes and " + seconds + " seconds left";

        // If the count down is finished, write some text
        if (distance < 0) {
            clearInterval(x);
            element.innerHTML = "EXPIRED";
        }
    }, 1000);
}