import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix';

const inputData = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() > Date.now()) {
      btnStart.removeAttribute('disabled');
      Notify.success(`It's a valid date))`);
    } else {
      Notify.failure('Please choose a date in the future');
    }
  },
};
flatpickr('#datetime-picker', options);

btnStart.addEventListener('click', startTimer);

let interval = null;
function startTimer() {
  btnStart.setAttribute('disabled', true);

  interval = setInterval(() => {
    const inputTime = new Date(inputData.value);
    let intervalCount = convertMs(inputTime - Date.now());
    console.log(intervalCount);
    if (inputTime < Date.now()) {
      clearInterval(interval);
      return;
    }
    inition(intervalCount);
  }, 1000);
}
function inition(time = { days: 0, hours: 0, minutes: 0, seconds: 0 }) {
  seconds.textContent = `${time.seconds}`.padStart(2, 0);
  minutes.textContent = `${time.minutes}`.padStart(2, 0);
  hours.textContent = `${time.hours}`.padStart(2, 0);
  days.textContent = `${time.days}`.padStart(2, 0);
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
