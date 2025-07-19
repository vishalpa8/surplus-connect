import AdminLayout from '@/components/layout/AdminLayout';
import { Table, TableRow, TableCell } from '@/components/admin/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

const listings = [
  { id: 1, name: 'Fresh Croissants', vendor: 'Bakery Delights', status: 'Active' },
  { id: 2, name: 'Leftover Pizza Slices', vendor: 'Pizza Planet', status: 'Active' },
  { id: 3, name: 'Fresh Salad Mix', vendor: 'Green Grocer', status: 'Expired' },
];

export default function AdminListingsPage() {
  const headers = ['Name', 'Vendor', 'Status', 'Actions'];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Listings</h1>
          <p className="mt-2 text-gray-600">View or delete food listings.</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Search listings..." className="pl-10 w-full" />
            </div>
        </div>
        <Table headers={headers}>
          {listings.map((listing) => (
            <TableRow key={listing.id}>
              <TableCell>{listing.name}</TableCell>
              <TableCell>{listing.vendor}</TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    listing.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {listing.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="secondary" size="sm">Delete</Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </Table>
      </div>
    </AdminLayout>
  );
}
