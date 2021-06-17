import useRouter from "next";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipentEmail from "../utils/getRecipentEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { useCollection } from "react-firebase-hooks/firestore";
import { mainCustomTheme } from "../styles/muiThemes";
import { Input, ThemeProvider } from "@material-ui/core";

function Chat({ id, users }) {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipentEmail(users, user);
  const [recipientSnapshot] = useCollection(
    db.collection("users").where("email", "==", getRecipentEmail(users, user))
  ); // we fetch online users data
  const recipient = recipientSnapshot?.docs?.[0];
  /*  console.log(getRecipentEmail(users, user)) */
  const enterChat = () => {
    router.push("/chat/id");
  };

  return (
    <ThemeProvider theme={mainCustomTheme}>
      <Container color="primary">
        {recipient ? (
          <UserAvatar />
        ) : (
          <UserAvatar>{recipientEmail[0]}</UserAvatar>
        )}
        <p>{recipientEmail}</p>
      </Container>
    </ThemeProvider>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  :hover {
    background-color: rgb(245, 136, 47, 0.2);
  }
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
