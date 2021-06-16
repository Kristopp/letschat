import React from "react";
import * as EmailValidator from "email-validator";
import { makeStyles } from "@material-ui/core/styles";
import { Input, ThemeProvider } from "@material-ui/core";
import { mainCustomTheme } from "../styles/muiThemes"
import { db } from "../firebase";
import styled from "styled-components";
import FormControl from "@material-ui/core/FormControl";
import AccountCircle from "@material-ui/icons/AccountCircle";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";

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

function StartChat({ input }) {
  const classes = useStyles();

  const createChat = () => {
    setOpenPrompt(!openPrompt);
    let input = "";
    /*  const input = prompt("Please enter user email u wish to chat with"); */
    if (!input) return null;
    //we need to see if email is valid and if chat all rdy exists
    if (
      EmailValidator.validate(input) &&
      !chatAllreadyExists(input) &&
      input !== user.email
    ) {
      //and if is we add this chat into 'chat' db collection
      db.collection("chats").add({
        users: [user.email, input],
      }); // create new chat collection into DB
    }
    //check if chat is open all rdy
    const chatAllreadyExists = (recipientEmail) => {
      //We need to see if chat is all rdy open for that we need refrence
      console.log(chatsSnapshot.docs);
      !!chatsSnapshot.docs.find(
        // it chekcs if the user i try to create chat with is all rdy exists
        (chat) =>
          chat.data().users.find((user) => user === recipientEmail)?.length > 0 //returns boolean
      );
    };
  };

  return (
    <Container>
      <ThemeProvider theme={mainCustomTheme}>
        <FormControl className={classes.margin}>
          <InputLabel htmlFor="input-with-icon-adornment" color="pirmary">
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
          />
        </FormControl>
        <IconContainer>
          <AcceptPropmt />
          <ClosePropmt />
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
  height: 110px;
  width: 18%;
  cursor: pointer;
  padding: 15px;
  word-break: break-word;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px,
    rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;
`;

const PropmtInput = styled(Input)`
  width: 100%;
`;

const ClosePropmt = styled(ClearIcon)``;

const AcceptPropmt = styled(CheckIcon)``;

const IconContainer = styled.div`
  display: flex;
  width: 40%;
  justify-content: space-between;
`;
