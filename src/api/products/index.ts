import { supabase } from "@/lib/supabase";
import { useMutation, useQuery } from "@tanstack/react-query";

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

// hook to create or insert ROW in the DB(Changing in DB use Mutation)
export const useInsertProduct = () => {
  return useMutation({
    async mutationFn(data: any) {
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return newProduct;
    },
  });
};
