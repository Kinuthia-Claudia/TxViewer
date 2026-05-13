# Transaction Viewer

Multi-source transaction viewer built with Expo, React Native and TypeScript that fetches data from APIs,
normalizes it into one format, and displays a unified list.

## Features
- Switch between JSONPlaceholder, DummyJSON, Fake Store, or view all combined
- Biometric authentication with remember me option
- Loading, error, and empty states handled
- Cached data with React Query 
- Logout clears session

## Architecture
```
External API → Adapter → Transaction Model → UI
```

## Tech Stack
- **React Query** — server state + caching
- **Zustand** — UI state
- **expo-router** — navigation
- **expo-local-authentication** — biometric auth
- **expo-secure-store** — persistent storage
  
## Quick Start
```bash
git clone https://github.com/Kinuthia-Claudia/TxViewer.git
cd TxViewer
npm install
npx expo start
```
## License
MIT
