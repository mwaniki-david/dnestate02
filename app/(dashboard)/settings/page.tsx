"use client";
import { UseNewTenant } from "@/features/accounts/hooks/use-new-tenant";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/data-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { useGetTenants } from "@/features/accounts/api/use-get-tenants";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTenants } from "@/features/accounts/api/use-bulk-delete";

const TenantPage = () => {
  const newTenant = UseNewTenant();
  const deleteTenants = useBulkDeleteTenants();
  const tenantQuery = useGetTenants();
  const tenants = tenantQuery.data || [];

  const isDisabled = tenantQuery.isLoading || deleteTenants.isPending;

  if (tenantQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Tenants list</CardTitle>
          <Button onClick={newTenant.onOpen} size="sm">
            <Plus className="size-4 mr-2" />
            Add new
          </Button>
        </CardHeader>
        <CardContent>
          <DataTable
            filterKey="name"
            onDelete={(row) => {
              const ids = row.map((r) =>r.original.id);
              deleteTenants.mutate({ ids });
            }}
            columns={columns}
            data={tenants}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default TenantPage;
