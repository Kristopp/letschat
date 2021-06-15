import React from "react";

function StartChat({ input }) {

    const createChat = () => {
        setOpenPrompt(!openPrompt);
         let input = ""
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
    <div>
      Hello start chat
    </div>
  );
}

export default StartChat;
