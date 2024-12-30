"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const recentActivity = [
  {
    id: 1,
    type: "Message Sent",
    recipient: "John Doe",
    date: "2024-03-20",
    status: "Delivered",
  },
  {
    id: 2,
    type: "Call",
    recipient: "Jane Smith",
    date: "2024-03-19",
    status: "Completed",
  },
  {
    id: 3,
    type: "Message Received",
    recipient: "Alice Johnson",
    date: "2024-03-19",
    status: "Read",
  },
];

export function RecentActivity() {
  return (
    <div className="w-full bg-card p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Informações dos Cliques</h3>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentActivity.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>{activity.type}</TableCell>
                <TableCell>{activity.recipient}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>{activity.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}