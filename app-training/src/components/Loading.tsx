import { CircularProgress, Typography, Box } from "@mui/material";

const Loading = () => {
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
      <CircularProgress />
      <Typography mt={2}>Loading...</Typography>
    </Box>
  );
};

export default Loading;
