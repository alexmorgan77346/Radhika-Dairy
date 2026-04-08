# 🥛 Dairy Delight – Setup Guide

A complete PWA for a dairy delivery system with Customer, Delivery Boy, and Admin roles.

---

## 📁 Project Structure

```
dairy-app/
├── index.html          ← Landing / Role selector page
├── login.html          ← Login & Signup page
├── customer.html       ← Customer dashboard (shop, cart, orders)
├── delivery.html       ← Delivery boy panel
├── admin.html          ← Admin panel (products, orders, users)
├── style.css           ← All styles (shared across pages)
├── firebase-config.js  ← Firebase initialization
├── sw.js               ← Service Worker (PWA offline support)
├── manifest.json       ← PWA manifest
├── seed.js             ← Seed data + Firestore rules
├── images/             ← Product images folder
│   ├── milk.png
│   ├── curd.png
│   ├── butter.png
│   ├── cheese.png
│   ├── paneer.png
│   ├── ghee.png
│   ├── icon-192.png
│   └── icon-512.png
└── SETUP.md            ← This file
```

---

## 🔥 Step 1: Firebase Setup

### 1.1 Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com)
2. Click **"Add project"** → Name it `dairy-delight`
3. Enable Google Analytics (optional)

### 1.2 Enable Authentication
1. Firebase Console → **Authentication** → Get Started
2. Enable **Email/Password** provider

### 1.3 Create Firestore Database
1. Firebase Console → **Firestore Database** → Create database
2. Start in **Test mode** (you'll add rules later)
3. Choose a region near you

### 1.4 Get Firebase Config
1. Firebase Console → Project Settings (⚙️) → Your apps
2. Click **Web** icon (`</>`) → Register app
3. Copy the `firebaseConfig` object

### 1.5 Update firebase-config.js
```js
const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

---

## 👤 Step 2: Create Admin User

### 2.1 Create Auth Account
1. Firebase Console → **Authentication** → Users → Add User
2. Email: `admin@dairy.com`
3. Password: `admin123` (change this!)
4. **Copy the UID** shown after creation

### 2.2 Add to Firestore
1. Firestore → **users** collection → Add document
2. Document ID: `<paste UID from above>`
3. Add these fields:
   - `id` (string): same UID
   - `name` (string): `Admin`
   - `email` (string): `admin@dairy.com`
   - `role` (string): `admin`

---

## 🛍️ Step 3: Seed Products

In Firestore → **products** collection → Add documents with these fields:

| Field | Type | Example |
|-------|------|---------|
| name | string | Full Cream Milk |
| price | number | 55 |
| category | string | milk |
| image | string | /images/milk.png |

**Categories available:** `milk`, `curd`, `butter`, `cheese`, `paneer`, `ghee`

**Or add products via the Admin Panel** after logging in!

---

## 🖼️ Step 4: Add Product Images

Add PNG images to the `/images/` folder:
- `milk.png`
- `curd.png`
- `butter.png`
- `cheese.png`
- `paneer.png`
- `ghee.png`
- `icon-192.png` (192×192 PWA icon)
- `icon-512.png` (512×512 PWA icon)

> 💡 **Tip:** If images are missing, the app shows emoji fallbacks automatically!

---

## 🔐 Step 5: Firestore Security Rules

Go to Firestore → **Rules** and replace with this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        (request.auth.uid == userId ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }

    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    match /orders/{orderId} {
      allow read: if request.auth != null &&
        (resource.data.customerId == request.auth.uid ||
         resource.data.deliveryBoyId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
      allow update: if request.auth != null &&
        (resource.data.deliveryBoyId == request.auth.uid ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
    }
  }
}
```

---

## 🚀 Step 6: Deploy

### Option A: GitHub Pages
```bash
# Push your project to a GitHub repository
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/dairy-delight.git
git push -u origin main

# Enable GitHub Pages in repo Settings → Pages → Deploy from main branch
```

> ⚠️ Add your GitHub Pages domain to Firebase Console →
> Authentication → Authorized domains

### Option B: Firebase Hosting
```bash
npm install -g firebase-tools
firebase login
firebase init hosting
firebase deploy
```

---

## 🧪 Testing the App

| Role | How to Test |
|------|-------------|
| **Admin** | Login with `admin@dairy.com` / `admin123` |
| **Customer** | Sign up from the Customer login page |
| **Delivery Boy** | Admin creates delivery boy from Users panel |

### Test Flow:
1. **Admin** adds products
2. **Customer** signs up, browses products, places order
3. **Admin** sees new order → assigns delivery boy
4. **Delivery Boy** logs in → sees assigned order → marks delivered
5. **Customer** sees order status update in real-time!

---

## 📱 PWA Installation

On mobile (Chrome/Safari):
1. Open the app URL
2. Browser shows "Add to Home Screen" prompt
3. Tap Install → App works offline!

---

## 🔧 Common Issues

**"Firebase: Error (auth/invalid-credential)"**
→ Wrong email/password. Check credentials.

**"Missing or insufficient permissions"**
→ Update Firestore Security Rules (Step 5)

**Products not showing**
→ Add products via Admin Panel or manually in Firestore

**Images not loading**
→ Add image files to `/images/` folder. Emoji fallbacks show automatically.

---

Built with ❤️ using Firebase + Vanilla JS
