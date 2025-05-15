import { initializeApp } from "firebase/app";
import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut} from "firebase/auth";
import { addDoc, collection, getFirestore} from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyDTrh9t4uaZK3tildB_j7zAfkmZ0ijoFLM",
  authDomain: "netflix-clone-195f8.firebaseapp.com",
  projectId: "netflix-clone-195f8",
  storageBucket: "netflix-clone-195f8.firebasestorage.app",
  messagingSenderId: "128661968920",
  appId: "1:128661968920:web:9d6dd6ac1f7d89b4b4cb6d"
};

const app = initializeApp(firebaseConfig);
//from here we have written code
const auth = getAuth(app);
const db = getFirestore(app);
const signup = async(name,email,password)=>{
    try{
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user = res.user;
        await addDoc(collection(db,"user"),{
            uid : user.uid,
            name,
            authProvider : "local",
            email,
        });
    }catch(error){
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const login = async(email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}
const logout = async()=>{
    signOut(auth);
}

export {auth, db , login , signup , logout};