/**
 * Breakwater Dives - Interactive Booking Calendar
 * Reads availability from availability.json
 */
(function () {
  'use strict';

  const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

  let currentYear, currentMonth;
  let availability = {};
  let selectedDate = null;

  const today = new Date();
  today.setHours(0,0,0,0);
  currentYear = today.getFullYear();
  currentMonth = today.getMonth();

  // Load availability JSON
  async function loadAvailability() {
    try {
      const res = await fetch('availability.json?v=' + Date.now());
      availability = await res.json();
    } catch (e) {
      console.warn('Could not load availability.json, defaulting all dates to available.', e);
      availability = {};
    }
    renderCalendar();
  }

  function getDateKey(y, m, d) {
    return `${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
  }

  function isAvailable(dateKey) {
    // If date is in unavailable_dates array → unavailable
    if (availability.unavailable_dates && availability.unavailable_dates.includes(dateKey)) return false;
    // If available_dates is defined, only those dates are available
    if (availability.available_dates && availability.available_dates.length > 0) {
      return availability.available_dates.includes(dateKey);
    }
    // Default: weekdays available, weekends unavailable (if no explicit lists)
    const d = new Date(dateKey);
    const day = d.getDay();
    return day !== 0; // Sundays unavailable by default
  }

  function renderCalendar() {
    const grid = document.getElementById('calendarGrid');
    const monthLabel = document.getElementById('calendarMonth');
    if (!grid || !monthLabel) return;

    monthLabel.textContent = `${MONTHS[currentMonth]} ${currentYear}`;
    grid.innerHTML = '';

    // Day names
    DAYS.forEach(d => {
      const el = document.createElement('div');
      el.className = 'cal-day-name';
      el.textContent = d;
      grid.appendChild(el);
    });

    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Empty cells
    for (let i = 0; i < firstDay; i++) {
      const el = document.createElement('div');
      el.className = 'cal-day empty';
      grid.appendChild(el);
    }

    // Day cells
    for (let d = 1; d <= daysInMonth; d++) {
      const el = document.createElement('div');
      el.className = 'cal-day';
      el.textContent = d;

      const dateObj = new Date(currentYear, currentMonth, d);
      const dateKey = getDateKey(currentYear, currentMonth, d);

      if (dateObj < today) {
        el.classList.add('past');
      } else if (dateObj.toDateString() === today.toDateString()) {
        el.classList.add('today');
        if (isAvailable(dateKey)) el.classList.add('available');
        else el.classList.add('unavailable');
      } else {
        if (isAvailable(dateKey)) {
          el.classList.add('available');
        } else {
          el.classList.add('unavailable');
        }
      }

      if (selectedDate === dateKey) el.classList.add('selected');

      if (el.classList.contains('available') || el.classList.contains('today')) {
        el.addEventListener('click', () => selectDate(dateKey, el));
      }

      grid.appendChild(el);
    }
  }

  function selectDate(dateKey, el) {
    if (!isAvailable(dateKey)) return;
    selectedDate = dateKey;
    // Update preferred date input
    const dateInput = document.getElementById('preferredDate');
    if (dateInput) dateInput.value = dateKey;
    renderCalendar();
  }

  // Navigation
  document.addEventListener('DOMContentLoaded', () => {
    const prevBtn = document.getElementById('calPrev');
    const nextBtn = document.getElementById('calNext');

    if (prevBtn) prevBtn.addEventListener('click', () => {
      currentMonth--;
      if (currentMonth < 0) { currentMonth = 11; currentYear--; }
      renderCalendar();
    });

    if (nextBtn) nextBtn.addEventListener('click', () => {
      currentMonth++;
      if (currentMonth > 11) { currentMonth = 0; currentYear++; }
      renderCalendar();
    });

    loadAvailability();
  });
})();
