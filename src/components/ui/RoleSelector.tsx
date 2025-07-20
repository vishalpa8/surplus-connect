'use client';

import { Building, Users, ShoppingBasket } from 'lucide-react';

const roles = [
  { id: 'consumer', name: 'Consumer', description: 'I want to find and rescue food.', icon: ShoppingBasket },
  { id: 'vendor', name: 'Vendor', description: 'I want to list surplus food.', icon: Building },
  { id: 'ngo', name: 'NGO', description: 'We are a non-profit organization.', icon: Users },
];

interface RoleSelectorProps {
  selectedRole: string;
  setSelectedRole: (role: string) => void;
}

export function RoleSelector({ selectedRole, setSelectedRole }: RoleSelectorProps) {
  return (
    <div>
      <label className="form-label">I am a...</label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
        {roles.map((role) => (
          <div
            key={role.id}
            onClick={() => setSelectedRole(role.id)}
            className={`
              p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md
              ${selectedRole === role.id 
                ? 'bg-primary-50 border-primary-500 ring-2 ring-primary-500 shadow-md' 
                : 'bg-white hover:bg-gray-50 hover:border-gray-300 border-gray-200'}
            `}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className={`p-2 rounded-lg ${selectedRole === role.id ? 'bg-primary-100' : 'bg-gray-100'}`}>
                <role.icon className={`h-5 w-5 ${selectedRole === role.id ? 'text-primary-600' : 'text-gray-600'}`} />
              </div>
              <h3 className="font-bold text-gray-900 text-base">{role.name}</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">{role.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}