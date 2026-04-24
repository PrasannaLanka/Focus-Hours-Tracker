const SESSIONS_KEY = "focus_sessions";
const ACTIVE_KEY = "active_session";

export const getSessions = () => {
  return JSON.parse(localStorage.getItem(SESSIONS_KEY)) || [];
};

export const saveSessions = (sessions) => {
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions));
};

export const getActiveSession = () => {
  return JSON.parse(localStorage.getItem(ACTIVE_KEY));
};

export const setActiveSession = (session) => {
  localStorage.setItem(ACTIVE_KEY, JSON.stringify(session));
};

export const clearActiveSession = () => {
  localStorage.removeItem(ACTIVE_KEY);
};
