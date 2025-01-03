# Kepler Local Backend

A local backend service for managing carousel configurations with a React-based admin interface.

## Features

- Visual carousel configuration interface
- Draft & publish workflow for carousel layouts
- Local storage support for work in progress
- JSON-based data persistence
- Real-time preview of carousel layouts

## Getting Started

Start the React development server:

```bash
npm run dev
```
The backend will run on http://localhost:5001 and the frontend on http://localhost:3000

## Server Details 🚀

The application runs on two ports:
| Service | URL | Purpose |
|---------|-----|---------|
| Backend API | `http://localhost:5001` | Handles data and configuration |
| Frontend UI | `http://localhost:3000` | Configuration interface |

## API Reference 📡

### Core Endpoints
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/carousellayout` | `GET` | Fetch current carousel layout |
| `/carousellayout` | `POST` | Deploy new configuration |
| `/carousellayout/draft` | `POST` | Save work in progress |

### Content Endpoints
| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/livestreams/:id` | `GET` | Stream information |
| `/teams/:id` | `GET` | Team profiles |
| `/documentaries/:id` | `GET` | Documentary details |
| `/suggestedforyou/:id` | `GET` | Personalized content |

## Configuration Interface 🎨

### Key Features
- 🖱️ **Interactive Editing**: Click any carousel title to modify
- 💾 **Draft System**: Blue "Save Draft" button preserves work
- ✨ **Publishing**: Green "Publish" button deploys changes
- 🔄 **Real-time Preview**: Instant visual feedback

### Carousel Types
| Style | Dimensions | Use Case |
|-------|------------|----------|
| Hero | 300x200px | Featured content |
| Card | 120x180px | Standard listings |
| Square | 150x150px | Grid layouts |

## Data Architecture 📁

### JSON Structure
All configuration files reside in `src/server/data/`:
```json
src/server/data/
├── carousellayout.json    # Main configuration
├── liveStreamDetails.json # Stream data
├── teams.json            # Team information
├── documentaries.json    # Documentary catalog
└── suggestedforyou.json  # Recommendations
```
