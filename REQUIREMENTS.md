# Vibe Code - Landmark Compass PWA Requirements

## 1. Introduction

This document outlines the functional and non-functional requirements for a Progressive Web App (PWA) designed to run on Android mobile phones. The application will help users determine the direction and distance to a given set of landmarks using the phone's GPS and compass sensors.

## 2. Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| **FR1** | Predefined Landmark Data | The app shall include a predefined list of landmarks. At a minimum, this list will include the Eiffel Tower (Paris) and the Statue of Liberty (New York), with their respective GPS coordinates. |
| **FR2** | User Geolocation | The app shall request and acquire the user's current GPS coordinates using the device's location services. |
| **FR3** | Compass Reading | The app shall read the device's compass heading to determine the direction of geographic North. |
| **FR4** | North-pointing Arrow | The app shall display a persistent arrow or indicator on the screen that always points towards North, regardless of the phone's physical orientation. |
| **FR5** | Landmark List Display | The app shall display the list of landmarks to the user. |
| **FR6** | Distance Calculation | For each landmark, the app shall calculate and display the distance from the user's current location to the landmark. The distance shall be displayed in kilometers (km). |
| **FR7** | Direction to Landmark | For each landmark, the app shall display a visual arrow pointing in the correct geographical direction of that landmark, relative to the current orientation of the phone. |
| **FR8** | Sorted Landmark List | The landmark list shall be dynamically sorted based on the user's proximity to them, with the closest landmark appearing at the top of the list. |
| **FR9** | PWA Functionality | The app shall function as a Progressive Web App, allowing it to be added to the user's home screen on an Android device. |

## 3. Non-Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| **NFR1** | Offline Capability | The core application (UI, calculations, last known locations) should be accessible and functional without an active internet connection after the initial load. |
| **NFR2** | Performance & Responsiveness | UI updates, particularly the rotation of compass and landmark arrows, must be smooth and performant. The layout should be responsive to different screen sizes on Android phones. |
| **NFR3** | Usability | The user interface shall be clean, intuitive, and easy to understand with minimal instruction. |
| **NFR4** | Browser Compatibility | The app must be fully functional on the latest stable version of Google Chrome for Android. |

## 4. Technical Requirements

| ID | Requirement | Description |
|---|---|---|
| **TR1** | Technology Stack | The application will be built using standard web technologies: HTML5, CSS3, and modern JavaScript (ES6+). No external frontend frameworks (like React, Vue, etc.) will be used, to ensure the app is lightweight. |
| **TR2** | Testing | The project must include a suite of tests. Unit tests will be written for core logic and calculation functions. End-to-end (E2E) tests will be written using Playwright to verify the complete user-facing functionality. |
