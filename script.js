 //navbar

const burger = document.getElementById('burgerMenu');
const nav = document.getElementById('navbar');
/*const header = document.getElementById("header");*/

const homeDropdown = document.getElementById("home-dropdown");
const studyDropdown = document.getElementById("study-dropdown");
const subjectsButton = document.getElementById('subjects-button');

const dropdown = document.getElementById('dropdown');

const mathDropdown = document.getElementById('math-dropdown');
const physicsDropdown = document.getElementById('physics-dropdown');
const chemistryDropdown = document.getElementById('chemistry-dropdown');

const mathButton = document.getElementById('math-button');
const physicsButton = document.getElementById('physics-button');
const chemistryButton = document.getElementById('chemistry-button');

const mathDropdown2 = document.getElementById('math-dropdown2');
const physicsDropdown2 = document.getElementById("physics-dropdown2");
const chemistryDropdown2 = document.getElementById("chemistry-dropdown2");

burger.onclick = () => {
    nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
};

subjectsButton.onclick = () => {
    // Toggle visibility of dropdown and other dropdowns
    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
    homeDropdown.style.display = homeDropdown.style.display === 'none' ? 'block' : 'none';
    studyDropdown.style.display = studyDropdown.style.display === 'none' ? 'block' : 'none';
};

mathButton.onclick = () => {
    // Toggle visibility of mathDropdown2 and other dropdowns
    mathDropdown2.style.display = mathDropdown2.style.display === 'flex' ? 'none' : 'flex';
    physicsDropdown.style.display = physicsDropdown.style.display === 'none' ? 'flex' : 'none';
    chemistryDropdown.style.display = chemistryDropdown.style.display === 'none' ? 'flex' : 'none';
};

physicsButton.onclick = () => {
    // Toggle visibility of physicsDropdown2 and other dropdowns
    physicsDropdown2.style.display = physicsDropdown2.style.display === 'flex' ? 'none' : 'flex';
    mathDropdown.style.display = mathDropdown.style.display === 'none' ? 'flex' : 'none';
    chemistryDropdown.style.display = chemistryDropdown.style.display === 'none' ? 'flex' : 'none';
};

chemistryButton.onclick = () => {
    // Toggle visibility of chemistryDropdown2 and other dropdowns
    chemistryDropdown2.style.display = chemistryDropdown2.style.display === 'flex' ? 'none' : 'flex';
    mathDropdown.style.display = mathDropdown.style.display === 'none' ? 'flex' : 'none';
    physicsDropdown.style.display = physicsDropdown.style.display === 'none' ? 'flex' : 'none';
};



 //tasks
 //set constants
const inputBox = document.getElementById("taskInput");
const listContainer = document.getElementById("tasksContainer");

function addTask() {
  if(inputBox.value === '') {
    alert("Error: You must write something!");//prevents users from adding empty tasks
  }
  else {//when they enter a valid input
    let li = document.createElement("li");//creates a list item
    li.innerHTML = inputBox.value;//the task from the input will be displayed as a list item
    listContainer.appendChild(li);//adds the list item to the list container
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    li.classList.add("unchecked");
  }

  inputBox.value = "";//clears the input box after user adds the task
  saveData();
}

