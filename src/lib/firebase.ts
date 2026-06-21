import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  setDoc, 
  doc, 
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { Organ } from '../types';
import { ORGANS as DEFAULT_ORGANS } from '../data/organs';

// Statically declare config from firebase-applet-config.json
const firebaseConfig = {
  projectId: "studied-victory-vcf5x",
  appId: "1:676009018123:web:2feac0b27a1727b710d80e",
  apiKey: "AIzaSyDXTHUhTK27GYU4heif_TioPQMK0Ah_jvI",
  authDomain: "studied-victory-vcf5x.firebaseapp.com",
  firestoreDatabaseId: "ai-studio-32f0ad99-392e-4d65-baf8-a8a9334a263f",
  storageBucket: "studied-victory-vcf5x.firebasestorage.app",
  messagingSenderId: "676009018123"
};

const app = initializeApp(firebaseConfig);

// Initialize with the custom allocated Database ID
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);

export async function getLiveOrgans(): Promise<Organ[]> {
  try {
    const organsCol = collection(db, 'organs');
    const snapshot = await getDocs(organsCol);
    
    if (snapshot.empty) {
      console.log("No organs found in Cloud Firestore. Seeding default organs...");
      // Seed default organs
      const batch = writeBatch(db);
      for (const organ of DEFAULT_ORGANS) {
        const organRef = doc(db, 'organs', organ.id);
        batch.set(organRef, organ);
      }
      await batch.commit();
      console.log("Database seeded successfully with default organs!");
      return DEFAULT_ORGANS;
    }
    
    const liveOrgans: Organ[] = [];
    snapshot.forEach((docSnap) => {
      liveOrgans.push(docSnap.data() as Organ);
    } );
    
    // Sort them so they match the order in DEFAULT_ORGANS, or custom order if we want,
    // let's sort by matching the original order or alphabetically, or keep a sorting key.
    // We can map them based on DEFAULT_ORGANS IDs first, and add new ones at the end.
    const defaultIds = DEFAULT_ORGANS.map(o => o.id);
    liveOrgans.sort((a, b) => {
      const idxA = defaultIds.indexOf(a.id);
      const idxB = defaultIds.indexOf(b.id);
      if (idxA !== -1 && idxB !== -1) {
        return idxA - idxB;
      }
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.name.localeCompare(b.name);
    });

    return liveOrgans;
  } catch (error) {
    console.error("Error fetching or seeding organs from Firestore:", error);
    // Fallback to local default organs if network/permission issue
    return DEFAULT_ORGANS;
  }
}

export async function saveOrganToCloud(organ: Organ): Promise<void> {
  try {
    const organRef = doc(db, 'organs', organ.id);
    await setDoc(organRef, organ);
    console.log(`Organ ${organ.name} (${organ.id}) saved to Cloud Cloud Firestore!`);
  } catch (error) {
    console.error(`Failed to save organ ${organ.id} to cloud:`, error);
    throw error;
  }
}

export async function deleteOrganFromCloud(organId: string): Promise<void> {
  try {
    const organRef = doc(db, 'organs', organId);
    await deleteDoc(organRef);
    console.log(`Organ ${organId} deleted from Cloud Cloud Firestore!`);
  } catch (error) {
    console.error(`Failed to delete organ ${organId} from cloud:`, error);
    throw error;
  }
}

export async function resetOrgansToDefault(): Promise<Organ[]> {
  try {
    // Delete existing documents in organs collection first
    const organsCol = collection(db, 'organs');
    const snapshot = await getDocs(organsCol);
    
    const batch = writeBatch(db);
    snapshot.forEach((docSnap) => {
      batch.delete(docSnap.ref);
    });
    
    // Set default organs
    for (const organ of DEFAULT_ORGANS) {
      const organRef = doc(db, 'organs', organ.id);
      batch.set(organRef, organ);
    }
    
    await batch.commit();
    console.log("Database reset to defaults successfully!");
    return DEFAULT_ORGANS;
  } catch (error) {
    console.error("Failed to reset database to defaults:", error);
    throw error;
  }
}
