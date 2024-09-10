import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Order } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "./../../types";
//+ This HOOK for GET / Fetching ALL orders(Admin)
export const useAdminOrderList = ({ archived = false }) => {
  // Optional if you want to make status for the delivery
  // const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase.from("orders").select("*");
      // .in("status", statuses);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//+ This HOOK for GET / Fetching ALL orders(User)
export const useUserOrderList = () => {
  const { session } = useAuth();
  const id = session?.user.id;

  return useQuery({
    queryKey: ["orders", { userId: id }],
    queryFn: async () => {
      if (!id) return null;
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", id);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//+ GET / FETCH by id (Details)
export const useOrderById = (id: string) => {
  return useQuery<Order>({
    queryKey: ["orders", id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from("orders")
          .select("*")
          .eq("id", id)
          .single(); // take first order and return it as object

        return data;
      } catch (error) {
        console.error("useOrderById: error =", error);
        throw new Error(error.message);
      }
    },
  });
};

//+ hook to CREATE or INSERT ROW in the DB(Changing in DB use Mutation)
export const useInsertOrder = () => {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const userId = session?.user.id;

  return useMutation({
    async mutationFn(data: InsertTables<"orders">) {
      const { error, data: newProduct } = await supabase
        .from("orders")
        .insert({ ...data, user_id: userId })
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};
