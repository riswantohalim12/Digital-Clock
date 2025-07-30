document.addEventListener('DOMContentLoaded', () => {
    // === ELEMEN DOM ===
    const bodyEl = document.body;
    const dateEl = document.getElementById('date-display');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const wordClockDisplay = document.getElementById('word-clock-display');

    const digitalClock = document.getElementById('digital-clock');
    const wordClock = document.getElementById('word-clock');

    const settingsToggle = document.getElementById('settings-toggle');
    const settingsPanel = document.getElementById('settings-panel');
    const themeSelector = document.getElementById('theme-selector');
    const digitalModeBtn = document.getElementById('digital-mode-btn');
    const wordModeBtn = document.getElementById('word-mode-btn');

    let currentMode = 'digital';

    // === LOGIKA JAM KATA ===
    const words = [
        "JAM", "LIMA", "SEPULUH", "SEPER", "DUA",
        "DUA PULUH", "TIGA", "EMPAT", "ENAM", "TUJUH",
        "DELAPAN", "SEMBILAN", "SEBELAS", "DUA BELAS", "SATU",
        "LEBIH", "KURANG", "SETENGAH", "PAGI", "SIANG",
        "SORE", "MALAM", "TEPAT", "MENIT"
    ];
    const wordMap = {};

    function setupWordClock() {
        words.forEach(word => {
            const span = document.createElement('span');
            span.textContent = word;
            span.id = `word-${word.replace(' ', '-')}`;
            wordClockDisplay.appendChild(span);
            wordMap[word] = span;
        });
    }

    function updateWordClock() {
        // Reset semua kata
        Object.values(wordMap).forEach(span => span.classList.remove('lit'));

        const now = new Date();
        const h = now.getHours();
        const m = now.getMinutes();

        wordMap["JAM"].classList.add('lit');
        
        const hourNames = ["DUA BELAS", "SATU", "DUA", "TIGA", "EMPAT", "LIMA", "ENAM", "TUJUH", "DELAPAN", "SEMBILAN", "SEPULUH", "SEBELAS"];
        let displayHour = h % 12;

        if (m > 35) { // Logika "kurang"
            displayHour = (displayHour + 1) % 12;
            wordMap["KURANG"].classList.add('lit');
            if (60 - m === 15) wordMap["SEPER"].classList.add('lit');
            else if (60-m === 10) wordMap["SEPULUH"].classList.add('lit');
            else if (60-m === 5) wordMap["LIMA"].classList.add('lit');
            wordMap["MENIT"].classList.add('lit');
        } else {
             if (m > 0 && m < 35) wordMap["LEBIH"].classList.add('lit');
             if (m === 30) wordMap["SETENGAH"].classList.add('lit');
             else if (m === 15) wordMap["SEPER"].classList.add('lit');
             else if (m === 10) wordMap["SEPULUH"].classList.add('lit');
             else if (m === 5) wordMap["LIMA"].classList.add('lit');
             else if (m === 20) wordMap["DUA PULUH"].classList.add('lit');
             if(m !== 0 && m !== 15 && m !== 30) wordMap["MENIT"]?.classList.add('lit');
        }
        
        if (h >= 5 && h < 11) wordMap["PAGI"].classList.add('lit');
        else if (h >= 11 && h < 15) wordMap["SIANG"].classList.add('lit');
        else if (h >= 15 && h < 19) wordMap["SORE"].classList.add('lit');
        else wordMap["MALAM"].classList.add('lit');

        if (m === 0) {
            wordMap["TEPAT"].classList.add('lit');
        }

        wordMap[hourNames[displayHour]].classList.add('lit');
    }

    // === LOGIKA JAM DIGITAL ===
    function updateDigitalClock() {
        const now = new Date();
        hoursEl.textContent = String(now.getHours()).padStart(2, '0');
        minutesEl.textContent = String(now.getMinutes()).padStart(2, '0');
        secondsEl.textContent = String(now.getSeconds()).padStart(2, '0');
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = now.toLocaleDateString('id-ID', options);
    }
    
    // === FUNGSI UTAMA & PENGATURAN ===
    function masterUpdate() {
        if (currentMode === 'digital') {
            updateDigitalClock();
        } else {
            updateWordClock();
        }
    }

    // Event Listeners untuk Pengaturan
    settingsToggle.addEventListener('click', () => settingsPanel.classList.toggle('open'));
    
    themeSelector.addEventListener('click', (e) => {
        if (e.target.classList.contains('theme-swatch')) {
            bodyEl.className = `theme-${e.target.dataset.theme}`;
        }
    });

    digitalModeBtn.addEventListener('click', () => switchMode('digital'));
    wordModeBtn.addEventListener('click', () => switchMode('word'));

    function switchMode(mode) {
        currentMode = mode;
        if (mode === 'digital') {
            digitalClock.classList.add('active');
            wordClock.classList.remove('active');
            digitalModeBtn.classList.add('active');
            wordModeBtn.classList.remove('active');
        } else {
            digitalClock.classList.remove('active');
            wordClock.classList.add('active');
            digitalModeBtn.classList.remove('active');
            wordModeBtn.classList.add('active');
        }
        masterUpdate();
    }
    
    // === INISIALISASI ===
    setupWordClock();
    masterUpdate();
    setInterval(masterUpdate, 1000);
});