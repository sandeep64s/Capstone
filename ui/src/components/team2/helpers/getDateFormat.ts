export const getDateFormat = (d: any) => {
    return new Date(d).toISOString().substring(0, 10);
  };