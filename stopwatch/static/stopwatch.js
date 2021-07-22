let stopwatch = {
  stopwatchHTML: document.getElementById('stopwatch'),
  stoptime: true,
  textColor: '',

  // 타이머를 멈춘후 바로 타이머가 실핼되지 않게 하기 위한 변수
  canTimerStart: true,

  timer: {
    tenMs: 0,
    hundredMs: 0,
    sec: 0,
    min: 0,

    startTimer: function () {
      if (stopwatch.stoptime == true) {
        stopwatch.stoptime = false;
        stopwatch.timer.timerCycle();
      }

      //color
      stopwatch.textColor = "white";

    },

    stopTimer: function () {
      if (stopwatch.stoptime == false) {
        stopwatch.stoptime = true;

        //타이머가 멈춘후 바로 다시 실행 되지 않기 위해 canTimerStart변수를 false로 지정
        stopwatch.canTimerStart = false;

        //color
        stopwatch.textColor = "red";

        stopwatch.stopwatchHTML.innerHTML = stopwatch.timer.sec + '.' + stopwatch.timer.hundredMs + stopwatch.timer.tenMs;
      }
    },

    timerCycle: function () {
      if (stopwatch.stoptime == false) {
        stopwatch.timer.tenMs = parseInt(stopwatch.timer.tenMs);
        stopwatch.timer.hundredMs = parseInt(stopwatch.timer.hundredMs);
        stopwatch.timer.sec = parseInt(stopwatch.timer.sec);
        stopwatch.timer.min = parseInt(stopwatch.timer.min);

        stopwatch.timer.tenMs++;

        if (stopwatch.timer.tenMs == 10) {
          stopwatch.timer.hundredMs++;
          stopwatch.timer.tenMs = 0;
        }
        if (stopwatch.timer.hundredMs == 10) {
          stopwatch.timer.sec++;
          stopwatch.timer.hundredMs = 0;
          stopwatch.timer.tenMs = 0;
        }
        if (stopwatch.timer.sec == 60) {
          stopwatch.timer.min++;
          stopwatch.timer.sec = 0;
          stopwatch.timer.hundredMs = 0;
          stopwatch.timer.tenMs = 0;
        }

        if (stopwatch.timer.min) {
          stopwatch.stopwatchHTML.innerHTML = stopwatch.timer.min + ':' + stopwatch.timer.sec + '.' + stopwatch.timer.hundredMs;
        } else {
          stopwatch.stopwatchHTML.innerHTML = stopwatch.timer.sec + '.' + stopwatch.timer.hundredMs;
        }

        setTimeout("stopwatch.timer.timerCycle()", 10);
      }
    },

    resetTimer: function () {
      stopwatch.stopwatchHTML.innerHTML = "0.0";
      stopwatch.stoptime = true;
      stopwatch.timer.tenMs = 0;
      stopwatch.timer.hundredMs = 0;
      stopwatch.timer.sec = 0;
      stopwatch.timer.min = 0;

      //color
      stopwatch.textColor = "green";
    }
  },

  keyevent: {
    keyboardevent: function (event) {
      //타이머가 멈춘후 스페이스바를 누르면 타이머 리셋
      let keyup = event.type === 'keyup';
      let keydown = event.type === 'keydown';
    
      let keySpace = event.key === ' ';
    
      if (keydown && keySpace) {
        stopwatch.keyevent.keydownSpace()
      } else if (keyup && keySpace) {
        stopwatch.keyevent.keyupSpace()
      }
    
      stopwatch.color()
    },

    keydownSpace: function () {
      if (stopwatch.stoptime === true && stopwatch.canTimerStart === true) {
        stopwatch.timer.resetTimer()
      }
      //타이머 실행되고 있을 때 스페이스바를 누르면 타이머 스탑
      else if (stopwatch.stoptime == false) {
        stopwatch.timer.stopTimer()
      }
    },
    
    keyupSpace: function () {
      if (stopwatch.canTimerStart === false) {
        stopwatch.canTimerStart = true
        //color
        stopwatch.textColor = "white";
      } else if (stopwatch.stoptime === true && stopwatch.canTimerStart === true) {
        stopwatch.timer.startTimer()
      }
    },
  },

  color: function () {
    if (stopwatch.textColor === 'white') {
      stopwatch.stopwatchHTML.style.color = "white";
    } else if (stopwatch.textColor === 'red') {
      stopwatch.stopwatchHTML.style.color = "red";
    } else if (stopwatch.textColor === 'green') {
      stopwatch.stopwatchHTML.style.color = "green";
    }
  }
}

document.addEventListener('keydown', stopwatch.keyevent.keyboardevent);
document.addEventListener('keyup', stopwatch.keyevent.keyboardevent);