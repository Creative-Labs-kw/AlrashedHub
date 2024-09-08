import { supabase } from "@/lib/supabase";
import { useQuery } from "@tanstack/react-query";

// This HOOK for Fetching ALL Products
export const useProductList = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const { data, error } = await supabase.from("products").select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
// get by id
export const useProductById = (productId: string | string[]) => {
  return useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", productId)
        .single(); // take first product and return it as object
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};
