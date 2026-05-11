// import { Box, Tooltip } from "@mui/material";
// import { groupByDaySessions } from "../utils/analytics";

// export default function Heatmap({ sessions }) {
//   const data = groupByDaySessions(sessions);

//   const days = 365;
//   const cells = [];

//   for (let i = days - 1; i >= 0; i--) {
//     const d = new Date();
//     d.setDate(d.getDate() - i);

//     const key = d.toDateString();
//     const count = data[key] || 0;

//     let color = "#e5f9e7";
//     if (count > 0) color = "#a7f3d0";
//     if (count > 2) color = "#4ade80";
//     if (count > 5) color = "#16a34a";
//     if (count > 8) color = "#166534";

//     cells.push(
//       <Tooltip
//         key={i}
//         title={`${count} full session${count !== 1 ? "s" : ""}`}
//         arrow
//       >
//         <Box
//           sx={{
//             width: 10,
//             height: 10,
//             borderRadius: "2px",
//             bgcolor: color,
//             cursor: "pointer",
//           }}
//         />
//       </Tooltip>
//     );
//   }

//   return (
//     <Box
//       mt={4}
//       sx={{
//         display: "grid",
//         gridAutoFlow: "column",
//         gridTemplateRows: "repeat(7, 10px)",
//         gap: "4px",
//         justifyContent: "center",
//       }}
//     >
//       {cells}
//     </Box>
//   );
// }
import { Box, Tooltip, Typography } from "@mui/material";
import { groupByDaySessions } from "../utils/analytics";

const CELL = 11;
const GAP = 3;

export default function Heatmap({ sessions }) {
  const data = groupByDaySessions(sessions);

  const today = new Date();

  // normalize time
  today.setHours(0, 0, 0, 0);

  // get start date = 52 weeks ago aligned to monday
  const startDate = new Date(today);

  startDate.setDate(today.getDate() - 364);

  const day = startDate.getDay();

  // convert sunday(0) => 6
  const mondayIndex = day === 0 ? 6 : day - 1;

  // move back to monday
  startDate.setDate(startDate.getDate() - mondayIndex);

  const weeks = [];
  let currentWeek = [];

  const cursor = new Date(startDate);

  while (cursor <= today) {
    const date = new Date(cursor);

    const key = date.toDateString();
    const count = data[key] || 0;

    let color = "#ebedf0";

    if (count > 0) color = "#9be9a8";
    if (count > 2) color = "#40c463";
    if (count > 5) color = "#30a14e";
    if (count > 8) color = "#216e39";

    currentWeek.push({
      date,
      count,
      color,
    });

    // sunday ends week
    if (currentWeek.length === 7) {
      weeks.push(currentWeek);
      currentWeek = [];
    }

    cursor.setDate(cursor.getDate() + 1);
  }

  // partial current week
  if (currentWeek.length > 0) {
    while (currentWeek.length < 7) {
      currentWeek.push(null);
    }

    weeks.push(currentWeek);
  }

  // month labels
  const monthLabels = [];

  let prevMonth = "";

  weeks.forEach((week, index) => {
    const firstValid = week.find(Boolean);

    if (!firstValid) return;

    const month = firstValid.date.toLocaleString("default", {
      month: "short",
    });

    if (month !== prevMonth) {
      monthLabels.push({
        month,
        index,
      });

      prevMonth = month;
    }
  });

 return (
 <Box
  sx={{
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }}
>
    {/* Month Labels */}
    <Box
      sx={{
        display: "inline-flex",
        mb: 1,
      }}
    >
      {/* empty space for weekday labels */}
      <Box sx={{ width: 30 }} />

      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridAutoColumns: `${CELL}px`,
          columnGap: `${GAP}px`,
        }}
      >
        {weeks.map((_, i) => {
          const label = monthLabels.find((m) => m.index === i);

          return (
            <Typography
              key={i}
              variant="caption"
              sx={{
                fontSize: 10,
                color: "#777",
                height: 14,
              }}
            >
              {label ? label.month : ""}
            </Typography>
          );
        })}
      </Box>
    </Box>

    {/* Labels + Heatmap */}
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "flex-start",
      }}
    >
      {/* Weekday Labels */}
      <Box
        sx={{
          display: "grid",
          gridTemplateRows: `repeat(7, ${CELL}px)`,
          rowGap: `${GAP}px`,
          mr: 1,
          height: `calc(${7 * CELL}px + ${6 * GAP}px)`,
        }}
      >
        {["Mon", "", "Wed", "", "Fri", "", ""].map((d, i) => (
          <Typography
            key={i}
            variant="caption"
            sx={{
              fontSize: 10,
              lineHeight: `${CELL}px`,
              color: "#777",
              height: `${CELL}px`,
            }}
          >
            {d}
          </Typography>
        ))}
      </Box>

      {/* Heatmap */}
      <Box
        sx={{
          display: "grid",
          gridAutoFlow: "column",
          gridTemplateRows: `repeat(7, ${CELL}px)`,
          gridAutoColumns: `${CELL}px`,
          gap: `${GAP}px`,
        }}
      >
        {weeks.flat().map((cell, idx) => {
          if (!cell) {
            return (
              <Box
                key={idx}
                sx={{
                  width: CELL,
                  height: CELL,
                }}
              />
            );
          }

          return (
            <Tooltip
              key={idx}
              title={`${cell.count} session${
                cell.count !== 1 ? "s" : ""
              } on ${cell.date.toDateString()}`}
            >
              <Box
                sx={{
                  width: CELL,
                  height: CELL,
                  bgcolor: cell.color,
                  borderRadius: "2px",
                  cursor: "pointer",
                }}
              />
            </Tooltip>
          );
        })}
      </Box>
    </Box>
  </Box>
);
}