// Create stars background
function createStars() {
  const starsContainer = document.getElementById('stars');
  const starCount = 150;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.classList.add('star');

    const size = Math.random() * 2 + 1;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const duration = Math.random() * 5 + 3;

    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${left}%`;
    star.style.top = `${top}%`;
    star.style.setProperty('--duration', `${duration}s`);

    starsContainer.appendChild(star);
  }
}

// Create hour markers
function createHourMarkers() {
  const markersContainer = document.getElementById('hourMarkers');

  for (let i = 0; i < 60; i++) {
    const marker = document.createElement('div');
    marker.classList.add('hour-marker');
    if (i % 5 === 0) {
      marker.classList.add('main');
    }
    marker.style.transform = `rotate(${i * 6}deg)`;
    markersContainer.appendChild(marker);
  }
}

// Update clock
function updateClock() {
  const now = new Date();

  // Update digital display
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('dateDisplay').textContent = now.toLocaleDateString('en-US', dateOptions);
  document.getElementById('timeDisplay').textContent = now.toLocaleTimeString('en-US');

  // Analog hands
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  document.getElementById('secondHand').style.transform = `translateX(-50%) rotate(${secondDeg}deg)`;
  document.getElementById('minuteHand').style.transform = `translateX(-50%) rotate(${minuteDeg}deg)`;
  document.getElementById('hourHand').style.transform = `translateX(-50%) rotate(${hourDeg}deg)`;

  updateWorldTimes();
}

// World time zones
function updateWorldTimes() {
  const timeZones = [
    { city: "NEW YORK", timezone: "America/New_York" },
    { city: "LONDON", timezone: "Europe/London" },
    { city: "TOKYO", timezone: "Asia/Tokyo" },
    { city: "SYDNEY", timezone: "Australia/Sydney" },
    { city: "DUBAI", timezone: "Asia/Dubai" }
  ];

  const container = document.getElementById('timeZones');
  container.innerHTML = '';

  timeZones.forEach(zone => {
    const time = new Date().toLocaleTimeString('en-US', {
      timeZone: zone.timezone,
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });

    const timeZoneEl = document.createElement('div');
    timeZoneEl.classList.add('time-zone');
    timeZoneEl.innerHTML = `
      <h3>${zone.city}</h3>
      <div class="time">${time}</div>
    `;

    container.appendChild(timeZoneEl);
  });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
  createStars();
  createHourMarkers();
  updateClock();
  setInterval(updateClock, 1000);
});
