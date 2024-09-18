// api/items
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

// Hook for GET / Fetching All Items
export const useItemList = () => {
  return useQuery({
    queryKey: ["items"],
    queryFn: async () => {
      const { data, error } = await supabase.from("items").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Hook for GET / Fetching Item by ID
export const useItemById = (itemId: string) => {
  return useQuery({
    queryKey: ["items", itemId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("item_id", itemId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data; // Cast the data to Item
    },
  });
};

// Hook to CREATE or INSERT Item into the DB
export const useInsertItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      item_name: string;
      item_description: string;
      item_img: string;
      price: string;
      store_id: string;
      quantity: string;
    }) {
      const { error, data: newItem } = await supabase
        .from("items")
        .insert({
          item_name: data.item_name,
          item_description: data.item_description,
          item_img: data.item_img,
          price: parseFloat(data.price || "0"), // Convert to number
          store_id: data.store_id,
          quantity: parseInt(data.quantity || "0"), // Convert to integer
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newItem;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// Hook to UPDATE Item in the DB
export const useUpdateItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      item_id: string;
      item_name?: string;
      item_description?: string;
      item_img?: string;
      price?: string;
      store_id?: string;
      quantity?: string;
    }) {
      const { error, data: updatedItem } = await supabase
        .from("items")
        .update({
          item_name: data.item_name,
          item_description: data.item_description,
          item_img: data.item_img,
          price: parseFloat(data.price || "0"), // Convert to number
          store_id: data.store_id,
          quantity: parseInt(data.quantity || "0"), // Convert to integer
        })
        .eq("item_id", data.item_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedItem;
    },
    async onSuccess(_, { item_id }) {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
      await queryClient.invalidateQueries({ queryKey: ["items", item_id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// Hook to DELETE Item from the DB
export const useDeleteItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(item_id: string) {
      const { error } = await supabase
        .from("items")
        .delete()
        .eq("item_id", item_id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["items"] });
    },
  });
};

// Hook to GET Items by Store ID
export const useStoreItems = (storeId: string) => {
  return useQuery({
    queryKey: ["storeItems", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("items")
        .select("*")
        .eq("store_id", storeId);
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
