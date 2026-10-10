Sadak Saathi — Civic Road Safety Platform
<img width="1280" height="800" alt="image" src="https://github.com/user-attachments/assets/89360a66-544f-4739-a248-5c29f1d68716" />
Sadak Saathi is a proactive smart digital platform designed for street-level civic action and road hazard mitigation. Built for BST Hackathon / Protothon 2K26 (October Edition) by team SheCodex, the application provides a hyper-local, photo-first, and voice-first way for citizens to log hazards in seconds.
Reports populate a real-time public safety map to route pedestrians and drivers around dangers, while generating an auto-priority severity queue for municipal teams with crowdsourced and photo-verified closures.

🔗 Live Project Links
Live Web Application: she-codes-x.vercel.app

📌 Problem Statement & Context
Commuters encounter critical hazards daily—including open manholes, dangling live wires, broken footpaths, and heavy waterlogging. Current grievance portals are over-complicated, requiring heavy forms and typing in English, which deters reporting. Consequently, risks remain unaddressed until accidents occur.
Municipal departments lack a real-time, prioritised picture of field conditions, processing tickets on a first-come, first-served basis without analytical weight or closure verification.

🚨 Why It Matters
According to MoRTH (2022), India recorded 1.68 lakh road deaths, with 39.4% occurring on district, rural, and suburban streets rather than national or state highways. Sadak Saathi addresses this neglected urban grid.
🌟 Key Features & Innovations
1. Photo-First & Voice-First Reporting
Seconds-to-Log: Citizens can snap a photo, drop a GPS pin, or record a quick audio note.
Language Inclusivity: Integrated with Bhashini AI Layer. Users can speak in Hindi, Kannada, Tamil, or other regional languages, automatically converting speech to text.
AI Vision Labeling: Vision models analyse uploaded photos to automatically suggest the hazard category.
2. Auto-Severity Engine & Dashboard
Dynamic Matrix: Algorithms score reports based on hazard classification, proximity to high-risk zones (schools, hospitals, bus stops), blocked pathways, and night visibility.
Color-Coded Queue: Generates a real-time Red, Yellow, Green ranking system so high-risk hazards (like live wires) jump to the top of the municipal cleanup dashboard.
3. Safe-Route Mapping
Hazard Avoidance: A public-facing interactive navigation map built on street-level reporting.
Smart Routing: Directs night commuters and pedestrians along paths that explicitly circumvent high-risk (Red) hazards.
4. Photo-Verified Closures
Dual-Step Verification: Field crews must upload a geo-tagged "after-photo" to clear a ticket.
Citizen Dispute Loop: Local residents get the final say to mark a fix as "looks fixed" or "still there". Disputed closures push the ticket back to the top of the queue with an escalated severity rank.
5. Future Risk & Predictive Mapping
Proactive Readiness: Combines historical waterlogging data with live rainfall forecasts to generate warning flags for municipal inspection crews before downpours begin.
🛠️ Technological Stack
Frontend & UI
HTML5 / CSS3 / JavaScript
Leaflet.js: Lightweight interactive maps for pathing, boundary ward definitions, and hazard pinning.
Mobile-Web Engine: Optimised for low-data usage, offline persistence caching, and compatibility with older smartphones.
Backend & Core Infrastructure
FastAPI (Python): Fast, robust asynchronous API layer managing authentication, validation, and geo-duplication cleanup.
PostgreSQL / PostGIS: Handles spatial query data and coordinates mapping.
AI Layers & Data Feeds
Bhashini API: MeitY national language AI platform for voice-to-text translations.
Pre-trained Vision Models: Image classification for automated hazard categorisation.
OpenStreetMap & Rajmargyatra: Spatial basemaps and integration hooks for landmark locations.
🏗️ System Flow & Architecture
mermaid
flowchart TD
    %% User Inputs
    Citizen["Citizen Web App App <br>(Photo, GPS Pin, Voice Note)"] -- Offline-First Queue --> API["FastAPI Server <br>(Validation & Geo-Merge)"]
    
    %% AI Engine
    API --> AI["AI Layer <br>(Vision Classifier & Bhashini STT)"]
    AI --> Engine["Severity & Risk Engine <br>(Scoring Matrix & Future Risk Model)"]
    
    %% Data & Map
    Data["Data Sources <br>(OpenStreetMap, Rain Forecasts)"] --> Engine
    
    %% Outputs
    Engine --> Dash["Municipal Dashboard <br>(Ranked R/Y/G Queue & Assignments)"]
    Engine --> PublicMap["Public Safety Map <br>(Safe Routes & Early Warnings)"]
    
    %% Closure Loop
    Dash --> Crew["Crew Uploads After-Photo"]
    Crew --> CitizenVerify{"Citizen Confirmation"}
    CitizenVerify -- Disputed --> Engine
    CitizenVerify -- Resolved --> PublicMap
   👥 TEAM: 2392608244-SheCodesX
