import { useState} from "react";
import { Avatar, IconButton, Button } from "@material-ui/core";
import styled from "styled-components";
import Chaticon from "@material-ui/icons/Chat";
import MoreVerticalIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import Chat from "./Chat";
import StartChat from "./StartChat";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { auth, db } from "../firebase";

function Sidebar() {
  const [openPrompt, setOpenPrompt] = useState(false);
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email); //firebase-hooks for firebase db ref
  const [chatsSnapshot] = useCollection(userChatRef);

  return (
    <div>
      <Container>
        <Header>
          <UserAvatar src={user.photoURL} />
          <IconsContainer>
            <IconButton>
              <Chaticon />
              <MoreVerticalIcon />
            </IconButton>
          </IconsContainer>
        </Header>

        <Search>
          <SearchIcon />
          <SearchInput></SearchInput>
        </Search>
        {openPrompt ? (
          <StartChat onChange={(value) => setOpenPrompt(value)} />
        ) : null}
        <StartChatButton
          onClick={() => {
            setOpenPrompt(!openPrompt);
          }}
        >
          Start chat
        </StartChatButton>
        {/* List of users */}
        {chatsSnapshot?.docs.map((chat) => (
          <Chat key={chat.id} id={chat.id} users={chat.data().users} />
        ))}
      </Container>
    </div>
  );
}

export default Sidebar;

const Container = styled.div`
  display: grid;
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const StartChatButton = styled(Button)`
  width: 100%;
  background-color: blue;
`;

const SearchInput = styled.input`
  outline-width: 0; // removes input line
  border: none;
  flex: 1; // we want input use enire with
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 2px solid black;
`;

const UserAvatar = styled(Avatar)`
  //We import Avatar component from materialUi
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
