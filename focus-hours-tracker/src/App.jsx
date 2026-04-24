import { Box, Typography } from "@mui/material";
import Timer from "./components/Timer";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f8fafc",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 420 }}>
        
        {/* Header closer to content */}
        {/* <Typography
          variant="caption"
          sx={{
            display: "block",
            textAlign: "center",
            mb: 1,
            color: "#94a3b8",
            letterSpacing: "0.15em",
          }}
        >
          FOCUS HOURS
        </Typography> */}

        <Timer />
        <Dashboard />
      </Box>
    </Box>
  );
}

export default App;
