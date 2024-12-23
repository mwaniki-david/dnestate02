import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { client } from "@/lib/hono";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.invoice["bulk-delete"] ["$post"]>;
type RequestType = InferRequestType<typeof client.api.invoice["bulk-delete"] ["$post"]>["json"];

export const UseBulkDeleteinvoice = () => {
    const QueryClient = useQueryClient();
    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.invoice["bulk-delete"] ["$post"]({ json });
            return await response.json();
        },
        onSuccess: () => {
            toast.success("invoice deleted")
            QueryClient.invalidateQueries({ queryKey: ["invoice"]  });
        },
        onError: () => {
            toast.error("Failed to delete invoice")
        }
    })
    return mutation;
}