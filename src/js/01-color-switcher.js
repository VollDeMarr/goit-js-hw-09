const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let interval = null;
let upperInterval = null;

btnStart.addEventListener('click', () => {
  btnStart.setAttribute('disabled', true);
  interval = setInterval(() => {
    body.style.backgroundImage = `linear-gradient(to right,
        ${getRandomHexColor()},
        ${getRandomHexColor()}`;
  }, 1000);
});

btnStop.addEventListener('click', () => {
  clearInterval(interval);
  btnStart.removeAttribute('disabled');
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
