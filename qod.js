// Quote Of Day generator
const qod = {
    create: function(id) {
        var quotes = [
            "Love is a force that moves mountains, not stones.",
            "The only way to do great work is to love what you do.",
            "The greatest glory in living lies not in never falling, but in rising every time we fall.",
            "When the going gets tough, the tough get going.",
            "The way to get started is to quit talking and begin doing.",
            "Believe you can and you're halfway there.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "A person who never makes a mistake never tries anything new.",
            "Success is not final, failure is not fatal: It is the courage to continue that counts.",
            "The important thing is not to stop questioning. Curiosity has its own reason for existing.",
            "When you encounter a problem, don't be discouraged by it. Try to find a solution."
        ]
        document.getElementById(id).innerHTML = quotes[Math.floor(Math.random() * quotes.length)];
    }
}