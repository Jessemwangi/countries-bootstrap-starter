// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
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
          .catch(error => {
            toast.error("Authentication Error, invalid Email or Password", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            console.log(error)
          }
          )
    } catch (err) {
        toast.error("Error 500, an error occured try sigining you in", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
        console.log(err)
        // alert(err.message)
    }
}

const registerWithEmailAndPassword =  (name, email, password) => {
    try {
         createUserWithEmailAndPassword(auth, email, password )
         .then(cred => {
            toast.success(`User register successfully, ${cred.user}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
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
            toast.warn(`creating account failed, ${error.message}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
        })
         
    } catch (err) {
        console.log(err)
        // alert(err.message)
        toast.error(`creating account failed`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
    }
}

const logout = () => {
    signOut(auth);
}

export { logInWithEmailAndPassword, registerWithEmailAndPassword, logout };
