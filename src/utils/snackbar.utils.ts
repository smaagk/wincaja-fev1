export const setStatusAlert = (msg: string, severity: string) => {
  return { msg, severity, date: new Date() };
};
