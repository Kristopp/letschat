import "../styles/globals.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import Login from "./login";
import Loading from "../components/Loading"

function MyApp({ Component, pageProps }) {
  const [user, loading] = useAuthState(auth);
  //Check user from on root
  if (loading) return <Loading />; //Force the loading state until Auth complited
  if (!user) return <Login />;

  //if no user return to "Login page"

  return <Component {...pageProps} />;
}

export default MyApp;
