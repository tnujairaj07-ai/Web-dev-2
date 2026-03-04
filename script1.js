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