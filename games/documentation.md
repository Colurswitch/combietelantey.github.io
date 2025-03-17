# Criteria for Games
When uploading your game, make sure it in the format of a .zip archive. The archive must contain the following files.
- Your game's files
- An "info.txt" file containing:
    - the name of the game
    - the game's description
    - the game's genre(s)
    - relative path to the game's icon (optional)
    - relative path to the game's banner (optional)
    - relative path to the game's root file (must be a file that is viewable by the browser, like a .html or .htm file)
    - date of creation or release the game
    - relative path to the game's download link (can be a .zip archive, or external link)
- An "achievements.json" file (optional) containing:
    - an array of objects (array must be root of json file) containing the following properties:
        - title of the achievement (property name: "title")
        - description or how to get the achievement (property name: "description")
        - the achievement's icon (property name: "photo", optional)
        - the achievement's type (property name: "type") that is one of the following values:
            - "instant": you can earn this achievement instantly
            - "progress": achievement takes progress
        - the achievement's score (property name: "score")
        - the achievement's rarity (property name: "rare", true or false)
        - the achievement's target (property name: "target", only use if achievement is of type "progress")
        - the achievement's check function (property name: "checkFunc", should contain valid JavaScript code that must return a boolean if the achievement is of type "instant", and must return an integer or float if the achievement is of type "progress")

Your games will be reviewed by admin prior to submission. If you want to upload a new game, visit [the account page](/account.html)