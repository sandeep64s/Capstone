const csvDownload = (attendance: any) => {
  const headers: Array<object> = [];

  Object.keys(attendance[0]).map((key) => {
    let caps = key.replace(/([A-Z])/g, " $1").charAt(0);
    let label = caps.charAt(0).toUpperCase() + caps.slice(1);
    headers.push({
      label: label,
      key: key,
    });
  });

  const report = {
    data: attendance,
    headers: headers,
    filename: "csv_file.csv",
  };

  return report;
};

export default csvDownload;
