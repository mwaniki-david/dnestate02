import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetinvoices = () => {
    const query = useQuery({
        queryKey: ["invoice"],
        queryFn: async () => {
            const response = await client.api.invoice.$get();
            if (!response.ok) {
                throw new Error("Failed to invoice");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}