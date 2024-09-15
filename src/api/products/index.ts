import { Product } from "@/types";
import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//+ This HOOK for GET / Fetching ALL Products
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
//+ GET / FETCH by id
export const useProductById = (id: string) => {
  return useQuery<Product>({
    queryKey: ["products", id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data as Product; // Cast the data to Product
    },
  });
};

//+ hook to CREATE or INSERT ROW in the DB(Changing in DB use Mutation)
export const useInsertProduct = () => {
  // Create a queryClient instance for caching and state management
  const queryClient = useQueryClient();

  // Return a mutation hook for inserting a new product
  return useMutation({
    // mutation function: performs the insert operation in the "products" table
    async mutationFn(data: any) {
      // Insert the product into the "products" table
      const { error, data: newProduct } = await supabase
        .from("products")
        .insert({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .single(); // Insert a single product

      if (error) {
        throw new Error(error.message);
      }
      // Return the newly inserted product data
      return newProduct;
    },
    // onSuccess: after successful mutation, invalidate the "products" query to refresh the data
    async onSuccess() {
      await queryClient.invalidateQueries({ queryKey: ["products"] }); // Updated to use an object with queryKey
    },
    // onError: log any errors that occur during the mutation
    onError(error) {
      console.log(error);
    },
  });
};

//+ hook to UPDATE ROW in the DB(Changing in DB use Mutation)
export const useUpdateProduct = () => {
  // Create a queryClient instance for caching and state management
  const queryClient = useQueryClient();

  // Return a mutation hook for inserting a new product
  return useMutation({
    // mutation function: performs the insert operation in the "products" table
    async mutationFn(data: any) {
      // Insert the product into the "products" table
      const { error, data: updatedProduct } = await supabase
        .from("products")
        .update({
          name: data.name,
          image: data.image,
          price: data.price,
        })
        .eq("id", data.id)
        .single(); // Insert a single product

      if (error) {
        throw new Error(error.message);
      }
      // Return the newly inserted product data
      return updatedProduct;
    },

    // onSuccess: after successful mutation, invalidate the "products" query to refresh the data
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({ queryKey: ["products"] }); // Updated to use an object with queryKey
      await queryClient.invalidateQueries({ queryKey: ["products", id] }); // Updated to use an object with queryKey
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
      await queryClient.invalidateQueries({ queryKey: ["products"] }); // Updated to use an object with queryKey
    },
  });
};
