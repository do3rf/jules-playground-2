# Vibe Code - Landmark Compass PWA Design

## 1. Introduction

This document describes the technical design and architecture for the Landmark Compass PWA. It details the system architecture, UI/UX design, core algorithms, component structure, and testing strategy.

## 2. System Architecture

The application will be a client-side, single-page application (SPA) that runs entirely in the browser.

- **Frontend:** The application will be built with vanilla HTML, CSS, and JavaScript. This approach minimizes dependencies and keeps the application lightweight, which is ideal for performance on mobile devices.
- **Backend:** No backend server is required. All data (landmark coordinates) and logic will be handled on the client side.
- **APIs:** The app will heavily rely on standard browser APIs:
    - **Geolocation API:** To get the user's current position (`navigator.geolocation`).
    - **Device Orientation API:** To get the phone's compass heading (`window.addEventListener('deviceorientationabsolute')`). We will use `deviceorientationabsolute` where available to get a reading relative to Earth's frame of reference, which is what we need for a compass.
- **PWA:** The app will be made into a PWA using:
    - **Web App Manifest (`manifest.json`):** This file will define the app's name, icons, and other properties for installation.
    - **Service Worker (`sw.js`):** This script will run in the background, enabling offline functionality by caching application assets.

## 3. UI/UX Design

The UI will be simple and focused on clarity.

- **Layout:** A single-screen interface.
    - At the top, a "compass" view will be displayed. This will contain a prominent arrow that always points North.
    - Below the compass, a list of landmarks will be shown.
- **Compass:** The North-pointing arrow will serve as a visual reference for the user. Its rotation will be updated in real-time based on sensor data.
- **Landmark List:** Each item in the list will display:
    - The landmark's name.
    - The calculated distance in kilometers.
    - An arrow indicating the direction to the landmark. This arrow's rotation will be relative to the top of the phone's screen.

## 4. Core Logic and Algorithms

### 4.1. Distance Calculation

The distance between the user and a landmark will be calculated using the **Haversine formula**, which determines the great-circle distance between two points on a sphere.

- **Inputs:** `(lat1, lon1)` for user, `(lat2, lon2)` for landmark.
- **Output:** Distance in kilometers.

### 4.2. Bearing Calculation

The initial bearing (or forward azimuth) from the user's location to a landmark will be calculated. This gives the direction to the landmark in degrees from North.

- **Inputs:** `(lat1, lon1)` for user, `(lat2, lon2)` for landmark.
- **Output:** Bearing in degrees (0° to 360°).

### 4.3. Arrow Rotation Logic

The rotation of the on-screen arrows will be determined as follows:

- **North Arrow:** `rotation = -deviceHeading`
    - `deviceHeading` is the compass heading from the Device Orientation API. The negative value is used to counteract the phone's rotation, keeping the arrow fixed on North.
- **Landmark Arrow:** `rotation = bearing - deviceHeading`
    - `bearing` is the calculated direction to the landmark from North.
    - By subtracting the device's heading, we get the landmark's direction relative to the top of the phone.

## 5. File & Component Structure

The project will have a flat and simple file structure:

- `index.html`: The main HTML file containing the structure of the app.
- `style.css`: All CSS rules for styling the application.
- `app.js`: The main JavaScript file for application logic, including:
    - State management (current location, heading, landmarks).
    - Event listeners for sensor data.
    - Calling UI update functions.
- `calculations.js`: A module for pure mathematical functions (Haversine, Bearing). This separates logic for easier unit testing.
- `ui.js`: A module for DOM manipulation functions (e.g., updating text, rotating arrows).
- `manifest.json`: The PWA web app manifest file.
- `sw.js`: The service worker script for offline support.
- `tests/`: A directory to hold all tests.
    - `unit/`: For unit tests (e.g., `calculations.test.js`).
    - `e2e/`: For Playwright E2E tests (e.g., `app.spec.js`).

## 6. Testing Strategy

- **Unit Testing:**
    - A JavaScript test runner (like Jest or Vitest) will be used.
    - `calculations.js` will be thoroughly tested with known inputs and expected outputs to ensure mathematical correctness.
- **End-to-End (E2E) Testing:**
    - Playwright will be used to automate browser testing.
    - We will mock the Geolocation and Device Orientation APIs within the Playwright environment to provide consistent sensor data for tests.
    - Tests will verify:
        - The correct landmark information is displayed.
        - Distances are calculated and displayed correctly.
        - Arrows are rendered and have the correct initial orientation based on mocked data.
