import '../styles/globals.css'
import { useAuthState } from "react-firebase-hooks"
import { auth, db } from "../firebase"

function MyApp({ Component, pageProps }) {
  const [user] = useAuthState(auth);
//Check user from on root

if(!user) return <Login />

//if no user return to "Login page"

  return <Component {...pageProps} />
}

export default MyApp
