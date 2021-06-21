import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";

function ChatScreen({ chat, messages }) {
  const [user] = useAuthState(auth);
  return (
    <Container>
      <Header>
        <Avatar />
      </Header>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Header = styled.div``;

const HeaderInfo = styled.div``;
