"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import app from '../firebase';
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
import syncFirestoreToGoogleSheets from '../syncFirestoreToGoogleSheets';

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        router.push("/");
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.error("Error signing out", error.message);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-100">
      {user && (
        <div
          className="p-10 rounded-lg flex flex-col justify-center items-center gap-5 bg-white shadow-lg"
          style={{
            backdropFilter: "blur(20px)",
          }}
        >
          <button
            onClick={syncFirestoreToGoogleSheets}
            className="text-4xl font-bold text-blue-600 text-center mb-4 hover:text-blue-700 transition duration-150 ease-in-out"
          >
            Thank you
          </button>
          <p className="text-3xl text-gray-800 text-center mb-4">
            {user.displayName}
          </p>
          <p className="text-2xl text-gray-600 text-center mb-4">
            You have successfully submitted your form
          </p>
          <button
            onClick={handleLogout}
            className="border border-blue-600 text-blue-600 py-2 px-6 rounded hover:bg-blue-600 hover:text-white transition duration-150 ease-in-out"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}
