// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCkPvKmA_flxks1iSZ_c4J-kTW7OXv9Je0",
    authDomain: "countries-91c86.firebaseapp.com",
    projectId: "countries-91c86",
    storageBucket: "countries-91c86.appspot.com",
    messagingSenderId: "334800848237",
    appId: "1:334800848237:web:4341f223bea951a5dc8664"
  };


// Initialize Firebase
export const app = initializeApp(firebaseConfig);

 export const auth = getAuth(app, {
    persistence: browserSessionPersistence
  });
const db = getFirestore(app)

const logInWithEmailAndPassword = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
        .then(
            (userCredential)=>{
                console.log("user was created",userCredential.user)
               const user = userCredential.user; 
                 
         } 
          )
          .catch(error => console.log(error))
    } catch (err) {
        console.log(err)
        // alert(err.message)
    }
}

const registerWithEmailAndPassword =  (name, email, password) => {
    try {
         createUserWithEmailAndPassword(auth, email, password )
         .then(cred => {
            console.log("User register successfully", cred.user);
            if (auth.currentUser){
                updateProfile(auth.currentUser,{displayName:name,})
               }   
               addDoc(collection(db, "users"), {
                uid: cred.user.uid,
                name,
                authProvider: "local",
                email:cred.user.email
            })
         })
         .catch((error ) => {
            console.log("creating account failed",error)
        })
         
    } catch (err) {
        console.log(err)
        // alert(err.message)
    }
}

const logout = () => {
    signOut(auth);
}

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
