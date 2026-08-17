# 🚧 Road Construction Finder

A Chrome extension that helps identify road construction, road closures,
infrastructure projects, construction dates, and potential route impacts
using GPS coordinates and road addresses.

## ✨ Features

- 📍 Latitude and longitude input
- 🛣️ Road address input
- 🤖 Gemini AI-powered research
- 🚧 Road construction and closure detection
- 📅 Construction start and end dates
- ⚠️ Infrastructure impact summary
- 🎯 Confidence assessment
- 🔗 Official source identification
- 💾 Local Gemini API key storage
- 🌐 Chrome Extension Manifest V3

## 🛠️ Technologies

- HTML
- CSS
- JavaScript
- Chrome Extension APIs
- Chrome Storage API
- Gemini API
- Web research

## 🔄 How It Works

1. Enter the latitude of the location.
2. Enter the longitude.
3. Enter the road address.
4. Click **Search**.
5. The extension sends the location information for research.
6. Gemini analyzes the available information.
7. The result is presented in a structured format containing:

   - Construction status
   - Start date
   - End date
   - Impact
   - Confidence
   - Summary
   - Official sources

## 🎯 Real-World Use Case

The project was designed around a road-mapping workflow where route
deviations can occur because of road construction, road closures,
maintenance work, or other infrastructure projects.

Instead of manually searching multiple sources for every location,
the extension provides a single interface for researching the location
and organizing the findings.

## 📁 Project Structure

```text
RoadConstructionFinder/
│
├── icons/
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
│
├── js/
│   ├── gemini.js
│   ├── prompt.js
│   └── storage.js
│
├── background.js
├── manifest.json
├── options.css
├── options.html
├── options.js
├── popup.css
├── popup.html
└── popup.js
