import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetunit = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["unit", { id }], 
        queryFn: async () => {
            const response = await client.api.unit[":id"].$get({
                param: {  id },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch unit");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}