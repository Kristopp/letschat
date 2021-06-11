import React from "react";
import styled from "styled-components";
import LinearProgress from "@material-ui/core/LinearProgress";
import { ThemeProvider, createMuiTheme } from "@material-ui/core";

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: "#F5BD1F",
      contrastText: "#6a0dad ",
    },
  },
});

function Loading() {
  return (
    <ThemeProvider theme={customTheme}>
      <Center>
        <Loadingbar color="primary"></Loadingbar>
      </Center>
    </ThemeProvider>
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
