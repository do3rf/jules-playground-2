const state = {
    location: {
        lat: null,
        lon: null,
    },
    heading: null,
    landmarks: [
        {
            name: 'Eiffel Tower',
            location: { lat: 48.8584, lon: 2.2945 },
            distance: null,
            bearing: null,
        },
        {
            name: 'Statue of Liberty',
            location: { lat: 40.6892, lon: -74.0445 },
            distance: null,
            bearing: null,
        },
    ],
};

function updateApp() {
    // Ensure we have location data before doing anything
    if (state.location.lat === null) {
        renderLandmarks([], state.heading); // Render empty list
        return;
    }

    // Update distances and bearings for all landmarks
    for (const landmark of state.landmarks) {
        landmark.distance = calculateDistance(
            state.location.lat,
            state.location.lon,
            landmark.location.lat,
            landmark.location.lon
        );
        landmark.bearing = calculateBearing(
            state.location.lat,
            state.location.lon,
            landmark.location.lat,
            landmark.location.lon
        );
    }

    // Sort landmarks by distance, nearest first
    state.landmarks.sort((a, b) => a.distance - b.distance);

    // Update the UI
    updateNorthArrow(state.heading);
    renderLandmarks(state.landmarks, state.heading);
}

function handleLocationUpdate(position) {
    state.location.lat = position.coords.latitude;
    state.location.lon = position.coords.longitude;
    updateApp();
}

function handleLocationError(error) {
    console.error('Geolocation error:', error.message);
    alert('Could not get your location. Please enable location services and refresh the page.');
}

function startGeolocation() {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }
    console.log('Starting geolocation...');
    navigator.geolocation.watchPosition(handleLocationUpdate, handleLocationError, {
        enableHighAccuracy: true,
    });
}

function handleOrientationUpdate(event) {
    if (event.absolute === true) {
        // The alpha value is the compass heading, but it's inverted on some devices.
        // A value of 0 is North. We'll assume the standard behavior.
        // For production apps, this needs more robust handling.
        state.heading = event.alpha;
        updateApp();
    }
}

function startCompass() {
    // Check for support
    if (window.DeviceOrientationEvent) {
        console.log('Starting compass...');
        window.addEventListener('deviceorientationabsolute', handleOrientationUpdate, true);
    } else {
        alert("Your browser doesn't support device orientation.");
    }
}


function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('ServiceWorker registration successful, scope is:', registration.scope);
            })
            .catch(error => {
                console.error('ServiceWorker registration failed, error:', error);
            });
    }
}

// --- App Initialization ---
window.addEventListener('load', () => {
    startGeolocation();
    startCompass();
    registerServiceWorker();
    console.log('app.js loaded and services started');
});
