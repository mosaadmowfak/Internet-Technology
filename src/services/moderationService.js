import { addDoc, collection, deleteDoc, doc, getDocs, orderBy, query, serverTimestamp, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const MODERATION_COLLECTIONS = {
  ideas: "ideas",
  learningHub: "learningHub",
  legacyLearningHub: "learningHubSubmissions",
  learningComments: "learningComments",
  community: "communityPosts",
  communityComments: "communityComments",
  events: "eventSubmissions",
  eventRegistrations: "eventRegistrations",
};

export const submitForModeration = async (collectionName, payload, user) => {
  if (!user) {
    throw new Error("You must login first.");
  }

  return addDoc(collection(db, collectionName), {
    ...payload,
    status: "pending",
    userId: user.uid,
    createdAt: serverTimestamp(),
  });
};

export const fetchAcceptedItems = async (collectionName) => {
  const snapshot = await getDocs(collection(db, collectionName));
  return snapshot.docs
    .map((entry) => ({ id: entry.id, ...entry.data() }))
    .filter((item) => item.status === "accepted");
};

/** True for items students should see (published). */
export const isLearningHubPublished = (item) => {
  const s = item.status;
  if (s === "pending" || s === "rejected") return false;
  return (
    s === "accepted" ||
    s === "published" ||
    s === undefined ||
    s === null ||
    s === ""
  );
};

export const fetchAllModerationItems = async (collectionName) => {
  const moderationQuery = query(
    collection(db, collectionName),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(moderationQuery);
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
};

export const updateModerationStatus = async (collectionName, id, status) => {
  await updateDoc(doc(db, collectionName, id), { status });
};

export const deleteModerationItem = async (collectionName, id) => {
  await deleteDoc(doc(db, collectionName, id));
};

export const addPublicItem = async (collectionName, payload, user) => {
  if (!user) {
    throw new Error("You must login first.");
  }

  const docData = {
    ...payload,
    userId: user.uid,
    createdAt: serverTimestamp(),
  };

  if (collectionName === MODERATION_COLLECTIONS.learningHub) {
    docData.status = "accepted";
  }

  return addDoc(collection(db, collectionName), docData);
};

export const fetchPublicItems = async (collectionName) => {
  const snapshot = await getDocs(
    query(collection(db, collectionName), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((entry) => ({ id: entry.id, ...entry.data() }));
};
