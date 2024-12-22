import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Tenant {
  id: string;
  name: string;
  paid: boolean;
  amount: number;
  dueDate: string;
}

export const useGetPayments = () => {
  return useQuery<Tenant[], Error>({
    queryKey: ["payments"], // The query key as an array
    queryFn: async () => {
      const response = await axios.get("/api/payments");
      return response.data.data;
    },
  });
};

