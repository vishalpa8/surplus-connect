import { Lock } from 'lucide-react';
import clsx from 'clsx';

interface BadgeCardProps {
  icon: React.ReactNode;
  name: string;
  description: string;
  isUnlocked: boolean;
}

export function BadgeCard({ icon, name, description, isUnlocked }: BadgeCardProps) {
  return (
    <div className={clsx(
      "card p-6 text-center flex flex-col items-center justify-center transition-all",
      isUnlocked ? "bg-white" : "bg-gray-100 opacity-60"
    )}>
      <div className={clsx(
        "h-16 w-16 rounded-2xl flex items-center justify-center mb-4",
        isUnlocked ? "bg-primary-100 text-primary-600" : "bg-gray-200 text-gray-500"
      )}>
        {isUnlocked ? icon : <Lock />}
      </div>
      <h3 className="font-bold text-lg text-gray-900">{name}</h3>
      <p className="text-sm text-gray-600 mt-1">{description}</p>
    </div>
  );
}
