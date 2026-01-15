import { useEffect, useState } from "react";
import { Users, TrendingUp, BarChart3, DollarSign } from "lucide-react";

const AnalyticsCards = () => {
  const [stats, setStats] = useState({
    total: 0,
    converted: 0,
    qualified: 0,
    revenue: 0,
  });

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE}/api/analytics`)
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(console.error);
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <Card title="Total Leads" value={stats.total} icon={<Users />} />
      <Card title="Converted" value={stats.converted} icon={<TrendingUp />} />
      <Card title="Qualified" value={stats.qualified} icon={<BarChart3 />} />
      <Card
        title="Revenue"
        value={`$${(stats.revenue / 1000).toFixed(0)}K`}
        icon={<DollarSign />}
      />
    </div>
  );
};

const Card = ({ title, value, icon }) => (
  <div className="bg-white rounded-lg shadow p-6 flex justify-between items-center">
    <div>
      <p className="text-sm text-gray-600">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
    <div className="text-blue-500">{icon}</div>
  </div>
);

export default AnalyticsCards;
