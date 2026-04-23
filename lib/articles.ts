import { collection, getDocs, orderBy, query, doc, updateDoc, deleteDoc, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";
import { Article } from "./types";

export async function fetchArticles(): Promise<Article[]> {
  const q = query(collection(db, "articles"), orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((d) => ({ id: d.id, ...d.data() } as Article));
}

export async function saveArticle(data: Omit<Article, "id">, id?: string): Promise<void> {
  if (id) {
    await updateDoc(doc(db, "articles", id), { ...data, updatedAt: serverTimestamp() });
  } else {
    await addDoc(collection(db, "articles"), { ...data, createdAt: serverTimestamp(), updatedAt: serverTimestamp() });
  }
}

export async function deleteArticle(id: string): Promise<void> {
  await deleteDoc(doc(db, "articles", id));
}
