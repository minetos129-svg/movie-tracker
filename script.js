const timezoneSelect = document.getElementById('timezoneSelect');
const digitalTime = document.getElementById('digitalTime');
const dateValue = document.getElementById('dateValue');
const liveStatus = document.getElementById('liveStatus');
const speedLabel = document.getElementById('speedLabel');
const toggleClockButton = document.getElementById('toggleClock');
const resetClockButton = document.getElementById('resetClock');
const customTimeInput = document.getElementById('customTimeInput');
const applyTimeButton = document.getElementById('applyTime');

const hourHand = document.getElementById('hourHand');
const minuteHand = document.getElementById('minuteHand');
const secondHand = document.getElementById('secondHand');

const state = {
  fakeNow: Date.now(),
  running: true,
  speed: 1,
  lastFrame: performance.now(),
  timezone: 'local',
};

function getDateTimeParts(date, timeZone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const formatted = formatter.formatToParts(date);
  const values = {};

  formatted.forEach((part) => {
    if (part.type !== 'literal') {
      values[part.type] = part.value;
    }
  });

  return {
    hour: Number(values.hour || 0),
    minute: Number(values.minute || 0),
    second: Number(values.second || 0),
    weekday: values.weekday,
    day: Number(values.day || 1),
    month: values.month,
    year: Number(values.year || 2000),
  };
}

function getTimeZoneValue() {
  return timezoneSelect.value === 'local'
    ? Intl.DateTimeFormat().resolvedOptions().timeZone
    : timezoneSelect.value;
}

function formatTimeForDisplay(date, timezone) {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: timezone,
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  return formatter.format(date);
}

function setCustomTimeFromInput(dateValueObject) {
  const [hours, minutes] = customTimeInput.value
    .split(':')
    .map((item) => Number(item));

  if (Number.isNaN(hours) || Number.isNaN(minutes)) return;

  const timezone = getTimeZoneValue();
  const currentDate = new Date(state.fakeNow);
  const parts = getDateTimeParts(currentDate, timezone);

  const newDate = new Date(Date.UTC(
    parts.year,
    new Date(`${parts.month} ${parts.day}, ${parts.year}`).getUTCMonth(),
    parts.day,
    hours,
    minutes,
    0,
    0
  ));

  const now = new Date();
  const baseTime = now.getTime() - state.fakeNow;
  state.fakeNow = newDate.getTime() - baseTime;
}

function updateClockView() {
  const timezone = getTimeZoneValue();
  const date = new Date(state.fakeNow);
  const parts = getDateTimeParts(date, timezone);

  const digitalString = [parts.hour, parts.minute, parts.second]
    .map((v) => String(v).padStart(2, '0'))
    .join(':');

  digitalTime.textContent = digitalString;
  dateValue.textContent = `${parts.weekday}, ${parts.month} ${parts.day}`;

  const hourAngle = ((parts.hour % 12) + parts.minute / 60 + parts.second / 3600) * 30 - 90;
  const minuteAngle = (parts.minute + parts.second / 60) * 6 - 90;
  const secondAngle = (parts.second * 6) - 90;

  hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
  minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
  secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;

  liveStatus.textContent = state.running ? 'Running' : 'Paused';
  liveStatus.style.background = state.running
    ? 'rgba(34, 197, 94, 0.14)'
    : 'rgba(249, 115, 22, 0.12)';
  liveStatus.style.color = state.running ? '#bcfbd0' : '#fed7aa';

  speedLabel.textContent = `${state.speed}x`;
  speedLabel.style.background = 'rgba(56, 189, 248, 0.12)';
  speedLabel.style.color = '#d9f3ff';

  const formattedTime = formatTimeForDisplay(date, timezone);
  const [h, m] = formattedTime.split(':');
  customTimeInput.value = `${h}:${m}`;
}

function animate(now) {
  const elapsed = now - state.lastFrame;
  state.lastFrame = now;

  if (state.running) {
    state.fakeNow += elapsed * state.speed;
  }

  updateClockView();
  requestAnimationFrame(animate);
}

function toggleClock() {
  state.running = !state.running;
  toggleClockButton.textContent = state.running ? 'Pause' : 'Resume';
}

function resetClock() {
  state.fakeNow = Date.now();
  state.running = true;
  state.speed = 1;
  toggleClockButton.textContent = 'Pause';
}

function changeSpeed(newSpeed) {
  state.speed = newSpeed;
}

function adjustMinutes(deltaMinutes) {
  state.fakeNow += deltaMinutes * 60 * 1000;
}

function adjustHours(deltaHours) {
  state.fakeNow += deltaHours * 60 * 60 * 1000;
}

timezoneSelect.addEventListener('change', () => {
  state.timezone = timezoneSelect.value;
  updateClockView();
});

toggleClockButton.addEventListener('click', toggleClock);
resetClockButton.addEventListener('click', resetClock);

applyTimeButton.addEventListener('click', () => {
  setCustomTimeFromInput();
});

document.getElementById('slowSpeed').addEventListener('click', () => changeSpeed(0.5));
document.getElementById('normalSpeed').addEventListener('click', () => changeSpeed(1));
document.getElementById('fastSpeed').addEventListener('click', () => changeSpeed(6));

document.getElementById('plusMinute').addEventListener('click', () => adjustMinutes(30));
document.getElementById('minusMinute').addEventListener('click', () => adjustMinutes(-30));
document.getElementById('plusHour').addEventListener('click', () => adjustHours(1));
document.getElementById('minusHour').addEventListener('click', () => adjustHours(-1));

resetClock();
requestAnimationFrame(animate);







































































































































































































































































