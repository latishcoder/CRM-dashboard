export const getStageColor = (stage) => {
  const colors = {
    New: "bg-blue-100 text-blue-800",
    Qualified: "bg-yellow-100 text-yellow-800",
    Converted: "bg-green-100 text-green-800",
    Lost: "bg-red-100 text-red-800",
  };
  return colors[stage] || "bg-gray-100";
};
