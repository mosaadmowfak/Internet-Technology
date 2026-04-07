import admin from "firebase-admin";
import { readFileSync } from "node:fs";

const sourceCollection = "learningHubSubmissions";
const targetCollection = "learningHub";
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
const shouldDeleteSource = process.argv.includes("--delete-old");

if (!serviceAccountPath) {
  console.error("Missing FIREBASE_SERVICE_ACCOUNT_KEY environment variable.");
  console.error("Set it to the path of your Firebase service account JSON file.");
  process.exit(1);
}

try {
  const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, "utf8"));
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
} catch (error) {
  console.error("Failed to initialize Firebase Admin:", error.message);
  process.exit(1);
}

const db = admin.firestore();

const migrate = async () => {
  const snapshot = await db.collection(sourceCollection).get();
  if (snapshot.empty) {
    console.log(`No documents found in ${sourceCollection}. Nothing to migrate.`);
    return;
  }

  let migrated = 0;
  let skipped = 0;

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const targetDocRef = db.collection(targetCollection).doc(docSnap.id);
    const existingDoc = await targetDocRef.get();

    if (existingDoc.exists) {
      skipped += 1;
      console.log(`Skipping existing target doc: ${docSnap.id}`);
      continue;
    }

    await targetDocRef.set(data);
    migrated += 1;

    if (shouldDeleteSource) {
      await db.collection(sourceCollection).doc(docSnap.id).delete();
    }
  }

  console.log(`Migration completed. Migrated: ${migrated}, Skipped: ${skipped}.`);
  if (shouldDeleteSource) {
    console.log("Source documents were deleted after migration.");
  } else {
    console.log("Source documents were preserved. Re-run with --delete-old to remove them.");
  }
};

migrate().catch((error) => {
  console.error("Migration failed:", error);
  process.exit(1);
});
