# React Native Version: Learn chord and scale positions on the Guitar

Visualize the notes on a fretboard

![Demo of App Interaction](media/app-demo.gif)

---

## Table of Contents
* [Requirements](#requirements)
* [Installation](#installation)
* [Usage](#usage)

---

## Requirements

* Node.js (v18 or later recommended)
* React Native CLI / Metro bundler
* Xcode (latest version) for iOS / Android Studio for Android

---

## Installation
1.  **Clone the repository:**
    ```bash
    git clone https://github.com/seanavers/fretboard-heatmap-react-native.git
    ```
2. **Install depndencies:**
    ```bash
   npm install
    ```

3. **Run for iOS:**
    ```bash
    bundle exec pod install --project-directory=ios
    npx react-native run-ios
    ```

---

## Usage
1.  **Open the app**
2.  **Tap CHORDS or SCALES to select desired type**
3.  **Tap Bottom Menu to display desired root**
4.  **Tap LABELS to toggle note labels**
    -   finger numbers for chords, note names for scales
5.  **Click Dropdown to selected desired key**

**Note: When switching to a new desired type, the Bottom Menu will match your current key** 