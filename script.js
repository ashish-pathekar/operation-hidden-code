
// ===================================
// OPERATION HIDDEN CODE
// Simplified JavaScript
// ===================================


// 1. CONNECT JAVASCRIPT WITH HTML

var output = document.getElementById("output");
var input = document.getElementById("command-input");
var form = document.getElementById("command-form");
var terminal = document.getElementById("terminal");

var scoreText = document.getElementById("score");
var solvedText = document.getElementById("solved");
var hintsText = document.getElementById("hints-used");
var barFill = document.getElementById("bar-fill");
var clock = document.getElementById("clock");


// 2. GAME VARIABLES

var score = 0;
var solved = 0;
var hintsUsed = 0;
var seconds = 0;
var finished = false;
var foundEgg = false;


// 3. PUZZLES, ANSWERS AND HINTS

var answers = ["keyboard", "15", "hacker"];

var puzzles = [
    "I have keys but no locks, space but no room. What am I?",

    "Count the letters in keyboard and add the number of days in a week. What number do you get?",

    "Decode WPRZTG. Move every letter 15 places backward."
];

var hints = [
    "You are using one to type right now.",

    "Count the letters in keyboard and add 7.",

    "Move W back 15 places to get H."
];


// 4. DISPLAY A MESSAGE

function print(message, style) {

    var p = document.createElement("p");

    p.textContent = message;

    if (style) {
        p.className = style;
    }

    output.appendChild(p);

    output.scrollTop = output.scrollHeight;
}


// 5. UPDATE SCORE AND DASHBOARD

function updateScreen() {

    scoreText.textContent = score;
    solvedText.textContent = solved;
    hintsText.textContent = hintsUsed;

    // Update progress bar
    barFill.style.width = (solved / 3 * 100) + "%";


    // Update security layers
    for (var i = 1; i <= 3; i++) {

        var card = document.getElementById("layer" + i);

        var icon = card.querySelector(".icon");
        var tag = card.querySelector(".tag");

        if (i <= solved) {

            card.className = "layer cleared";
            icon.textContent = "🔓";
            tag.textContent = "CLEARED";

        } else if (i == solved + 1) {

            card.className = "layer active";
            icon.textContent = "🔒";
            tag.textContent = "ACTIVE";

        } else {

            card.className = "layer";
            icon.textContent = "🔒";
            tag.textContent = "LOCKED";
        }
    }
}


// 6. SAVE GAME PROGRESS

function saveGame() {

    localStorage.setItem("hcSolved", solved);
    localStorage.setItem("hcScore", score);
    localStorage.setItem("hcHints", hintsUsed);
    localStorage.setItem("hcEgg", foundEgg);
}


// 7. LOAD PREVIOUS GAME PROGRESS

function loadGame() {

    if (localStorage.getItem("hcSolved") !== null) {

        solved = Number(localStorage.getItem("hcSolved"));
        score = Number(localStorage.getItem("hcScore"));
        hintsUsed = Number(localStorage.getItem("hcHints"));

        foundEgg = localStorage.getItem("hcEgg") === "true";

        return true;
    }

    return false;
}


// 8. TIMER

setInterval(function () {

    if (!finished) {

        seconds++;

        var minutes = Math.floor(seconds / 60);
        var remainingSeconds = seconds % 60;

        clock.textContent =
            String(minutes).padStart(2, "0") + ":" +
            String(remainingSeconds).padStart(2, "0");
    }

}, 1000);


// 9. SHOW CURRENT PUZZLE

function showPuzzle() {

    if (solved < 3) {

        print(puzzles[solved], "puzzle-box");

    } else {

        print("All puzzles solved! Type unlock.", "good");
    }
}


// 10. CHECK THE ANSWER

function checkAnswer(userAnswer) {

    if (solved >= 3) {
        print("You have already solved all puzzles.");
        return;
    }

    if (userAnswer === "") {
        print("Please enter an answer.", "bad");
        return;
    }

    if (userAnswer === answers[solved]) {

        solved++;
        score = score + 100;

        print("Correct answer! +100 points", "good");

        if (solved < 3) {
            print("Type puzzle to see the next puzzle.");
        } else {
            print("All puzzles solved! Type unlock.", "good");
        }

        updateScreen();
        saveGame();

    } else {

        print("Wrong answer! Try again.", "bad");
    }
}


// 11. GIVE A HINT

