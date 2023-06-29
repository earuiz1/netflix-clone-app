import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";

const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        setLoading(false);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  return { currentUser, isLoading };
};

export default useAuth;
