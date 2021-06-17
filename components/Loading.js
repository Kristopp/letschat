import React from "react";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";
import { mainCustomTheme } from "../styles/muiThemes"


function Loading() {
  return (
    <ThemeProvider theme={mainCustomTheme}>
      <Center>
        <Loadingbar color="primary" style={{ height: "10px" }}></Loadingbar>
        <LoadingText>loading</LoadingText>
      </Center>
    </ThemeProvider>
  );
}

export default Loading;

const Center = styled.div`
  display: grid;
  place-items: center;
  width: 100%;
  height: 100%;
`;

const Loadingbar = styled(LinearProgress)`
  width: 100%;
  margin-top: 0.2px;
`;

const LoadingText = styled.h1``;
