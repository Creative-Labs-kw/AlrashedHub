import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//+ This HOOK for GET / Fetching ALL Stores
// Hook for GET / Fetching ALL Stores
export const useStoreList = () => {
  return useQuery({
    queryKey: ["stores"],
    queryFn: async () => {
      const { data, error } = await supabase.from("stores" as any).select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//+ GET / FETCH by id
// Hook for GET / Fetching Store by ID
export const useStoreById = (storeId: string) => {
  return useQuery({
    queryKey: ["stores", storeId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("stores")
        .select("*")
        .eq("store_id", storeId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data; // Cast the data to Store
    },
  });
};

// Hook to CREATE or INSERT Store into the DB
export const useInsertStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      store_name: string;
      store_description: string;
      phone_number: string;
      instagram_url?: string;
      delivery_time: string;
      delivery_price: string;
      owner: string;
      store_logo: string;
    }) {
      const { error, data: newStore } = await supabase
        .from("stores")
        .insert({
          store_name: data.store_name,
          store_description: data.store_description,
          phone_number: data.phone_number,
          instagram_url: data.instagram_url,
          delivery_time: data.delivery_time,
          delivery_price: parseFloat(data.delivery_price || "0"), // Convert to number
          owner: data.owner,
          store_logo: data.store_logo,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newStore;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// Hook to UPDATE Store in the DB
export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      store_id: string;
      store_name?: string;
      store_description?: string;
      phone_number?: string;
      instagram_url?: string;
      delivery_time?: string;
      delivery_price?: string;
      owner?: string;
      store_logo?: string;
    }) {
      const { error, data: updatedStore } = await supabase
        .from("stores")
        .update({
          store_name: data.store_name,
          store_description: data.store_description,
          phone_number: data.phone_number,
          instagram_url: data.instagram_url,
          delivery_time: data.delivery_time,
          delivery_price: parseFloat(data.delivery_price || "0"), // Convert to number
          owner: data.owner,
          store_logo: data.store_logo,
        })
        .eq("store_id", data.store_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedStore;
    },
    async onSuccess(_, { store_id }) {
      await queryClient.invalidateQueries({ queryKey: ["stores"] });
      await queryClient.invalidateQueries({ queryKey: ["stores", store_id] });
    },
    onError(error) {
      console.log(error);
    },
  });
};

//+ hook to DELETE ROW in the DB(Changing in DB use Mutation)
// Hook to DELETE Store from the DB
export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(store_id: string) {
      const { error } = await supabase
        .from("stores")
        .delete()
        .eq("store_id", store_id);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};
