// Custom console log (UI + browser console)
        function log(message, type = 'sync') {
            const consoleDiv = document.getElementById('console');
            const time = new Date().toLocaleTimeString();
            const className = 'log-' + type;
            consoleDiv.innerHTML += `<div>[${time}] <span class="${className}">${message}</span></div>`;
            consoleDiv.scrollTop = consoleDiv.scrollHeight;
            console.log(`[${time}] ${message}`);
        }