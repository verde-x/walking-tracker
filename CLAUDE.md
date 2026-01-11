# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React Native mobile application built with Expo and TypeScript. The project uses Expo Router for file-based navigation and supports iOS, Android, and web platforms.

**Key Technologies:**
- Expo SDK ~54.0
- React Native 0.81.5
- React 19.1.0
- Expo Router ~6.0 (file-based routing)
- TypeScript 5.9
- NativeWind (Tailwind CSS for React Native)
- React Native Reanimated & Gesture Handler for animations

**Important Configuration:**
- Expo New Architecture is enabled (`newArchEnabled: true` in [app.json](app.json))
- React Compiler experiment is enabled (`reactCompiler: true`)
- Typed routes experiment is enabled (`typedRoutes: true`)
- Path alias `@/*` maps to project root (configured in [tsconfig.json](tsconfig.json))

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with options menu
npm start
# or
npx expo start

# Start on specific platform
npm run android  # Android emulator
npm run ios      # iOS simulator
npm run web      # Web browser

# Linting
npm run lint
```

## Project Structure

The application uses Expo Router's file-based routing system where files in the `app/` directory automatically become routes:

- `app/_layout.tsx` - Root layout component that wraps all routes
- `app/index.tsx` - Main entry route (/)
- Routes are automatically generated based on file structure in the `app/` directory

The `app-example/` directory contains the original Expo starter code for reference, including example components, hooks, and UI patterns.

## Architecture Notes

**Routing:**
- This project uses Expo Router's file-based routing (v6)
- Routes are defined by the file structure in the `app/` directory
- The root layout uses a `<Stack />` navigator from expo-router
- Navigation is handled through the file system - create new files in `app/` to add routes

**Platform Support:**
- The app is configured for iOS, Android, and web
- Android package ID: `com.walkingtracker.app`
- URL scheme: `walkingtracker://`
- Icons and splash screens are platform-specific (see [app.json](app.json))

**TypeScript Configuration:**
- Strict mode is enabled
- Path aliasing with `@/*` for imports from root
- Extends Expo's base TypeScript configuration

## Git Conventions

- Commit messages should be concise and written in English
