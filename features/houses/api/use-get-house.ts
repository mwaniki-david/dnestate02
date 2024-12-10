import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";

export const  useGetHouse = (id?: string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["house", { id }], 
        queryFn: async () => {
            const response = await client.api.houses[":id"].$get({
                param: {  id },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch house");
            }
            const { data }  = await response.json();
            return data; 
        }
    });

    return query;
}