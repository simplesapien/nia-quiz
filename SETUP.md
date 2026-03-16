# NiaHealth Quiz — Setup Guide

## Firebase config (required for deploy)

1. **Add the secret to GitHub:**
   - Go to your repo → **Settings** → **Secrets and variables** → **Actions**
   - Click **New repository secret**
   - Name: `FIREBASE_CONFIG`
   - Value: Paste the **entire contents** of your `firebase-config.js` file (the full JavaScript, including `const firebaseConfig = { ... };`)

2. **Local development:** Copy `firebase-config.example.js` to `firebase-config.js` and add your real config. Never commit `firebase-config.js`.

## GitHub Pages

1. Go to **Settings** → **Pages**
2. Under **Build and deployment**, set **Source** to **GitHub Actions**
3. The workflow will deploy on every push to `master`

## Note on private repos

GitHub Pages for private repositories requires a GitHub Pro, Team, or Enterprise account. If you're on the free plan, you'll need to make the repo public for Pages to work, or use another host.
