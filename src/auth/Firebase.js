import { initializeApp } from "firebase/app";
import { browserSessionPersistence, createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import {  collection, getFirestore, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";
const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTHDOMAIN,
    projectId: process.env.REACT_APP_PROJECTID,
    storageBucket: process.env.REACT_APP_STORAGEBUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
    appId: process.env.REACT_APP_APPID
  };
  
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
               const user = userCredential.user; 
               toast.success(`Welcome back ${user.displayName}.`, {
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
               setDoc(collection(db, "users",cred.user.uid), {
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
