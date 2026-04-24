import { Button, Typography, Box } from "@mui/material";
import { useFocusTimer } from "../hooks/useFocusTimer";

export default function Timer() {
  const {
    timeLeft,
    isRunning,
    startSession,
    stopSession,
    justCompleted,
  } = useFocusTimer();

  const formatTime = (s) => {
    if (!s) return "30:00";
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 6,
      }}
    >
      <Typography
        variant="h1" 
        sx={{
          fontSize: "64px",
          fontWeight: 600,
          letterSpacing: "-2px",
        }}
      >
        {formatTime(timeLeft)}
      </Typography>

      {/* ✅ Completion message (does not affect layout) */}
      <Box height="20px" mt={1}>
        {justCompleted && (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#16a34a",
            }}
          >
            Session complete ✓
          </Typography>
        )}
      </Box>

      <Box mt={3}>
        {!isRunning ? (
          <Button
            variant="contained"
            onClick={startSession}
            sx={{
              px: 4,
              py: 1.2,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 500,
              boxShadow: "none",
              background: "#111",
              "&:hover": {
                background: "#000",
                boxShadow: "none",
              },
            }}
          >
            Start Focus
          </Button>
        ) : (
          <Button
            variant="outlined"
            onClick={stopSession}
            sx={{
              px: 4,
              py: 1.2,
              marginTop: 2,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 500,
              borderColor: "#e2e8f0",
              color: "#111",
            }}
          >
            Stop
          </Button>
        )}
      </Box>
    </Box>
  );
}
