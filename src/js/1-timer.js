
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const startBtn = document.querySelector('button[data-start]');


startBtn.disabled = true;

let userSelectedDates = null;


const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] < Date.now()) {
            window.alert('Please choose a date in the future')
            return;
     }
        userSelectedDates = selectedDates[0];
                startBtn.disabled = false;
        console.log('Вибрана дата: ', selectedDates[0]);

  },
};

flatpickr('#datetime-picker', options);


function pad(value) {
  return String(value).padStart(2, '0');
}

function ms2str(time) {
  const days = pad(Math.floor(time / (1000 * 60 * 60 * 24)));
  const hours = pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
  const mins = pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
  const secs = pad(Math.floor((time % (1000 * 60)) / 1000));

  return {
    days,
    hours,
    minutes: mins,
    seconds: secs,
  };
}

let intervalId;
startBtn.addEventListener('click', () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    const currentTime = Date.now();
    const diff = userSelectedDates - currentTime;

    if (diff < 1000) {
      clearInterval(intervalId);
      updateTimerUI(ms2str(0));
      return;
    }

    const timeData = ms2str(diff);
    updateTimerUI(timeData);
  }, 1000);
});

function updateTimerUI({ days, hours, minutes, seconds }) {
  document.querySelector('[data-days]').textContent = days;
  document.querySelector('[data-hours]').textContent = hours;
  document.querySelector('[data-minutes]').textContent = minutes;
  document.querySelector('[data-seconds]').textContent = seconds;
}


