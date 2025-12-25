// The user will need to replace this with their own Google Apps Script URL
const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

const form = document.getElementById('health-form');
const statusDiv = document.getElementById('status');

form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    data.timestamp = new Date().toISOString();

    statusDiv.textContent = 'Saving...';

    fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        if (result.result === 'success') {
            statusDiv.textContent = 'Data saved successfully!';
            form.reset();
        } else {
            throw new Error(result.error || 'Unknown error');
        }
        setTimeout(() => statusDiv.textContent = '', 3000);
    })
    .catch(error => {
        statusDiv.textContent = `Error: ${error.message}. Data not saved.`;
        console.error('Error!', error.message);
    });
});

// Register the service worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful, scope is:', registration.scope);
            })
            .catch(error => {
                console.error('ServiceWorker registration failed, error:', error);
            });
    });
}
