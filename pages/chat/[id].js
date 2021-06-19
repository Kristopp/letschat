import Head from "next/head";
import styled from "styled-components";
import Sidebar from "./../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen.js";
import { auth, db } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import getRecipentEmail from "./../../utils/getRecipentEmail";

function Chat({ chat, messages }) {
  const [user] = useAuthState(auth);

  return (
    <Container>
      <Head>
        <title>Chating with {getRecipentEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export default Chat;
// all this magic will happen on the server before we even see the page
export async function getServerSideProps(context) {
  //create refrence
  const ref = db.collection("chats").doc(context.query.id);
  //Prep the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .orderBy("timestamp", "asc")
    .get();

  //map throug messages array
  const messages = messagesRes.docs
    .map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map((messages) => ({
      messages,
      timestamp: messages.timestamp.toDate().getTime(),
    })); //when u send data from back to frond end u lose timestamp // datatype
  //Prep chats
  const chatRes = await ref.get();
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  console.log(chat, messages);
  //When we ssr server prepairs page before client goes into page
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}

const Container = styled.div`
  display: flex;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow: scroll;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;
`;