MEMBERS:
2392608244 Sumedha Ghosh
2392608235 Harini S
2392608088 Harinanda V Nair
2392608239 Yamini Vishnu Bele
🚀 Quick Start Guide & Setup
Prerequisites
Python 3.10+
Node.js v18+
PostgreSQL Instance with PostGIS extension enabled
1. Repository Installation
2. bash
git clone https://github.com
cd sadak-saathi
2. Backend Environment Configuration (.env)
Create a configuration file inside your backend directory:
env
DATABASE_URL="postgresql://username:password@localhost:5432/sadak_saathi"
BHASHINI_API_KEY="your_bhashini_auth_key"
WEATHER_API_KEY="your_weather_forecast_provider_key"
PORT=8000
3. Running the Project Local Development Env
bash
# To launch your backend environment
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
<img width="1280" height="808" alt="image" src="https://github.com/user-attachments/assets/31733bfd-f0b0-48c6-b300-4e688198f251" />


# To launch your frontend mobile-web application
cd ../frontend
npm install
npm run dev
<img width="1280" height="736" alt="image" src="https://github.com/user-attachments/assets/62eb3351-e646-42d9-a6c9-06b4b481d054" />
## What we built

Describe only what is present and tested in the code committed to this repository. The intended prototype workflow is:
- Open the home screen and navigate to reporting.
- Enter a hazard category, severity and description.
- Add a location and optional photo where supported.
- Review submitted reports and their displayed status.
- Use an interactive map to inspect locations.
- Change the app language where translations are implemented.

## Why it matters

The project aims to make road-hazard reporting more understandable and organized. A future production version could connect residents with verified civic workflows, but this repository does not imply that municipal authorities receive reports unless that integration is actually implemented.

## Technology

Update this list to match the final code:
- HTML, CSS and JavaScript
- Leaflet for interactive maps
- OpenStreetMap tiles
- Browser storage for prototype-only data
- Browser geolocation, when permission is granted

## Run locally

1. Install Git if needed and clone this public repository:
   ```bash
   git clone <PUBLIC_REPOSITORY_URL>
   cd <REPOSITORY_FOLDER>
   ```
2. Open the main HTML file in a modern browser, or open the folder in VS Code and use a local development server such as Live Server.
3. Connect to the internet for map tiles and external place search.
4. Grant location permission to test the current-location control.
5. Submit a test report and verify that it appears in the report list and map.

**Important:** Replace these instructions if the final project uses a different entry point or requires installation commands. The repository must be tested from a clean clone before submission.

## PPT

The presentation is committed alongside the source code at [`Sadak_Saathi_Hackathon_Presentation.pptx`](Sadak_Saathi_Hackathon_Presentation.pptx). It covers the problem, affected users, solution workflow, implementation, demo instructions, impact and known limitations.

## Known limitations — update honestly

- `[ ]` Shared backend and cross-device synchronization
- `[ ]` Production authentication and account recovery
- `[ ]` Integration with civic/municipal systems
- `[ ]` Complete translations for every screen and message
- `[ ]` Report verification, duplicate detection and moderation
- `[ ]` Privacy policy, security review and data-retention rules
- `[ ]` Full mobile, accessibility and browser testing
- `[ ]` Android packaging and Play Store release, if applicable

Remove items only after the corresponding feature is implemented and tested. Clearly label any sample reports as demo data.

## Submission checklist

- [ ] Repository was created new for this hackathon and complies with organizer rules.
- [ ] Repository visibility is **Public**.
- [ ] Exact official problem statement is included.
- [ ] Team names and USNs are accurate.
- [ ] Source code and PPT are committed to the repository.
- [ ] Run instructions work from a fresh clone.
- [ ] Demo was tested on the machine used for judging.
- [ ] Unfinished features and demo data are disclosed honestly.
