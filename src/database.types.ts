export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      cart: {
        Row: {
          cart_id: string
          created_at: string | null
          total_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          cart_id?: string
          created_at?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          cart_id?: string
          created_at?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      cart_items: {
        Row: {
          cart_id: string | null
          cart_item_id: string
          created_at: string | null
          item_id: string | null
          price: number
          quantity: number | null
          updated_at: string | null
        }
        Insert: {
          cart_id?: string | null
          cart_item_id?: string
          created_at?: string | null
          item_id?: string | null
          price: number
          quantity?: number | null
          updated_at?: string | null
        }
        Update: {
          cart_id?: string | null
          cart_item_id?: string
          created_at?: string | null
          item_id?: string | null
          price?: number
          quantity?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "cart_items_cart_id_fkey"
            columns: ["cart_id"]
            isOneToOne: false
            referencedRelation: "cart"
            referencedColumns: ["cart_id"]
          },
          {
            foreignKeyName: "cart_items_item_id_fkey"
            columns: ["item_id"]
            isOneToOne: false
            referencedRelation: "items"
            referencedColumns: ["item_id"]
          },
        ]
      }
      family_notifications: {
        Row: {
          description: string | null
          message: string
          notification_id: string
          reaction: string | null
          read: boolean | null
          timestamp: string | null
          user_id: string | null
        }
        Insert: {
          description?: string | null
          message: string
          notification_id?: string
          reaction?: string | null
          read?: boolean | null
          timestamp?: string | null
          user_id?: string | null
        }
        Update: {
          description?: string | null
          message?: string
          notification_id?: string
          reaction?: string | null
          read?: boolean | null
          timestamp?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "family_notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      items: {
        Row: {
          created_at: string | null
          item_description: string | null
          item_id: string
          item_img: string | null
          item_name: string
          price: number
          quantity: number | null
          store_id: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          item_description?: string | null
          item_id?: string
          item_img?: string | null
          item_name: string
          price: number
          quantity?: number | null
          store_id?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          item_description?: string | null
          item_id?: string
          item_img?: string | null
          item_name?: string
          price?: number
          quantity?: number | null
          store_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "items_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["store_id"]
          },
        ]
      }
      orders: {
        Row: {
          created_at: string | null
          order_id: string
          status: string | null
          store_id: string | null
          total_price: number | null
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          order_id?: string
          status?: string | null
          store_id?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          order_id?: string
          status?: string | null
          store_id?: string | null
          total_price?: number | null
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "orders_store_id_fkey"
            columns: ["store_id"]
            isOneToOne: false
            referencedRelation: "stores"
            referencedColumns: ["store_id"]
          },
          {
            foreignKeyName: "orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          age: number | null
          avatar_url: string | null
          email: string | null
          expo_push_token: string | null
          full_name: string | null
          group: string | null
          id: string
          reactions: Json | null
          sex: string | null
          stores: string | null
          stripe_customer: string | null
          updated_at: string | null
        }
        Insert: {
          age?: number | null
          avatar_url?: string | null
          email?: string | null
          expo_push_token?: string | null
          full_name?: string | null
          group?: string | null
          id: string
          reactions?: Json | null
          sex?: string | null
          stores?: string | null
          stripe_customer?: string | null
          updated_at?: string | null
        }
        Update: {
          age?: number | null
          avatar_url?: string | null
          email?: string | null
          expo_push_token?: string | null
          full_name?: string | null
          group?: string | null
          id?: string
          reactions?: Json | null
          sex?: string | null
          stores?: string | null
          stripe_customer?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      stores: {
        Row: {
          created_at: string | null
          delivery_price: number | null
          delivery_time: string | null
          instagram_url: string | null
          owner: string | null
          phone_number: string | null
          store_description: string | null
          store_id: string
          store_logo: string | null
          store_name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          delivery_price?: number | null
          delivery_time?: string | null
          instagram_url?: string | null
          owner?: string | null
          phone_number?: string | null
          store_description?: string | null
          store_id?: string
          store_logo?: string | null
          store_name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          delivery_price?: number | null
          delivery_time?: string | null
          instagram_url?: string | null
          owner?: string | null
          phone_number?: string | null
          store_description?: string | null
          store_id?: string
          store_logo?: string | null
          store_name?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "stores_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never
