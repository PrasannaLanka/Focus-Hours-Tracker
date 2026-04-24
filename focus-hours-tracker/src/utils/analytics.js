export const groupByDaySessions = (sessions) => {
  const map = {};

  sessions.forEach((s) => {
    const key = new Date(s.startTime).toDateString();

    // ✅ ONLY count full sessions
    if (s.actualMinutes >= s.plannedDuration) {
      map[key] = (map[key] || 0) + 1;
    }
  });

  return map;
};

export const getTodayStats = (sessions) => {
  const today = new Date().toDateString();

  let totalMinutes = 0;
  let totalSessions = 0;
  let fullSessions = 0;

  sessions.forEach((s) => {
    if (new Date(s.startTime).toDateString() === today) {
      totalMinutes += s.actualMinutes;
      totalSessions += 1;

      if (s.actualMinutes >= s.plannedDuration) {
        fullSessions += 1;
      }
    }
  });

  return {
    minutes: totalMinutes,
    hours: (totalMinutes / 60).toFixed(1),
    sessions: totalSessions,
    fullSessions,
  };
};
