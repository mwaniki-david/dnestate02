"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetPayments } from "@/features/payments/hooks/useGetPayments";

interface Tenant {
  id: string;
  name: string;
  paid: boolean;
  amount: number;
  dueDate: string;
}

const PaymentsPage = () => {
  const { data, isLoading } = useGetPayments();  // Custom hook to get payment data
  const [filteredTenants, setFilteredTenants] = useState<Tenant[]>([]);
  const [filter, setFilter] = useState<'all' | 'paid' | 'unpaid'>('all');

  // Filter the tenants based on the payment status
  useEffect(() => {
    if (data) {
      let tenants = data;
      if (filter === 'paid') {
        tenants = tenants.filter((tenant) => tenant.paid);
      } else if (filter === 'unpaid') {
        tenants = tenants.filter((tenant) => !tenant.paid);
      }
      setFilteredTenants(tenants);
    }
  }, [data, filter]);

  if (isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Skeleton className="h-6 w-6 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex justify-between items-center">
          <CardTitle className="text-xl">Tenant Payments</CardTitle>
          <div>
            <Button onClick={() => setFilter('all')} className="mr-2">All</Button>
            <Button onClick={() => setFilter('paid')} className="mr-2">Paid</Button>
            <Button onClick={() => setFilter('unpaid')}>Unpaid</Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTenants.map((tenant) => (
              <div key={tenant.id} className="flex justify-between items-center py-2 border-b">
                <div className="text-lg">{tenant.name}</div>
                <div className={`text-sm ${tenant.paid ? 'text-green-500' : 'text-red-500'}`}>
                  {tenant.paid ? 'Paid' : 'Unpaid'}
                </div>
                <div className="text-sm">${tenant.amount}</div>
                <div className="text-xs text-gray-500">{tenant.dueDate}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentsPage;
