import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading";
import { useEffect } from "react";
import firebase from "firebase"
function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    console.log(user)
    if (user) {
      db.collection("users").doc(user.uid).set(
        {
          email: user.email,
          lastOnline: firebase.firestore.FieldValue.serverTimestamp(),
          photoURL: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]); //When user is logged in information above will be updated
  //Check user from on root
  if (loading) return <Loading />; //Force the loading state until Auth complited
  if (!user) return <Login />;

  //if no user return to "Login page"

  return <Component {...pageProps} />;
}

export default MyApp;
