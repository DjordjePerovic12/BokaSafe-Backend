const admin = require('firebase-admin');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Decode URL-safe Base64
function decodeBase64UrlSafe(base64) {
    base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
    return Buffer.from(base64, 'base64').toString('utf8');
}

// Parse the service account JSON
const serviceAccountJson = decodeBase64UrlSafe(process.env.FIREBASE_SERVICE_ACCOUNT);
const serviceAccount = JSON.parse(serviceAccountJson);

// Initialize Firebase Admin SDK
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
