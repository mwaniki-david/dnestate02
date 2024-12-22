import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { insertInvoiceSchema } from "@/db/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";

const formSchema = insertInvoiceSchema.pick({
  customerName: true,
  amount: true,
  dueDate: true,
  status: true,
});

type FormValues = z.input<typeof formSchema>;

type Props = {
  id?: string;
  defaultValues?: FormValues;
  onSubmit: (values: FormValues) => void;
  onDelete?: () => void;
  disabled?: boolean;
};

export const InvoiceForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  };

  const handleDelete = () => {
    onDelete?.();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="pt-4 space-y-4"
      >
        <div className="flex gap-4 ">
          <FormField
            name="customerName"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>customerName</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g  card mwangi"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            name="amount"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>amount</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="e.g 10,000 ksh"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4 ">
          <FormField
            name="status"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>status</FormLabel>
                <FormControl>
                  <Input
                    disabled={disabled}
                    placeholder="occupied"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        
        </div>
        <Button className="w-full" disabled={disabled}>
          {id ? "save changes" : "create invoice account"}
        </Button>
        {!!id && (
          <Button
            type="button"
            disabled={disabled}
            onClick={handleDelete}
            className="w-full"
            variant="outline"
          >
            <Trash className="size-4 mr-2" />
            Delete invoice
          </Button>
        )}
      </form>
    </Form>
  );
};
