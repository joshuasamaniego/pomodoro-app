class Timer {
    constructor() {
        this.circle = document.querySelector('#ring > circle');
        this.clock = document.getElementById('clock');
        this.actionElement = document.getElementById('startStop');

        this.pomodoroMinutes = document.getElementById("pomodoroMins");
        this.pomodoroNumber = parseInt(this.pomodoroMinutes.innerHTML);
        this.shortBreakMinutes = document.getElementById("shortBreakMins");
        this.shortBreakNumber = parseInt(this.shortBreakMinutes.innerHTML);
        this.longBreakMinutes = document.getElementById("longBreakMins");
        this.longBreakNumber = parseInt(this.longBreakMinutes.innerHTML);

        this.timer = 25;
        this.text = `${this.timer} <= 9 ? 0${this.timer} : ${this.timer}`;
    }

    settingsReset(id, value) {
        this.stop();
        if(id == "shortBreakMins") {
            this.timer = value;
        } else if(id == "longBreakMins") {
            this.timer = value;
        } else if(id == "pomodoroMins") {
            this.timer = value;
        }
        this.text = (this.timer <= 9) ? ("0" + this.timer) : (this.timer);
        this.actionElement.innerHTML = "start";
        this.clock.innerHTML = this.text + ":00";
        this.circle.style.strokeDashoffset = 0;
    }

    reset(value) {
        this.stop();
        if(value == "shortBreak") {
            this.shortBreakNumber = parseInt(this.shortBreakMinutes.innerHTML);
            this.timer = this.shortBreakNumber
        } else if(value == "longBreak") {
            this.longBreakNumber = parseInt(this.longBreakMinutes.innerHTML);
            this.timer = this.longBreakNumber
        } else {
            this.pomodoroNumber = parseInt(this.pomodoroMinutes.innerHTML);
            this.timer = this.pomodoroNumber
        }
        this.text = (this.timer <= 9) ? ("0" + this.timer) : (this.timer);
        this.actionElement.innerHTML = "start";
        this.clock.innerHTML = this.text + ":00";
        this.circle.style.strokeDashoffset = 0;
    }

    start() {
        function format(timeFormat) {
            return (timeFormat < 10) ? "0" + timeFormat : timeFormat;
        }

        this.clock.innerHTML = `${this.text}:00`;
        this.circle.style.strokeDashoffset = 0;

        let time = this.timer * 60;
        let startTime = time;
        let minutes = 0;
        let seconds = 0;
        time--;

        this.interval = setInterval(() => {
            minutes = Math.floor(time / 60);
            seconds = time % 60;
            let minutesText = format(minutes);
            let secondsText = format(seconds);
            this.clock.innerHTML = minutesText + ":" + secondsText;

            const percent = ((time % startTime) / startTime);
            const offset = 1024 - (percent * 1024);
            this.circle.style.strokeDashoffset = offset;

            if(--time <= -1) {
                // this.timer = 0;
                clearInterval(this.interval)
                this.actionElement.innerHTML = "start";
            }
        }, 1000);
        this.actionElement.innerHTML = "pause";
    }
    
    stop() {
        // pause time
        clearInterval(this.interval);
        // reset the action
        this.actionElement.innerHTML = "start";
        // console.log(this.timer);
    }
}

// ----------------------------------------------------------------
// Timer functions
// ----------------------------------------------------------------

const countdownTimer = new Timer();
countdownTimer.reset();

function handleClick(str)  {
    switch(str.toLowerCase()) {
        case "start": 
            countdownTimer.start();
            break;
        default:
            countdownTimer.stop();
            break;
    }
}

// ----------------------------------------------------------------
// Nav functions
// ----------------------------------------------------------------

// Accessing inner numbers
const pomodoroMins = document.getElementById("pomodoroMins");
const shortBreakMins = document.getElementById("shortBreakMins");
const longBreakMins = document.getElementById("longBreakMins");

const navLinks = document.querySelectorAll("nav > ul > li");
const navBg = document.getElementById("bgIndicator");

for (const i in navLinks) {
    navLinks.item(i).addEventListener('click', (ev) => {
        navLinks.forEach(link => link.classList.remove("active"));
        navBg.style.marginLeft = `calc(calc(100%/3) * ${i})`;
        ev.target.classList.add("active");

        if(ev.target.id == "shortBreak") {
            countdownTimer.reset(ev.target.id)
        } else if(ev.target.id == "longBreak") {
            countdownTimer.reset(ev.target.id)
        } else {
            countdownTimer.reset(ev.target.id)
        }
    })
    
}

// ----------------------------------------------------------------
// Timer Settings functions
// ----------------------------------------------------------------

// Accessing up/down arrows by Class
const up = document.getElementsByClassName('up');
const down = document.getElementsByClassName('down');

// Making Universal functions
function plusOne(value) {
    let number = value + 1;
    return number;
}
function minusOne(value) {
    let number = value - 1;
    return number;
}