function giveHint() {

    if (solved >= 3) {
        print("No hints needed. All puzzles are solved.");
        return;
    }

    print("HINT: " + hints[solved], "info-line");

    hintsUsed++;

    if (score >= 10) {
        score = score - 10;
    }

    updateScreen();
    saveGame();
}


// 12. SHOW GAME STATUS

function showStatus() {

    print("Puzzles solved: " + solved + "/3");
    print("Your score: " + score);
    print("Hints used: " + hintsUsed);
    print("Time: " + clock.textContent);
}


// 13. UNLOCK SECRET FILE

function unlock() {

    if (solved < 3) {

        print("File is locked! Solve all 3 puzzles first.", "bad");
        return;
    }

    finished = true;

    var secretCode = "AEGIS-" +
        answers[0][0].toUpperCase() +
        answers[1] +
        answers[2][0].toUpperCase();

    terminal.classList.add("finished");

    print("Decrypting file...", "info-line");
    print("FILE OPENED!", "good");
    print("SECRET CODE: " + secretCode, "puzzle-box");
    print("MISSION COMPLETE!", "good");
}


// 14. HIDDEN EASTER EGG

function easterEgg() {

    if (foundEgg) {
        print("You already found this secret.");
        return;
    }

    foundEgg = true;
    score = score + 50;

    print("EASTER EGG FOUND! +50 points", "good");

    updateScreen();
    saveGame();
}


// 15. SHOW HELP

function help() {

    print("AVAILABLE COMMANDS:", "info-line");

    print("help - Show commands");
    print("scan - Scan the file");
    print("puzzle - Show current puzzle");
    print("answer <text> - Submit answer");
    print("hint - Get a hint");
    print("status - Show your progress");
    print("unlock - Open secret file");
    print("clear - Clear terminal");
    print("reset - Restart game");
}


// 16. SCAN FILE

function scan() {

    print("Scanning file HC-07...", "info-line");
    print("Found 3 security layers.");
    print("Solve all puzzles to unlock the file.");
}


// 17. RESET GAME

function reset() {

    localStorage.removeItem("hcSolved");
    localStorage.removeItem("hcScore");
    localStorage.removeItem("hcHints");
    localStorage.removeItem("hcEgg");

    location.reload();
}


// 18. MAIN COMMAND FUNCTION

function runCommand(command) {

    command = command.trim().toLowerCase();

    if (command === "") {
        return;
    }

    print("agent@aegis:~$ " + command, "you");


    if (command === "help") {

        help();

    } else if (command === "scan") {

        scan();

    } else if (command === "puzzle") {

        showPuzzle();

    } else if (command === "hint") {

        giveHint();

    } else if (command === "status") {

        showStatus();

    } else if (command === "unlock") {

        unlock();

    } else if (command === "clear") {

        output.textContent = "";

    } else if (command === "reset") {

        reset();

    } else if (command === "sudo" || command === "sudo su") {

        easterEgg();

    } else if (command.startsWith("answer ")) {

        var userAnswer = command.substring(7).trim();

        checkAnswer(userAnswer);

    } else {

        print("Unknown command! Type help.", "bad");
    }
}


// 19. WHEN USER SUBMITS A COMMAND

form.addEventListener("submit", function(event) {

    event.preventDefault();

    runCommand(input.value);

    input.value = "";
});


// 20. QUICK COMMAND BUTTONS

var buttons = document.querySelectorAll(".quick button");

for (var i = 0; i < buttons.length; i++) {

    buttons[i].addEventListener("click", function() {

        var command = this.getAttribute("data-cmd");

        runCommand(command);

        input.focus();
    });
}


// 21. CLICK SECURITY LAYERS

for (var i = 1; i <= 3; i++) {

    document.getElementById("layer" + i)
        .addEventListener("click", function() {

            if (this.className.includes("active")) {
                showPuzzle();
            }
        });
}


// 22. CREATE FLOATING BINARY NUMBERS

function makeFloaters() {

    var box = document.getElementById("floaters");

    for (var i = 0; i < 25; i++) {

        var digit = document.createElement("span");

        digit.className = "floater";

        digit.textContent = Math.random() > 0.5 ? "1" : "0";

        digit.style.left = Math.random() * 100 + "%";

        box.appendChild(digit);
    }
}


// 23. START THE GAME

var hadSave = loadGame();

updateScreen();

makeFloaters();

if (hadSave) {

    print("Welcome back! Previous progress loaded.", "good");

} else {

    print("AEGIS OS v1.0", "info-line");
    print("Welcome, agent!");
    print("Type help to see available commands.", "good");
}
