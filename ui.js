const northArrow = document.getElementById('arrow-north');
const landmarksContainer = document.getElementById('landmarks');
const landmarkTemplate = document.getElementById('landmark-template');

/**
 * Rotates the main north-pointing arrow.
 * @param {number | null} heading The device's heading in degrees.
 */
function updateNorthArrow(heading) {
    if (heading === null) return;
    // We use a CSS variable for smoother updates if we add transitions
    document.body.style.setProperty('--heading', `${-heading}deg`);
    northArrow.style.transform = `rotate(var(--heading, 0deg))`;
}

/**
 * Renders the list of landmarks in the DOM.
 * @param {Array} landmarks The sorted list of landmark objects.
 * @param {number | null} heading The device's current heading.
 */
function renderLandmarks(landmarks, heading) {
    // Clear the existing list to prevent duplicates
    landmarksContainer.innerHTML = '';

    if (!landmarks || landmarks.length === 0) {
        landmarksContainer.textContent = 'No landmarks to display.';
        return;
    }

    if (!landmarkTemplate) {
        console.error('Landmark template not found!');
        return;
    }

    for (const landmark of landmarks) {
        const landmarkEl = landmarkTemplate.content.cloneNode(true).firstElementChild;

        const nameEl = landmarkEl.querySelector('.landmark-name');
        const distanceEl = landmarkEl.querySelector('.landmark-distance');
        const arrowEl = landmarkEl.querySelector('.landmark-arrow');

        nameEl.textContent = landmark.name;

        if (landmark.distance !== null) {
            distanceEl.textContent = `${landmark.distance.toFixed(1)} km away`;
        } else {
            distanceEl.textContent = 'Calculating...';
        }

        if (landmark.bearing !== null && heading !== null) {
            const relativeBearing = landmark.bearing - heading;
            arrowEl.style.transform = `rotate(${relativeBearing}deg)`;
        }

        landmarksContainer.appendChild(landmarkEl);
    }
}

console.log('ui.js loaded');
