//scramble.js에서 배열 형태로 스크램블을 받아옴. 하지만 타이머를 시작 했을때의 스크램블이 아니라 그 다음 스크램블이 넘어옴. 그래서 
import { scramble as scrambleList } from '/static/scramble.js'
let scramble = "";
let scrambleRecord = [];

//처음 로드 했을 때 스크램블을 저장
setTimeout(() => {
  for (let i of scrambleList) {
    scramble += `${i} `
  }
  scrambleRecord.push(scramble)
  scramble = ""
}, 200)

let stopwatch = {
  stopwatchHTML: document.getElementById('stopwatch'),
  stoptime: true,
  textColor: '',


  // 타이머를 멈춘후 바로 타이머가 실핼되지 않게 하기 위한 변수
  canTimerStart: true,

  //이번 스크램블을 저장하고, 이전 스크램블을(타이머 스탑 하기전에 스크램블) 리턴
  returnScramble: function () {
    for (let i of scrambleList) {
      scramble += `${i} `
    }
    scrambleRecord.push(scramble)
    if (scrambleRecord.length > 3) {
      scrambleRecord.shift()
    }

    if (scrambleRecord.length === 1) {
      return scramble
    } else if (scrambleRecord.length === 2) {
      return scrambleRecord[0]
    } else if (scrambleRecord.length === 3) {
      return scrambleRecord[1]
    }
  },

  timer: {
    tenMs: 0,
    hundredMs: 0,
    sec: 0,
    min: 0,
    solveing_time: '',

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
        stopwatch.timer.solveing_time = stopwatch.timer.sec + '.' + stopwatch.timer.hundredMs + stopwatch.timer.tenMs;
        stopwatch.stopwatchHTML.innerHTML = stopwatch.timer.solveing_time;

        // scramble = $('#scramble').text()
        $('#btn-refresh').click()

        let uploadScramble = stopwatch.returnScramble()
        solveing_save(stopwatch.timer.solveing_time, uploadScramble)
        scramble = "";


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

        setTimeout(() => { stopwatch.timer.timerCycle() }, 10);
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

function post(params, method = 'post') {
  console.log('post함수 호출됨')
  // The rest of this code assumes you are not using a library.
  // It can be made less verbose if you use one.
  const form = document.getElementById('solveing_time_form');
  form.method = method;

  for (const key in params) {
    if (params.hasOwnProperty(key)) {
      const hiddenField = document.getElementById('solveing_time');
      hiddenField.name = 'solveing_time';

      console.log(typeof (params[key]))
      hiddenField.value = params[key];

      console.log(hiddenField.name)

      form.appendChild(hiddenField);

      console.log(stopwatch.canTimerStart)

      // const btn = document.createElement('input');
      // btn.type = 'submit';
      // btn.value = '전송';
      // form.appendChild(btn);
    }
  }

  document.body.appendChild(form);
  // console.log('submit')
  form.submit();
}

function solveing_save(solveing_time, scramble) {
  $.ajax({
    url: 'create_solve/',
    data: {
      solveing_time: solveing_time,
      scramble: scramble,
    },
    dataType: 'json',
    // headers: { "X-CSRFToken": "{{ csrf_token }}" },
    error: function (request, status, error) {
      alert('통신실패 error:' + error)
    }
  })
}