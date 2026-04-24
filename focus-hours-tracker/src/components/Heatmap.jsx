import { Box, Tooltip } from "@mui/material";
import { groupByDaySessions } from "../utils/analytics";

export default function Heatmap({ sessions }) {
  const data = groupByDaySessions(sessions);

  const days = 365;
  const cells = [];

  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);

    const key = d.toDateString();
    const count = data[key] || 0;

    let color = "#e5f9e7";
    if (count > 0) color = "#a7f3d0";
    if (count > 2) color = "#4ade80";
    if (count > 5) color = "#16a34a";
    if (count > 8) color = "#166534";

    cells.push(
      <Tooltip
        key={i}
        title={`${count} full session${count !== 1 ? "s" : ""}`}
        arrow
      >
        <Box
          sx={{
            width: 10,
            height: 10,
            borderRadius: "2px",
            bgcolor: color,
            cursor: "pointer",
          }}
        />
      </Tooltip>
    );
  }

  return (
    <Box
      mt={4}
      sx={{
        display: "grid",
        gridAutoFlow: "column",
        gridTemplateRows: "repeat(7, 10px)",
        gap: "4px",
        justifyContent: "center",
      }}
    >
      {cells}
    </Box>
  );
}
