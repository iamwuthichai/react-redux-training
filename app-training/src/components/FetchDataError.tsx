import { Box, Alert } from "@mui/material";

const FetchDataError = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Alert severity="error">Error: Fetch Data.</Alert>
    </Box>
  );
};

export default FetchDataError;