// click event listener
listContainer.addEventListener("click", function(e) {
  if(e.target.tagName === "LI") {
    e.target.classList.toggle("checked"); //if li is clicked, the class "checked" will be added to the li so it will be striked through (or whatever I add to the css applies)
    saveData();
  }
  else if(e.target.tagName === "SPAN") { // if the 'x' is clicked, the list item (task) will be deleted
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData(){
  localStorage.setItem("tasksData", listContainer.innerHTML);
}//saves the task list to local storage so they dont disappear when the page is refreshed
function showTasks(){
  listContainer.innerHTML = localStorage.getItem("tasksData");
}//makes the tasks show up when the page is loaded
showTasks();

// pomodoro
var pomodoroClock = {
    // set variables
    started: false,
    minutes: 0,
    seconds: 0,
    sessionLength: 15,
    sessionDOM: null,
    breakLength: 5,
    breakDOM: null,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    runs: 1,

    // initialize variables, set event listeners, start interval counter function
    init: function () {
        var self = this;

        this.minutesDom = document.querySelector("#minutes");
        this.secondsDom = document.querySelector("#seconds");
        this.sessionDOM = document.querySelector("#sessionTime");
        this.breakDOM = document.querySelector("#breakTime");

        document.querySelector("#start").addEventListener("click", function () {
            if (self.started) {
                self.stopCount.apply(self);
            } else {
                self.startCount.apply(self);
            }
        });

        document.querySelector("#reset").addEventListener("click", function () {
            self.resetTimer();
        });

        document.querySelectorAll(".timeAdjust").forEach(function (e) {
            e.addEventListener("click", function () {
                if (this.id === "seshPlus") {
                    self.adjustValue(true); // Increase session length
                } else if (this.id === "seshMinus") {
                    self.adjustValue(false); // Decrease session length
                } else if (this.id === "breakMinus") {
                    self.adjustValue(false, true); // Decrease break length
                } else if (this.id === "breakPlus") {
                    self.adjustValue(true, true); // Increase break length
                }
            });
        });

        this.updateUI(); // Update UI initially
    },

    // functions
    startCount: function () {
        this.started = true;
        this.minutes = this.sessionLength;
        this.interval = setInterval(this.intervalFunction.bind(this), 1000);
        document.querySelector("#start").innerHTML = "Stop";
    },

    stopCount: function () {
        this.started = false;
        clearInterval(this.interval);
        document.querySelector("#start").innerHTML = "Start";
        this.updateUI();
    },

    resetTimer: function () {
        this.stopCount();
        this.minutes = this.sessionLength;
        this.seconds = 0;
        this.runs = 1;
        this.updateUI();
    },

    intervalFunction: function () {
        if (this.seconds == 0) {
            if (this.minutes == 0) {
                this.timerDone();
                return;
            }
            this.seconds = 59;
            this.minutes--;
        } else {
            this.seconds--;
        }
        this.updateUI();
    },

    timerDone: function () {
        this.runs++;
        if (this.runs === 2 || this.runs === 4) {
            this.minutes = this.breakLength;
            document.getElementById("pomodoroSound").play(); // play ping
        } else if (this.runs === 3 || this.runs === 5) {
            this.minutes = this.sessionLength;
            document.getElementById("pomodoroSound").play(); // play ping
        } else {
            this.stopCount();
        }
        this.seconds = 0;
        this.updateUI();
    },

    updateUI: function () {
        this.minutesDom.innerHTML = this.numberFormat(this.minutes);
        this.secondsDom.innerHTML = this.numberFormat(this.seconds);
        this.sessionDOM.innerHTML = this.sessionLength + " min";
        this.breakDOM.innerHTML = this.breakLength + " min";
    },

    numberFormat: function (num) {
        return num < 10 ? "0" + num : num;
    },

    adjustValue: function (increment, isBreak) {
        if (isBreak) {
            if (increment) {
                this.breakLength++;
            } else {
                this.breakLength = Math.max(1, this.breakLength - 1); // ensure break length doesn't go below 1 (time can't be negative)
            }
        } else {
            if (increment) {
                this.sessionLength++;
            } else {
                this.sessionLength = Math.max(1, this.sessionLength - 1); // ensure session length doesn't go below 1 (time can't be negative)
            }
        }
        this.updateUI();
    }
};

window.onload = function () {
    pomodoroClock.init();
};


// sound
// set constants
//const player1 = document.getElementById("lofi");
//const player2 = document.getElementById("rainNoise");
//const volumeSlider1 = document.getElementById("volumeSlider1");
//const volumeSlider2 = document.getElementById("volumeSlider2");
//const playPauseButton1 = document.getElementById("play1");
//const playPauseButton2 = document.getElementById("play2");

//playPauseButton1.addEventListener("click", ()=>{
 // if (player1.paused) { // check if the player is paused
 //   player1.play(); // Play the audio
//    playPauseButton1.textContent = "Pause"; // Update button text to "Pause"
//  } else {
//    player1.pause(); // Pause the audio
//    playPauseButton1.textContent = "Play"; // Update button text to "Play"
//  }
//});

document.addEventListener("DOMContentLoaded", function () {
    console.log(document.getElementById("pomodoroSound").src);
});

//volumeSlider1.addEventListener("input", () => {
//  player1.volume = volumeSlider1.value;
//});

//playPauseButton2.addEventListener("click", ()=>{
//  if (player2.paused) { // check if the player is paused
 //   player2.play(); // Play the audio
//    playPauseButton2.textContent = "Pause"; // Update button text to "Pause"
 // } else {
  //  player2.pause(); // Pause the audio
  //  playPauseButton2.textContent = "Play"; // Update button text to "Play"
 // }
//});

//volumeSlider2.addEventListener("input", () => {
 // player2.volume = volumeSlider2.value;
//});

//study mode mobile
// set constants
const settings = document.getElementById("settings");
const backToSettings = document.getElementById("back-to-settings");
const mobileSettings = document.getElementById('mobile-settings');
const tasksNavButton = document.getElementById('tasks-nav-button');
const audioNavButton = document.getElementById('audio-nav-button');
const back = document.getElementById('back');

const pomodoro = document.getElementById("pomodoro");
const tasks = document.getElementById("tasks");
const audio = document.getElementById("sound");

settings.onclick = () => {
    mobileSettings.style.display = mobileSettings.style.display === 'block' ? 'none' : 'block';
    pomodoro.style.display = pomodoro.style.display === 'none' ? 'grid' : 'none';
    settings.style.display = 'none';
};

backToSettings.onclick = () => {
    mobileSettings.style.display = mobileSettings.style.display === 'block' ? 'none' : 'block';
    backToSettings.style.display = 'none';
    if (tasks.style.display == 'block')
    {
       tasks.style.display = 'none';
    } else {
       if (audio.style.display == 'block')
         {
            audio.style.display = 'none';
         } else {

         }
    }
}

back.onclick = () => {
    pomodoro.style.display = 'grid' ;
    tasks.style.display = 'none';
    audio.style.display = 'none';
    mobileSettings.style.display = 'none';
    settings.style.display = 'block';
}

tasksNavButton.onclick = () => {
    mobileSettings.style.display = 'none';
    tasks.style.display = 'block';
    backToSettings.style.display = 'block';
};

audioNavButton.onclick = () => {
    mobileSettings.style.display = 'none';
    audio.style.display = 'block';
    backToSettings.style.display = 'block';
};

