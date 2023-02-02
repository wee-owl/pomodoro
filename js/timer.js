import { alarm } from "./alarm.js";
import { changeActiveBtn } from "./control.js";
import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const addZero = (n) => n < 10 ? '0' + n : n;

export const showTime = (seconds) => {
  minutesElem.textContent = addZero(Math.floor(seconds / 60));
  secondsElem.textContent = addZero(seconds % 60);
}

export const startTimer = () => {
  state.timeLeft -= 10;

  showTime(state.timeLeft);

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft <= 0) {

    if (state.status === 'work') {
      state.activeToDo.pomodoro += 1;

      if (state.activeToDo.pomodoro % state.count !== 0) {
        state.status = 'break';
      } else {
        state.status = 'relax';
      }

    } else {
      state.status = 'work';
    }

    alarm();
    state.timeLeft = state[state.status] * 60;
    changeActiveBtn(state.status);
    startTimer();
  }
}