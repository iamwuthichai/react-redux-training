import * as React from "react";
import HeaderLayout from "./HeaderLayout";
import FooterLayout from "./FooterLayout";
import { Box } from "@mui/material";

const IndexLayout = ({ children }) => {
  return (
    <>
      <Box bgcolor={"#efefef"}>
        <HeaderLayout />

        {children}

        <FooterLayout />
      </Box>
    </>
  );
};

export default IndexLayout;
