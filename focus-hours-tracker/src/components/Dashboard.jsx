import { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { getSessions } from "../utils/storage";
import { getTodayStats } from "../utils/analytics";
import Heatmap from "./Heatmap";

export default function Dashboard() {
  const [sessions, setSessions] = useState([]);

  const load = () => setSessions(getSessions());

  useEffect(() => {
    load();
    window.addEventListener("focus", load);
    return () => window.removeEventListener("focus", load);
  }, []);

  const today = getTodayStats(sessions);

  return (
    <Box mt={4}>
      
      {/* ---------- TODAY SECTION ---------- */}
      <Typography
        sx={{
          fontSize: "12px",
          color: "#94a3b8",
          letterSpacing: "0.12em",
          mb: 1.5,
          textTransform: "uppercase",
        }}
      >
        Today
      </Typography>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          px: 2,
          py: 2,
          borderRadius: 3,
          background: "#fff",
          border: "1px solid #e2e8f0",
        }}
      >
        <Stat label="Minutes" value={`${today.minutes}m`} />
        <Stat label="Hours" value={`${today.hours}h`} />
        <Stat label="Sessions" value={today.sessions} />
        <Stat label="Full" value={today.fullSessions} />
      </Box>

      {/* ---------- HEATMAP SECTION ---------- */}
      <Box mt={5}>
        <Typography
          sx={{
            fontSize: "12px",
            color: "#94a3b8",
            letterSpacing: "0.12em",
            paddingTop : 2,
            mb: 2,
            textTransform: "uppercase",
          }}
        >
         Last 365 Days
        </Typography>

        <Heatmap sessions={sessions} />
      </Box>
    </Box>
  );
}

/* ---------- components ---------- */

function Stat({ label, value }) {
  return (
    <Box textAlign="center" flex={1}>
      <Typography fontWeight={600}>{value}</Typography>
      <Typography fontSize="11px" color="#94a3b8">
        {label}
      </Typography>
    </Box>
  );
}
