# PodTrans - Podcast Transcription & Translation Service

A modern web application for transcribing and translating podcast episodes using advanced AI technology.

## Features

- **Audio Upload**: Support for common formats (MP3, WAV, FLAC)
- **Automatic Transcription**: Convert audio to text in the original language
- **Translation**: Convert transcribed text to multiple languages
- **Transcription Editor**: Interface for correcting and adjusting transcriptions
- **Text Export**: Export in various formats (TXT, SRT, PDF, DOCX)
- **Project Management**: Organize episodes and transcriptions

## Dashboard Overview

The dashboard provides a comprehensive view of:

- Project statistics and usage metrics
- Recent projects with status indicators
- Activity feed showing recent actions
- Supported languages with accuracy ratings
- Plan usage and subscription details

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/podtrans.git
cd podtrans
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Tech Stack

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Vite

## Project Structure

```
src/
├── components/       # Reusable UI components
├── pages/            # Application pages
├── assets/           # Static assets
├── utils/            # Utility functions
├── hooks/            # Custom React hooks
├── types/            # TypeScript type definitions
├── App.tsx           # Main application component
└── main.tsx          # Application entry point
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
