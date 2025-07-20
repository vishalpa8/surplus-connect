'use client';

import { Button } from './Button';
import { Input } from './Input';
import { Checkbox } from './Checkbox';
import { Select } from './Select';

export function Filter() {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border w-full">
      <h3 className="text-lg font-bold mb-4">Filters</h3>
      <div className="space-y-4">
        <Input placeholder="Keyword search..." />
        <Select 
          label="Category"
          options={[
            { value: 'all', label: 'All' },
            { value: 'bakery', label: 'Bakery' },
            { value: 'produce', label: 'Produce' },
            { value: 'meals', label: 'Meals' },
          ]}
        />
        <div>
          <label className="block text-sm font-medium text-gray-700">Distance</label>
          <input type="range" min="1" max="50" className="w-full" />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Dietary</label>
          <Checkbox label="Vegetarian" />
          <Checkbox label="Vegan" />
          <Checkbox label="Gluten-Free" />
        </div>
        <Button className="w-full mt-6">Apply Filters</Button>
      </div>
    </div>
  );
}
