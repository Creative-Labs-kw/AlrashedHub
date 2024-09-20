import { supabase } from "@/lib/supabase";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

//+ This HOOK for GET / Fetching ALL Family Notifications
// Hook for GET / Fetching ALL Family Notifications
export const useFamilyNotificationList = () => {
  return useQuery({
    queryKey: ["family_notifications"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("family_notifications")
        .select("*");
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

//+ GET / FETCH by id
// Hook for GET / Fetching Family Notification by ID
export const useFamilyNotificationById = (notificationId: string) => {
  return useQuery({
    queryKey: ["family_notifications", notificationId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("family_notifications")
        .select("*")
        .eq("id", notificationId)
        .single();
      if (error) {
        throw new Error(error.message);
      }
      return data;
    },
  });
};

// Hook to CREATE or INSERT Family Notification into the DB
export const useInsertFamilyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      user_id: string;
      message: string;
      timestamp: string;
      read: boolean;
      description: string;
      reaction?: string;
    }) {
      const { error, data: newNotification } = await supabase
        .from("family_notifications")
        .insert({
          user_id: data.user_id,
          message: data.message,
          timestamp: data.timestamp,
          read: data.read,
          description: data.description,
          reaction: data.reaction,
        })
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return newNotification;
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["family_notifications"],
      });
    },
    onError(error) {
      console.log(error);
    },
  });
};

// Hook to UPDATE Family Notification in the DB
export const useUpdateFamilyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(data: {
      id: string;
      user_id?: string;
      message?: string;
      timestamp?: string;
      read?: boolean;
      description?: string;
      reaction?: string;
    }) {
      const { error, data: updatedNotification } = await supabase
        .from("family_notifications")
        .update({
          user_id: data.user_id,
          message: data.message,
          timestamp: data.timestamp,
          read: data.read,
          description: data.description,
          reaction: data.reaction,
        })
        .eq("id", data.id)
        .single();

      if (error) {
        throw new Error(error.message);
      }
      return updatedNotification;
    },
    async onSuccess(_, { id }) {
      await queryClient.invalidateQueries({
        queryKey: ["family_notifications"],
      });
      await queryClient.invalidateQueries({
        queryKey: ["family_notifications", id],
      });
    },
    onError(error) {
      console.log(error);
    },
  });
};

//+ hook to DELETE ROW in the DB(Changing in DB use Mutation)
// Hook to DELETE Family Notification from the DB
export const useDeleteFamilyNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(notificationId: string) {
      const { error } = await supabase
        .from("family_notifications")
        .delete()
        .eq("id", notificationId);
      if (error) {
        throw new Error(error.message);
      }
    },
    async onSuccess() {
      await queryClient.invalidateQueries({
        queryKey: ["family_notifications"],
      });
    },
  });
};
