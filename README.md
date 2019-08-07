# [*p*]mm

Post Mortem Management Application

## Prerequisites

- Node 10
- Npm 6

## Getting Started

- Clone the repo
- `npm i`
- `npm run dev`

## Run Firebase locally for testing

```bash
npm run serve
```

## Deploy

We use Firebase Cloud Functions with Firebase Hosting rewrite rules to host the Next.js app.
Each individual page bundle is served in a new call to the Cloud Function which performs the initial server render.

In order to deploy run the following:

```bash
npm run deploy
```
