import {createContext, useContext, useEffect, useState} from "react";
import app from "../firebase/firebase.config.js"
import {getAuth,createUserWithEmailAndPassword,signInWithEmailAndPassword,signInWithPopup,GoogleAuthProvider,GithubAuthProvider,onAuthStateChanged,signOut,FacebookAuthProvider} from "firebase/auth"

const AuthContext = createContext(null);

export const useAuth = () => {
    return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {

    const [user,setuser]=useState(null);

    const auth=getAuth(app)

    // User Register
    const signupWithEmail=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

    // User Login
    const loginWithEmail=(email,password)=>{
        return signInWithEmailAndPassword(auth,email,password)
    }

    // Google login
    const GoogleLogin=()=>{
        const googleProvider=new GoogleAuthProvider()
        return signInWithPopup(auth, googleProvider)
    }

    //github login
    const GithubLogin = () => {
        const githubProvider = new GithubAuthProvider();
        return signInWithPopup(auth, githubProvider);
    };

    //Facebook Login
    const FacebookLogin = ()=>{
        const facebookProvider=new FacebookAuthProvider();
        return signInWithPopup(auth, facebookProvider);
    }

    //manage user state
    useEffect(() => {
       const unsubcribe=onAuthStateChanged(auth,(currentUser)=>{
           setuser(currentUser)
       });
       return unsubcribe;
    },[auth])

    //User Logout
    const Logout=()=>{
        return signOut(auth)
    }


    const value = {user,signupWithEmail,loginWithEmail,GoogleLogin,GithubLogin,Logout,FacebookLogin};

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
