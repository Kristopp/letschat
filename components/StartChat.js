import React, { useState } from "react";
import * as EmailValidator from "email-validator";
import { makeStyles } from "@material-ui/core/styles";
import { Input, ThemeProvider } from "@material-ui/core";
import { mainCustomTheme } from "../styles/muiThemes";
import { auth, db } from "../firebase";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";

const useStyles = makeStyles((theme) => ({
  palette: {
    primary: {
      main: "F5882F",
      contrastText: "#6a0dad ",
    },
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

function StartChat(props) {
  const [user] = useAuthState(auth);
  const userChatRef = db
    .collection("chats")
    .where("users", "array-contains", user.email); //firebase-hooks for firebase db ref
  const [chatsSnapshot] = useCollection(userChatRef);
  const [inputValue, setInputValue] = useState("");
  const classes = useStyles();

  const createChat = () => {
    if (!inputValue) return null;
    //we need to see if email is valid and if chat all rdy exists
    if (
      EmailValidator.validate(inputValue) &&
      !chatAllreadyExists(inputValue) &&
      inputValue !== user.email
    ) {
      //and if is we add this chat into 'chat' db collection
      db.collection("chats").add({
        users: [user.email, inputValue],
      }); // create new chat collection into DB
    }
    props.onChange();
  };

  const chatAllreadyExists = (recipientEmail) => {
    //We need to see if chat is all rdy open for that we need refrence
    !!chatsSnapshot.docs.find(
      // it chekcs if the user i try to create chat with is all rdy exists
      (chat) =>
        chat.data().users.find((user) => user === recipientEmail)?.length > 0 //returns boolean
    );
  };
  return (
    <Container>
      <ThemeProvider theme={mainCustomTheme}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment" color="primary">
            Enter user email to start chat
          </InputLabel>
          <PropmtInput
            id="input-with-icon-adornment"
            color="primary"
            startAdornment={
              <InputAdornment position="start">
                <AccountCircle />
              </InputAdornment>
            }
            type="email"
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
          />
        </FormControl>
        <IconContainer>
          <Button onClick={createChat}>
            <AcceptPropmt />
          </Button>
          <Button
            onClick={() => {
              props.onChange(); //I user onChange function to change state from parrent component
            }}
          >
            <ClosePropmt />
          </Button>
        </IconContainer>
      </ThemeProvider>
    </Container>
  );
}

export default StartChat;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-self: center;
  height: 100px;
  margin: 10px;
  width: 350px;
  cursor: pointer;
  padding: 5px;
  word-break: break-word;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const PropmtInput = styled(Input)`
  width: 100%;
`;

const Button = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const ClosePropmt = styled(ClearIcon)``;

const AcceptPropmt = styled(CheckIcon)``;

const IconContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;
