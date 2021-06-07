import { Avatar } from "@material-ui/core";
import styled from "styled-components";

function Sidebar() {
  return (
    <div>
      <Container>
        <Header>
            <UserAvatar />
        </Header>
      </Container>
    </div>
  );
}

export default Sidebar;

const Container = styled.div``;

const Header = styled.div``;

const UserAvatar = styled(Avatar)`//We import Avatar component from materialUi
margin: 10px;
`; 
