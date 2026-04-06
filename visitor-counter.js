(function () {
    console.log("Visitor Counter Script Loaded"); 

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

    const API_URL = 'https://saasmy-755529173.development.catalystserverless.com/server/wbt-advanced_io/components/ping-visitor';
    const containerId = 'visitor-counter-container';

    async function initCounter() {
        console.log("initCounter called"); 
        const container = document.getElementById(containerId);
        if (!container) {
            console.error("Target container not found!");
            return;
        }

        try {
            const response = await fetch(`${API_URL}`, {
                credentials: 'include'
            });
            const data = await response.json();
            render(data.count);
        } catch (err) {
            console.error("Fetch Error:", err);
            render(0); 
        }
    }

    function render(count) {
        console.log("Rendering count:", count); 
        const container = document.getElementById(containerId);
        const digits = (count || 0).toString().padStart(8, '0').split('');

        let html = '<div class="v-counter-wrap">';
        digits.forEach(digit => {
            html += `<div class="v-digit-box"><span class="v-digit-text">${digit}</span></div>`;
        });
        html += '</div>';

        container.innerHTML = html;
    }

// --- Optimized "Wait for Element" Logic ---
    function startWithRetry() {
        const container = document.getElementById(containerId);
        
        if (container) {
            console.log("Container found! Initializing...");
            initCounter();
        } else {
            // If not found, wait 50ms and try again
            console.log("Container not found yet, retrying...");
            setTimeout(startWithRetry, 50);
        }
    }

    // Start looking for the container immediately
    startWithRetry();
})();
