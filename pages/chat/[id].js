import Head from "next/head";
import styled from "styled-components";
import Sidebar from "./../../components/Sidebar";
import ChatScreen from "../../components/ChatScreen.js";

function Chat() {
  return (
    <Container>
      <Head>
        <title>TEST CHAT WINDOW</title>
      </Head>
      <Sidebar />
      <ChatContainer>
        <ChatScreen />
      </ChatContainer>
    </Container>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  //create refrence
  const ref = db.collection("chats").doc(context.query.id);
  //Prep the messages on the server
  const messagesRes = await ref
    .collection("messages")
    .order("timestamp", "asc")
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
  //When we ssr server prepairs page before client goes into page
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
