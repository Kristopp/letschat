import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import getRecipentEmail from "../utils/getRecipentEmail";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";

function Chat({ id, users }) {
  const [user] = useAuthState(auth);
  const somethingSomeyhing = getRecipentEmail(users, user);
  const [recipientSnapshot] = useCollection(db.collection('users').where('email', '==', getRecipentEmail(users, user)))

  console.log(users, user)
 /*  console.log(getRecipentEmail(users, user)) */
  return (
    <Container>
      <UserAvatar />
      <p>{somethingSomeyhing}</p>
    </Container>
  );
}

export default Chat;

const Container = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
`;

const UserAvatar = styled(Avatar)`
  margin: 5px;
  margin-right: 15px;
`;
