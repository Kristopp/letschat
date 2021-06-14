import styled from "styled-components";
import { Avatar } from "@material-ui/core"

function Chat({ id, users }) {
  return (
    <Container>
      <UserAvatar />
      recipent email
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

const UserAvatar = styled(Avatar)``;
