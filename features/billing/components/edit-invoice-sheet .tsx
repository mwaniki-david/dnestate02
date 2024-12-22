import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { insertInvoiceSchema, invoice } from "@/db/schema";
import { z } from "zod";
import { useGetinvoice } from "../api/use-get-invoice";
import { Loader2 } from "lucide-react";
import {  useDeleteinvoice } from "../api/use-delete-invoice";
import { useConfirm } from "@/hooks/use-confirm";
import { UseOpenInvoice } from "../hooks/use-open-invoice";
import { InvoiceForm } from "./invoice-form";
import { useEditinvoice } from "../api/use-edit-invoice";

const invoiceSchema = insertInvoiceSchema.pick({

  customerName: true,
  amount: true,
  dueDate: true,
  status: true,
});

type FormValues = z.input<typeof invoiceSchema>;

export const EditinvoiceSheet = () => {
  const { isOpen, onClose, id } = UseOpenInvoice();
  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete invoice"
  );

  const invoiceQuery = useGetinvoice(id);
  const editMutation = useEditinvoice(id);
  const deleteMutation = useDeleteinvoice(id);

  const isPending = editMutation.isPending || deleteMutation.isPending;

  const isLoading = invoiceQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
        deleteMutation.mutate(undefined, {
            onSuccess: () => {
                onClose();
            }
        })
    }
  };

  const defaultValues = invoiceQuery.data
    ? {
        customerName: invoice.customerName,
        amount: invoice.amount,
        dueDate: invoice.dueDate,
        status: invoice.status,
      }
    : {
        customerName: "",
        amount: "",
        dueDate: "",
        status: "",
      };

  return (
    <>
    <ConfirmDialog/>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit invoice</SheetTitle>
            <SheetDescription>
              edit invoice to track each transactions.
            </SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute insert-0 flex item-center justify-center">
              <Loader2 className="size-4 text-muted-foreground animate-spin" />
            </div>
          ) : (
            <InvoiceForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              defaultValues={defaultValues}
              onDelete={onDelete}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
