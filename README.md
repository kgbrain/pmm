# [*p*]mm

Post Mortem Management Application

## Prerequisites

- Node >=10.10
- Npm 6

## Getting Started

- Clone the repo
- `npm i`
- `npm run dev`

## Run Full Powered Firebase App locally

If you want to run the application together with lambda functions locally, follow the steps:

1. Go to [https://console.firebase.google.com/u/0/project/pmm-tool/settings/serviceaccounts/adminsdk](https://console.firebase.google.com/u/0/project/pmm-tool/settings/serviceaccounts/adminsdk) and generate a new Firebase Admin SDK private key. Once generated it will be downloaded as JSON file. Please, put it in s safe directory and NEVER COMMIT IT!

2. Provide authentication credentials to your application code by setting the environment variable **GOOGLE_APPLICATION_CREDENTIALS**:

```bash
export GOOGLE_APPLICATION_CREDENTIALS="[PATH_TO_PRIVATE_KEY_JSON]"
```

3. Run the App together with Firebase Emulator for functions:

```bash
npm run serve
```

4. You also need to create a local tunnel for Webhooks. You need to open a new terminal window and run:

```bash
npx lt --port 5001
```

## Deploy

We use Firebase Cloud Functions with Firebase Hosting rewrite rules to host the Next.js app.
Each individual page bundle is served in a new call to the Cloud Function which performs the initial server render.

In order to deploy run the following:

```bash
npm run deploy
```
