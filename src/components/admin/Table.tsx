interface TableProps {
  headers: string[];
  children: React.ReactNode;
}

export function Table({ headers, children }: TableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full bg-white rounded-2xl shadow-soft-lg">
        <thead className="bg-gray-50">
          <tr>
            {headers.map((header) => (
              <th key={header} scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {children}
        </tbody>
      </table>
    </div>
  );
}

interface TableRowProps {
    children: React.ReactNode;
}

export function TableRow({ children }: TableRowProps) {
    return <tr>{children}</tr>;
}

interface TableCellProps {
    children: React.ReactNode;
    className?: string;
}

export function TableCell({ children, className }: TableCellProps) {
    return <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${className}`}>{children}</td>;
}
