(function () {
    // auto inject Styles ---
    const style = document.createElement('style');
    style.innerHTML = `
        .v-counter-wrap { display: flex; gap: 4px; margin: 8px 0; align-items: center; justify-content: center; }
        .v-digit-box { 
            background-color: #212529; color: #ffffff; border: 1px solid #6c757d; 
            border-radius: 4px; padding: 4px 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); 
            display: inline-block; min-width: 20px; text-align: center;
        }
        .v-digit-text { font-weight: bold; font-family: monospace; line-height: 1; font-size: 1.2rem; }
    `;
    document.head.appendChild(style);

    // configs
    const API_URL = 'https://saasmy-755529173.development.catalystserverless.com/server/wbt-advanced_io/ping-visitor';
    const containerId = 'visitor-counter-container';

    async function initCounter() {
        const container = document.getElementById(containerId);
        if (!container) return;

        try {
            // 'credentials: include' is CRITICAL to send/receive the 24h cookie/token
            const response = await fetch(`${API_URL}?domain=${window.location.hostname}`, {
                credentials: 'include'
            });
            const data = await response.json();
            render(data.count);
        } catch (err) {
            console.error("Counter Error:", err);
        }
    }

    function render(count) {
        const container = document.getElementById(containerId);
        const digits = count.toString().padStart(8, '0').split('');

        let html = '<div class="v-counter-wrap">';
        digits.forEach(digit => {
            html += `<div class="v-digit-box"><span class="v-digit-text">${digit}</span></div>`;
        });
        html += '</div>';

        container.innerHTML = html;
    }

    // run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounter);
    } else {
        initCounter();
    }
})();