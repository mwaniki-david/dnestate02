import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { inserInvoiceSchema } from "@/db/schema";
import { z } from "zod";
import { UseNewInvoice } from "../hooks/use-new-invoice";
import { useCreatinvoice } from "../api/use-create-invoice";
import { InvoiceForm } from "./invoice-form";
const formSchema = inserInvoiceSchema.pick({
    customerName: true,
    amount: true,
    dueDate: true,
    status: true,
});

type FormValues = z.input<typeof formSchema>;


export const NewInvoiceSheet = () => {
    const { isOpen, onClose } = UseNewInvoice();
    const mutation = useCreatinvoice();
    


    const onSubmit = (values: FormValues) => {
        mutation.mutate(values, {
            onSuccess: () => {
                onClose();
            }
        
        });
    };


    return (
        <Sheet open={isOpen} onOpenChange={onClose}>
            <SheetContent  className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New invoice
                    </SheetTitle>
                    <SheetDescription>
                        cerate a invoice to track each transactions.
                    </SheetDescription>
                </SheetHeader>
                <InvoiceForm 
                onSubmit={onSubmit} 
                disabled={mutation.isPending}
                defaultValues={{
                    customerName:"",
                    amount:"",
                    dueDate: new Date().toISOString().split("T")[0], // Default to current date
                    status:"",
                }}
                />
            </SheetContent>
        </Sheet>
    )
}