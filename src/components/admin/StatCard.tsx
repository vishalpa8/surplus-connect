interface StatCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'increase' | 'decrease';
  icon: React.ReactNode;
}

export function StatCard({ title, value, change, changeType, icon }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-soft">
      <div className="flex items-center justify-between">
        <div className="text-gray-500">{title}</div>
        <div className="text-primary-600">{icon}</div>
      </div>
      <div className="mt-2 text-3xl font-bold">{value}</div>
      {change && (
        <div className={`mt-1 text-sm ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
          {change} vs last month
        </div>
      )}
    </div>
  );
}
