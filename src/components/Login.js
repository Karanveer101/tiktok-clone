import React from 'react';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithRedirect,
  getRedirectResult,
} from 'firebase/auth';
import { doc, getFirestore, setDoc, getDoc } from 'firebase/firestore';
import { app } from './Firebase';

function Login(props) {
  const { setIsSignIn, setSignInPopUp } = props;
  const provider = new GoogleAuthProvider();
  const db = getFirestore(app);

  const auth = getAuth();
  signInWithRedirect(auth, provider);
  getRedirectResult(auth)
    .then(async (result) => {
      console.log(result);
      const currentUser = auth.currentUser.uid;
      const docRef = doc(db, 'users', `${currentUser}`);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setIsSignIn(true);
        setSignInPopUp(false);
      } else {
        setDoc(
          doc(db, 'users', `${currentUser}`),
          {
            name: `${result.user.displayName}`,
            photoURL: `${result.user.photoURL}`,
            videos: [],
          },
          { merge: true }
        );
        // ...
        console.log(result.user);
        setIsSignIn(true);
        setSignInPopUp(false);
      }
    })
    .catch((error) => {
      console.log(error.message);
    });

  return <div></div>;
}

export default Login;
