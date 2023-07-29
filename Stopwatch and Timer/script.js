const updateTime = () => {
  const time = new Date();
  let hours = time.getHours();
  let minutes = time.getMinutes();
  let seconds = time.getSeconds();
  let ampm = hours >= 12 ? "PM" : "AM";
  let otherampm = hours >= 12 ? "AM" : "PM";

  hours = hours % 12 || 12;
  hours = addTrailingZero(hours);
  minutes = addTrailingZero(minutes);
  seconds = addTrailingZero(seconds);

  $("#hour").html(hours);
  $("#min").html(minutes);
  $("#sec").html(seconds);
  $("#ampm").html(ampm);
  $("#other-ampm").html(otherampm);
};

updateTime();
setInterval(updateTime, 1000);

$("#stopwatch-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".stopwatch").slideDown();
  $(".type").html("Stopwatch");
});

$("#timer-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".timer").slideDown();
  $(".type").html("Timer");
});

$(".back-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
});

$(".calender-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".calender").slideDown();
  $(".type").html("calender");
});



let stopwatchHours = 0,
  stopwatchMinutes = 0,
  stopwatchSeconds = 0,
  stopwatchMiliSeconds = 0,
  stopwatchRunning = false,
  laps = 0,
  stopwatchInterval;

function stopwatch() {
  stopwatchMiliSeconds++;
  if (stopwatchMiliSeconds === 100) {
    stopwatchMiliSeconds = 0;
    stopwatchSeconds++;
  }
  if (stopwatchSeconds === 60) {
    stopwatchSeconds = 0;
    stopwatchMinutes++;
  }
  if (stopwatchMinutes === 60) {
    stopwatchMinutes = 0;
    stopwatchHours++;
  }

  $("#stopwatch-hour").html(addTrailingZero(stopwatchHours));
  $("#stopwatch-min").html(addTrailingZero(stopwatchMinutes));
  $("#stopwatch-sec").html(addTrailingZero(stopwatchSeconds));
  $("#stopwatch-ms").html(addTrailingZero(stopwatchMiliSeconds));
}

function startStopwatch() {
  if (!stopwatchRunning) {
    stopwatchInterval = setInterval(stopwatch, 10);
    stopwatchRunning = true;
  }
}

function stopStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchRunning = false;
  stopwatchHours = 0;
  stopwatchMinutes = 0;
  stopwatchSeconds = 0;
  stopwatchMiliSeconds = 0;
  laps = 0;
  $("#stopwatch-hour").html("00");
  $("#stopwatch-min").html("00");
  $("#stopwatch-sec").html("00");
  $("#stopwatch-ms").html("00");
}

$(".start-stopwatch").click(function () {
  startStopwatch();
  $(".start-stopwatch").hide();
  $(".lap-stopwatch").show();
});

$(".lap-stopwatch").click(function () {
  laps++;
  $(".lap").removeClass("active");
  $(".laps").prepend(
    ` <div class="lap active">
      <p>Lap ${laps}</p>
      <p>
        ${addTrailingZero(stopwatchHours)} : ${addTrailingZero(
      stopwatchMinutes
    )} : ${addTrailingZero(stopwatchSeconds)} : ${addTrailingZero(
      stopwatchMiliSeconds
    )}
      </p>
    </div>
   `
  );
});

$(".reset-stopwatch").click(function () {
  resetStopwatch();
  $(".start-stopwatch").show();
  $(".lap-stopwatch").hide();
  $(".laps").html("");
});

function addTrailingZero(number) {
  return number < 10 ? "0" + number : number;
}

let time = 0,
  timerHours = 0,
  timerMinutes = 0,
  timerSeconds = 0,
  timerMiliseconds = 0,
  timerRunning = false,
  timerInterval;

// ... (existing JavaScript content remains the same) ...

// Function to show the time input modal
function showTimeModal() {
  const modal = document.getElementById('timeModal');
  modal.style.display = 'block';
}

// Function to hide the time input modal
function hideTimeModal() {
  const modal = document.getElementById('timeModal');
  modal.style.display = 'none';
}

// Event listener for the timer button
$("#timer-btn").click(function () {
  // Show the time input modal
  showTimeModal();
});

// Event listener for the submit button in the time input modal
$("#submitTime").click(function () {
  // Get the user input for time in minutes
  const inputTime = document.getElementById('timeInput').value;
  time = inputTime * 60;
  setTime();

  // Hide the time input modal
  hideTimeModal();
});

// ... (existing event listeners remain the same) ...

function setTime() {
  timerHours = Math.floor(time / 3600);
  timerMinutes = Math.floor((time % 3600) / 60);
  timerSeconds = Math.floor(time % 60);
  timerMiliseconds = 0;

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));
}

function timer() {
  timerMiliseconds--;
  if (timerMiliseconds === -1) {
    timerMiliseconds = 99;
    timerSeconds--;
  }
  if (timerSeconds === -1) {
    timerSeconds = 59;
    timerMinutes--;
  }
  if (timerMinutes === -1) {
    timerMinutes = 59;
    timerHours--;
  }

  $("#timer-hour").html(addTrailingZero(timerHours));
  $("#timer-min").html(addTrailingZero(timerMinutes));
  $("#timer-sec").html(addTrailingZero(timerSeconds));
  $("#timer-ms").html(addTrailingZero(timerMiliseconds));

  timeUp();
}

function startTimer() {
  if (timerHours === 0 && timerMinutes === 0 && timerSeconds === 0) {
    getTime();
  } else {
    timerInterval = setInterval(timer, 10);
    timerRunning = true;
    $(".start-timer").hide();
    $(".stop-timer").show();
  }
}

function stopTimer() {
  clearInterval(timerInterval);
  timerRunning = false;
  $(".start-timer").show();
  $(".stop-timer").hide();
}

function resetTimer() {
  stopTimer();
  time = 0;
  setTime();
}

function timeUp() {
  if (
    timerHours === 0 &&
    timerMinutes === 0 &&
    timerSeconds === 0 &&
    timerMiliseconds === 0
  ) {
    stopTimer();
    alert("Time's up!");

    setTime();
  }
}

$(".start-timer").click(startTimer);

$(".stop-timer").click(stopTimer);

$(".reset-timer").click(function () {
  resetTimer();
  if (!timerRunning) {
    $(".start-timer").show();
    $(".stop-timer").hide();
  }
});



$("#calendar-btn").click(function () {
  $(".main-container > div").slideUp();
  $(".clock").slideDown();
  $(".type").html("Clock");
  $(".calendar").slideDown();
});

// Additional function to display the date, month, and year
function updateCalendar() {
  const currentDate = new Date();
  const day = currentDate.toLocaleString('en-us', { weekday: 'long' });
  const month = currentDate.toLocaleString('en-us', { month: 'long' });
  const date = currentDate.getDate();
  const year = currentDate.getFullYear();

  $("#day").html(day);
  $("#month").html(month);
  $("#date").html(date);
  $("#year").html(year);
}

// Call the function to display the date, month, and year on page load
updateCalendar();

//here goes------------------------------------------------------

