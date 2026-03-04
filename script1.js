 const API_KEY = '02d66a22abef2536b3ce8d7a6a3ea548'; 

// Custom console log (UI + browser console)
function log(message, type = 'sync') {
    const consoleDiv = document.getElementById('console');
    const time = new Date().toLocaleTimeString();
    const className = 'log-' + type;
    consoleDiv.innerHTML += `<div>[${time}] <span class="${className}">${message}</span></div>`;
    consoleDiv.scrollTop = consoleDiv.scrollHeight;
    console.log(`[${time}] ${message}`);
}

 // Load history from localStorage
function loadHistory() {
    log('1. loadHistory() - sync code runs first', 'sync');
    const history = JSON.parse(localStorage.getItem('cityHistory') || '[]');
    showHistory(history);
}

// Show history in UI
function showHistory(history) {
    log('2. showHistory() - sync UI update', 'sync');
    const list = document.getElementById('historyList');
    list.innerHTML = '';
    history.slice(-5).forEach(city => {
        const div = document.createElement('div');
        div.className = 'history-item';
        div.innerHTML = `
            <span>${city}</span>
            <button class="delete-btn">×</button>
        `;
        div.addEventListener('click', (e) => {
            // If click is not on delete button, trigger search
            if (!(e.target.classList.contains('delete-btn'))) {
                searchWeather(city);
            }
        });
        div.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            deleteCity(city);
        });
        list.appendChild(div);
    });
}

// Delete city from history
function deleteCity(city) {
    let history = JSON.parse(localStorage.getItem('cityHistory') || '[]');
    history = history.filter(c => c !== city);
    localStorage.setItem('cityHistory', JSON.stringify(history));
    showHistory(history);
    log(`Deleted ${city} from history`, 'sync');
}

// Promise-style wrapper around fetch (to demonstrate .then/.catch)
function fetchWeatherPromise(city) {
    log('4. fetchWeatherPromise() - promise executor start', 'promise');
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    return fetch(url)
        .then(response => {
            log('5. fetch() resolved (then) - checking status', 'async');
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        });
}

// Main async weather function (async/await)
async function searchWeather(city) {
    log(`3. searchWeather('${city}') - sync function start`, 'sync');

    const weatherContent = document.getElementById('weatherContent');
    const errorDiv = document.getElementById('errorMsg');

    // Clear previous UI
    errorDiv.style.display = 'none';
    weatherContent.innerHTML = '<div>Loading...</div>';

    try {
        log('4a. Before fetchWeatherPromise() - sync code', 'sync');
        log('4b. fetchWeatherPromise() called - promise created', 'promise');

        const data = await fetchWeatherPromise(city);

        log('6. Await finished - data available (microtask)', 'async');

        showWeather(data);
        saveHistory(city);
    } catch (err) {
        log(`7. Error caught in try...catch -> ${err.message}`, 'error');
        showError('City Not Found');
    } finally {
        log('8. finally block after async work', 'sync');
    }
}
// Show weather data
function showWeather(data) {
    log('9. showWeather() - sync after async', 'sync');
    const errorDiv = document.getElementById('errorMsg');
    const weatherContent = document.getElementById('weatherContent');

    errorDiv.style.display = 'none';

    weatherContent.innerHTML = `
        <div class="weather-item">
            <span class="label">City:</span>
            <span class="value">${data.name}, ${data.sys.country}</span>
        </div>
        <div class="weather-item">
            <span class="label">Temperature:</span>
            <span class="value">${Math.round(data.main.temp)}°C</span>
        </div>
        <div class="weather-item">
            <span class="label">Weather:</span>
            <span class="value">${data.weather[0].main}</span>
        </div>
        <div class="weather-item">
            <span class="label">Humidity:</span>
            <span class="value">${data.main.humidity}%</span>
        </div>
        <div class="weather-item">
            <span class="label">Wind:</span>
            <span class="value">${data.wind.speed} m/s</span>
        </div>
    `;
}
 // Show error (City Not Found in red)
function showError(msg) {
    const errorDiv = document.getElementById('errorMsg');
    if (!errorDiv) {
        log('errorMsg element missing', 'error');
        return;
    }
const weatherContent = document.getElementById('weatherContent');
    if (weatherContent) weatherContent.innerHTML = '';
    errorDiv.textContent = msg;
    errorDiv.style.display = 'block';
    log('10. Error displayed in Weather Info panel', 'error');
}
// Save to history
function saveHistory(city) {
    let history = JSON.parse(localStorage.getItem('cityHistory') || '[]');
    history = history.filter(c => c.toLowerCase() !== city.toLowerCase());
    history.push(city);
    if (history.length > 10) history = history.slice(-10);
    localStorage.setItem('cityHistory', JSON.stringify(history));
    showHistory(history);
    log(`Saved "${city}" to history`, 'sync');
}

 // Page load
document.addEventListener('DOMContentLoaded', () =>  {         
    log('0. Page loaded - DOM ready (global sync code)', 'sync');

    loadHistory();

    const searchBtn = document.getElementById('searchBtn');
    const cityInput = document.getElementById('cityInput');

    searchBtn.onclick = () => {
        const city = cityInput.value.trim();
        if (!city) {
            showError('City Not Found');
            log('Empty input - showing error immediately', 'error');
            return;
        }
        cityInput.value = '';
        searchWeather(city);
    };

    cityInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            searchBtn.click();
        }
    });

    // Extra log to visualize event loop timing
    setTimeout(() => {
        log('setTimeout callback (task queue) after initial render', 'async');
    }, 0);

    Promise.resolve().then(() => {
        log('Promise microtask after DOMContentLoaded', 'promise');
    });
});