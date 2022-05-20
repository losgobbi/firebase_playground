import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { getFirestore, getDoc, getDocs, DocumentReference, QueryDocumentSnapshot }  from 'firebase/firestore/lite';
import { DocumentData, QuerySnapshot, DocumentSnapshot }  from 'firebase/firestore/lite';
import { addDoc, collection, collectionGroup, doc, setDoc } from 'firebase/firestore/lite';

var firebaseConfig = require('./serviceAccountKey.json');

/* init */
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

async function setDbEntry(path: string, object : object) {
  try {
    let docRef = doc(db, path);
    await setDoc(docRef, {...object});
  } catch (error) {
    console.log(error);
  }
}

async function addDbEntry(collectionName : string, object : object) : Promise<DocumentReference<object>> {
  try {
    let col = collection(db, collectionName);
    let doc = await addDoc(col, object);
    return doc;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function fetchDoc(path : string) : Promise<DocumentSnapshot<DocumentData>> {
  try {
    let docRef = doc(db, path);
    let snapshot = await getDoc(docRef);
    return snapshot;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function fetchDocs(name : string) : Promise<QuerySnapshot<DocumentData>> {
  try {
    let col = collectionGroup(db, name);
    let docs = await getDocs(col);    
    return docs;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function login(login : string, pass : string) : Promise<UserCredential> {
  try {
    let user = await signInWithEmailAndPassword(auth, login, pass)
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
}

async function signUp(login : string, pass : string) : Promise<string> {
  try {
    let user = await createUserWithEmailAndPassword(auth, login, pass);
    return user.user.uid
  } catch (error) {
    return Promise.reject(error);
  }
}

async function do_tests() {
  // placeholder to call functions...

}

do_tests();
