import AdminLayout from '@/components/layout/AdminLayout';
import { Table, TableRow, TableCell } from '@/components/admin/Table';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Search } from 'lucide-react';

const users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com', role: 'consumer', status: 'Active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'vendor', status: 'Active' },
  { id: 3, name: 'Peter Jones', email: 'peter.jones@example.com', role: 'ngo', status: 'Blocked' },
];

export default function AdminUsersPage() {
  const headers = ['Name', 'Email', 'Role', 'Status', 'Actions'];

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Manage Users</h1>
          <p className="mt-2 text-gray-600">View, block, or delete users.</p>
        </div>
        <div className="flex items-center justify-between">
            <div className="relative flex-grow max-w-md">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input placeholder="Search users..." className="pl-10 w-full" />
            </div>
        </div>
        <Table headers={headers}>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    user.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {user.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Block</Button>
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