for (const arrow of up) {
    arrow.addEventListener("click", (ev) => {
        let pomodoroNumber = parseInt(pomodoroMins.innerHTML);
        let shortBreakNumber = parseInt(shortBreakMins.innerHTML);
        let longBreakNumber = parseInt(longBreakMins.innerHTML);

        if(ev.target.id === "pomodoroUp" && pomodoroNumber < 60) {
            pomodoroMins.innerHTML = plusOne(pomodoroNumber);
        } else if (ev.target.id === "shortBreakUp" && shortBreakNumber < 60) {
            shortBreakMins.innerHTML = plusOne(shortBreakNumber);
        } else if (ev.target.id === "longBreakUp" && longBreakNumber < 60){
            longBreakMins.innerHTML = plusOne(longBreakNumber);
        }
    })
}

for (const arrow of down) {
    arrow.addEventListener("click", (ev) => {
        let pomodoroNumber = parseInt(pomodoroMins.innerHTML);
        let shortBreakNumber = parseInt(shortBreakMins.innerHTML);
        let longBreakNumber = parseInt(longBreakMins.innerHTML);

        if(ev.target.id === "pomodoroDown" && pomodoroNumber >= 2) {
            pomodoroMins.innerHTML = minusOne(pomodoroNumber);
        } else if (ev.target.id === "shortBreakDown" && shortBreakNumber >= 2) {
            shortBreakMins.innerHTML = minusOne(shortBreakNumber);
        } else if (ev.target.id === "longBreakDown" && longBreakNumber >= 2) {
            longBreakMins.innerHTML = minusOne(longBreakNumber);
        }
    })
}

// ----------------------------------------------------------------
// Font Settings functions
// ----------------------------------------------------------------

// grabbing modalContainer to allow user to get a preview of what the 
// font change will look like.
const modalContainer = document.getElementById("modalContainer");

// grabbing fontCircles
const fontCircles = document.getElementsByClassName("fontCircles");

// grabbing modal button to change styles specifically
const modalButton = document.getElementById("modalButton");

for (const circle of fontCircles) {
    circle.addEventListener("click", (ev) => {
        for (const circle of fontCircles) {
            circle.classList.remove("fontActive")
        }
        // use currentTarget to get the parent element,
        // and assign the class name there.
        ev.currentTarget.classList.add("fontActive");
        
        // Maybe use switch statement here?
        if (ev.currentTarget.id == "roboto") {
            modalContainer.style.fontFamily = "Roboto Slab", "serif";
            modalButton.style.fontFamily = "Roboto Slab", "serif";
        } else if (ev.currentTarget.id == "space") {
            modalContainer.style.fontFamily = "Space Mono", "monospace";
            modalButton.style.fontFamily = "Space Mono", "monospace";
        } else {
            modalContainer.style.fontFamily = "Kumbh Sans", "sans-serif";
            modalButton.style.fontFamily = "Kumbh Sans", "sans-serif";
        }
    })
}

// ----------------------------------------------------------------
// Color Settings functions
// ----------------------------------------------------------------

// grabbing modalButton to see color reflections
    // already done in Font Settings functions in index.js, line 171!

// grabbing all colorCircles 
const colorCircles = document.getElementsByClassName("colorCircles");

// grabbing all the checkmarks
const checkmarks = document.getElementsByClassName("checkmark");

for (const circle of colorCircles) {
    circle.addEventListener("click", (ev) => {
        for (const checkmark of checkmarks) {
            if (ev.target.firstChild.classList == "checkmark checkActive") {
                return;
            } else {
                checkmark.classList.remove("checkActive")
            }
        };
        ev.target.firstChild.classList.add("checkActive");
        
        if (ev.target.id == "green") {
            modalButton.style.backgroundColor = "#70f3f8";
        } else if (ev.target.id == "purple") {
            modalButton.style.backgroundColor = "#d881f8";
        } else {
            modalButton.style.backgroundColor = "#f87070";
        }
    })
}

// ----------------------------------------------------------------
// Apply Button functions
// ----------------------------------------------------------------
//grab hinge point (applyButton), and body
const applyButton = document.getElementById("modalButton");
const body = document.getElementById("body")
//grab elements who's color will change
let newRing = document.querySelector("#ring > circle");
//grab new values from 
const pomoMinutes = document.getElementById("pomodoroMins");
const shortMinutes = document.getElementById("shortBreakMins");
const longMinutes = document.getElementById("longBreakMins");
//grab
const makeActive = document.getElementById('pomodoro');
const navigationLinks = document.querySelectorAll("nav > ul > li");
const navBackground = document.getElementById("bgIndicator");

function settingsUpdate() {
    navigationLinks.forEach(link => link.classList.remove("active"));
    makeActive.classList.add("active");
    navBackground.style.marginLeft = 0;
}

applyButton.addEventListener('click', () => {
    // Handling Styles
    navBg.style.backgroundColor = applyButton.style.backgroundColor;
    newRing.style.stroke = applyButton.style.backgroundColor;
    body.style.fontFamily = applyButton.style.fontFamily;
    // Handling Timer Inputs
    const pomoMinutesNum = parseInt(pomoMinutes.innerHTML);
    const shortMinutesNum = parseInt(shortMinutes.innerHTML);
    const longMinutesNum = parseInt(longMinutes.innerHTML);
    countdownTimer.settingsReset(shortMinutes.id, shortMinutesNum);
    countdownTimer.settingsReset(longMinutes.id, longMinutesNum);
    countdownTimer.settingsReset(pomoMinutes.id, pomoMinutesNum);
    settingsUpdate()

    modal.style.display = "none";

})

// save settings to localStorage to combat refresh
// settings retaining previous setting when cancelled!
