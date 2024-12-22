"use client";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useDeleteinvoice } from "@/features/billing/api/use-delete-invoice";
import { UseOpenInvoice } from "@/features/billing/hooks/use-open-invoice";
import { useConfirm } from "@/hooks/use-confirm";
import { Edit, MoreHorizontal, Trash } from "lucide-react";

type Props = {
    id: string;
};

export const Actions = ( { id }: Props) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this buildingowner."
    );
    const deleteMutation =useDeleteinvoice(id);
    const { onOpen } = UseOpenInvoice();

    const handleDelete = async () => {
        const ok = await confirm();

        if (ok) {
            deleteMutation.mutate();
        }
    };
    return (
        <>
        <ConfirmDialog/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="size-8 p-0">
                    <MoreHorizontal className="size-4"/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem
                disabled={deleteMutation.isPending}
                onClick={() => onOpen(id)}
                >
                    <Edit className="size-4 mr-2" />
                    Edit

                </DropdownMenuItem>
                <DropdownMenuItem
                disabled={deleteMutation.isPending}
                onClick={handleDelete}
                >
                    <Trash className="size-4 mr-2" />
                    Delete

                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    )
}