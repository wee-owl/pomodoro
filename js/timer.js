import { alarm } from "./alarm.js";
import { state } from "./state.js";

const minutesElem = document.querySelector('.time__minutes');
const secondsElem = document.querySelector('.time__seconds');

const showTime = (seconds) => {
  minutesElem.textContent = String(Math.floor(seconds / 60)).length > 1 ? Math.floor(seconds / 60) : '0' + Math.floor(seconds / 60);
  secondsElem.textContent = String(seconds % 60).length > 1 ? seconds % 60 : '0' + seconds % 60;
}

export const startTimer = () => {
  state.timeLeft -= 1;

  showTime(state.timeLeft);

  if (state.timeLeft > 0 && state.isActive) {
    state.timerId = setTimeout(startTimer, 1000);
  }

  if (state.timeLeft <= 0) {
    alarm();
  }
}

