import { useAuth } from "@/context/AuthProvider";
import { supabase } from "@/lib/supabase";
import { Order, UpdateTables } from "@/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { InsertTables } from "./../../types";
//+ This HOOK for GET / Fetching ALL orders(Admin)
export const useAdminOrderList = ({ archived = false }) => {
  // Optional if you want to make status for the delivery
  // const statuses = archived ? ["Delivered"] : ["New", "Cooking", "Delivering"];
  return useQuery({
    queryKey: ["orders", { archived }],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false }); // the latest at the top

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
        .eq("user_id", id)
        .order("created_at", { ascending: false }); // the latest at the top
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
          .select("*,order_items(*,products(*))") // choose rows in table so you can take all the data needed for the order details
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
      await queryClient.invalidateQueries(["orders"]);
    },
  });
};

//+ hook to UPDATE ROW in the DB(Changing in DB use Mutation)
export const useUpdateOrder = () => {
  // Create a queryClient instance for caching and state management
  const queryClient = useQueryClient();

  // Return a mutation hook for inserting a new Orders
  return useMutation({
    // mutation function: performs the insert operation in the "Orders" table
    async mutationFn({
      id,
      updateFields,
    }: {
      id: number;
      updateFields: UpdateTables<"orders">;
    }) {
      // Insert the Orders into the "Orders" table
      const { error, data: updatedOrder } = await supabase
        .from("orders")
        .update(updateFields)
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw new Error(error.message);
      }
      // Return the newly inserted Orders data
      return updatedOrder;
    },

    // onSuccess: after successful mutation, invalidate the "Orders" query to refresh the data
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries(["orders"]);
      await queryClient.invalidateQueries(["orders", id]); //update the order
    },
    // onError: log any errors that occur during the mutation
    onError(error) {
      console.log(error);
    },
  });
};

//+ hook to DELETE ROW in the DB(Changing in DB use Mutation)
export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(id: string) {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries(["products"]);
    },
  });
};
