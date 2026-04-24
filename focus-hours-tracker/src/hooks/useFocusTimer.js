import { useEffect, useState } from "react";
import {
  getSessions,
  saveSessions,
  getActiveSession,
  setActiveSession,
  clearActiveSession,
} from "../utils/storage";

export function useFocusTimer() {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [plannedDuration, setPlannedDuration] = useState(30);
  const [justCompleted, setJustCompleted] = useState(false);

  useEffect(() => {
    const active = getActiveSession();
    if (active) resumeSession(active);
  }, []);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          completeSession();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning]);

  const startSession = () => {
    const startTime = Date.now();
    setActiveSession({ startTime, plannedDuration });
    setTimeLeft(plannedDuration * 60);
    setIsRunning(true);
    setJustCompleted(false);
  };

  const resumeSession = ({ startTime, plannedDuration }) => {
    const elapsed = (Date.now() - startTime) / 1000;
    const remaining = plannedDuration * 60 - elapsed;

    if (remaining <= 0) {
      saveSession(startTime);
    } else {
      setTimeLeft(remaining);
      setPlannedDuration(plannedDuration);
      setIsRunning(true);
    }
  };

  const stopSession = () => {
    const active = getActiveSession();
    if (!active) return;
    saveSession(active.startTime);
  };

  const completeSession = () => {
    const active = getActiveSession();
    if (!active) return;
    saveSession(active.startTime);
  };

  const saveSession = (startTime) => {
    const endTime = Date.now();
    const actualMinutes = Math.round((endTime - startTime) / 60000);

    if (actualMinutes < 1) {
      clearActiveSession();
      setIsRunning(false);
      setTimeLeft(0);
      return;
    }

    const sessions = getSessions();

    sessions.push({
      id: crypto.randomUUID(),
      startTime,
      endTime,
      actualMinutes,
      plannedDuration,
    });

    saveSessions(sessions);
    clearActiveSession();

    setIsRunning(false);
    setTimeLeft(0);

    // ✅ trigger UI update
    window.dispatchEvent(new Event("sessionsUpdated"));

    // ✅ show completion message
    setJustCompleted(true);

    setTimeout(() => {
      setJustCompleted(false);
    }, 2000);
  };

  return {
    timeLeft,
    isRunning,
    plannedDuration,
    setPlannedDuration,
    startSession,
    stopSession,
    justCompleted,
  };
}
