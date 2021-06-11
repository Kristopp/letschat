import React from "react";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import red from '@material-ui/core/colors/red';


function Loading(theme) {

  const primary = red[500]; 
  return (
    <Center>
      <Loadingbar color={primary}></Loadingbar>
    </Center>
  );
}

export default Loading;

const Center = styled.div`
  width: 100%;
  height: 100%;
`;

const Loadingbar = styled(LinearProgress)`
  width: 100%;
  margin-top: 0.2px;
`;
