// ==========================================
// FIREBASE SEED DATA SCRIPT
// Run this ONCE to populate your Firestore with
// initial products and admin user.
//
// HOW TO USE:
// 1. Open your Firebase Console
// 2. Go to Firestore → Start in test mode
// 3. Add these products manually in the "products" collection
//    OR copy-paste this into a browser console after setting up
//    the Firebase config in firebase-config.js
// ==========================================

// ---- PRODUCTS TO SEED ----
// Add these documents to the "products" collection in Firestore:

const SEED_PRODUCTS = [
  { name: "Full Cream Milk", price: 55, category: "milk", image: "/images/milk.png" },
  { name: "Toned Milk (500ml)", price: 28, category: "milk", image: "/images/milk.png" },
  { name: "Buffalo Milk (1L)", price: 65, category: "milk", image: "/images/milk.png" },
  { name: "Fresh Curd (400g)", price: 42, category: "curd", image: "/images/curd.png" },
  { name: "Hung Curd (250g)", price: 55, category: "curd", image: "/images/curd.png" },
  { name: "Butter (100g)", price: 52, category: "butter", image: "/images/butter.png" },
  { name: "Salted Butter (200g)", price: 90, category: "butter", image: "/images/butter.png" },
  { name: "Processed Cheese (200g)", price: 110, category: "cheese", image: "/images/cheese.png" },
  { name: "Fresh Paneer (200g)", price: 72, category: "paneer", image: "/images/paneer.png" },
  { name: "Malai Paneer (500g)", price: 160, category: "paneer", image: "/images/paneer.png" },
  { name: "Pure Ghee (500ml)", price: 320, category: "ghee", image: "/images/ghee.png" },
  { name: "Cow Ghee (200ml)", price: 180, category: "ghee", image: "/images/ghee.png" }
];

// ---- HOW TO CREATE ADMIN USER ----
// 1. Go to Firebase Console → Authentication → Add User
//    Email: admin@dairy.com
//    Password: admin123 (or your choice)
//    Copy the UID of the created user

// 2. Go to Firestore → users collection → Add Document
//    Document ID: <paste UID here>
//    Fields:
//      id: <same UID>
//      name: "Admin"
//      email: admin@dairy.com
//      role: "admin"

// ==========================================
// FIRESTORE SECURITY RULES
// Copy-paste these into Firebase Console →
// Firestore → Rules
// ==========================================

/*
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {

    // Users can read their own profile, admin can read all
    match /users/{userId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        (request.auth.uid == userId ||
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin');
      allow create: if request.auth != null;
    }

    // Products: anyone logged in can read, only admin can write
    match /products/{productId} {
      allow read: if request.auth != null;
      allow write: if request.auth != null &&
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == 'admin';
    }

    // Orders: customers create, delivery reads assigned, admin reads all
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
*/

console.log("Seed data config ready. Check SETUP.md for instructions.");
