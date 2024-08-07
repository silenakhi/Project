"use client"
import { useState,useEffect } from "react"
import app from "./firebase"
import {getAuth} from "firebase/auth"
import { useRouter } from "next/navigation"
import { signInWithPopup,GoogleAuthProvider,FacebookAuthProvider } from "firebase/auth"
import Survey from "./survey/page"
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";



const login = ()=>{
    const [user, setUser] = useState(null)
    const router = useRouter()

    useEffect(()=>{
        const auth = getAuth(app)
      const unsubscribe = auth.onAuthStateChanged((user)=>{
            if(user){
                setUser(user)
            }else{
                setUser(null)
            }

        })
        return () => unsubscribe()
    },[])

    const signInWithGoogle = async ()=>{
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        try{
            await signInWithPopup(auth,provider)
            router.push("/survey")

        }catch(error){
            console.error("Error signing in with Google",error.message)
        }
    }

    const signInWithFacebook = async ()=>{
        const provider = new FacebookAuthProvider()
        
        const auth = getAuth(app)
        try{
            await signInWithPopup(auth,provider)
            router.push("/survey")

        }catch(error){
            console.error("Error signing in with Facebook",error.message)
        }
    }

    const signIn = async ()=>{
        try{
            router.push("/survey")
                    }
        catch(error){
            console.error("Error signing in with Facebook",error.message)
        }    
    }
    
    return (
      <div className="flex flex-col md:flex-row h-screen">
        <div className="flex flex-col justify-center items-center w-full bg-gray-100 p-6 md:p-12 shadow-lg">
          {user ? (
            <Survey />
          ) : (
            <div className="flex flex-col justify-center items-center gap-6 w-full max-w-md mx-auto">
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
                <span className="text-blue-600">Sign In, now!</span>
              </h1>
              <div className="flex flex-col gap-4 w-full">
                <button
                  onClick={signInWithGoogle}
                  className="flex gap-3 justify-center items-center bg-blue-400 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 py-3 px-5 rounded-full transition duration-150 ease-in-out"
                >
                  <FcGoogle className="text-2xl" />
                  <span className="text-lg font-medium">
                    Sign in with Google
                  </span>
                </button>
                <button
                  //onClick={signInWithFacebook}
                  className="flex gap-3 justify-center items-center bg-blue-700 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 py-3 px-5 rounded-full transition duration-150 ease-in-out"
                >
                  <FaFacebook className="text-2xl" />
                  <span className="text-lg font-medium">
                    Sign in with Facebook
                  </span>
                </button>
                <button
                  //onClick={signIn}
                  className="flex gap-3 justify-center items-center bg-blue-900 text-white hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 py-3 px-5 rounded-full transition duration-150 ease-in-out"
                >
                  <span className="text-lg font-medium">
                    Sign In
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
}
export default login;
