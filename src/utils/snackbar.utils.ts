export interface StatusAlert {
  msg?: string;
  severity?: string;
  date?: Date;
} 
export const setStatusAlert = (msg: string, severity: string) => {
  return { msg, severity, date: new Date() };
};
