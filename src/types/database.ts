export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string | null;
          full_name: string;
          phone: string;
          address: string;
          city: string;
          role: "customer" | "admin" | "supervisor";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          full_name: string;
          phone: string;
          address?: string;
          city?: string;
          role?: "customer" | "admin" | "supervisor";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      motorcycles: {
        Row: {
          id: string;
          brand: string;
          model: string;
          variant: string;
          category: "matic" | "cub" | "sport" | "ev";
          year: number;
          otr_price: number;
          description: string;
          image_url: string | null;
          stock: number;
          status: "active" | "inactive";
          slug: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          brand: string;
          model: string;
          variant?: string;
          category: "matic" | "cub" | "sport" | "ev";
          year: number;
          otr_price: number;
          description?: string;
          image_url?: string | null;
          stock?: number;
          status?: "active" | "inactive";
          slug: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["motorcycles"]["Insert"]>;
      };
      motorcycle_rates: {
        Row: {
          id: string;
          motorcycle_id: string;
          dp: number;
          tenor: number;
          installment: number;
          otr_price: number;
          period: string;
          area: string;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          motorcycle_id: string;
          dp: number;
          tenor: number;
          installment: number;
          otr_price: number;
          period?: string;
          area?: string;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["motorcycle_rates"]["Insert"]>;
      };
      bpkb_products: {
        Row: {
          id: string;
          name: string;
          vehicle_brands: string[];
          max_vehicle_age: number;
          description: string;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          vehicle_brands?: string[];
          max_vehicle_age?: number;
          description?: string;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bpkb_products"]["Insert"]>;
      };
      bpkb_rates: {
        Row: {
          id: string;
          product_id: string;
          scheme: string;
          disbursement_amount: number;
          tenor: number;
          installment: number;
          period: string;
          area: string;
          status: "active" | "inactive";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          product_id: string;
          scheme?: string;
          disbursement_amount: number;
          tenor: number;
          installment: number;
          period?: string;
          area?: string;
          status?: "active" | "inactive";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["bpkb_rates"]["Insert"]>;
      };
      applications: {
        Row: {
          id: string;
          application_code: string;
          customer_id: string;
          application_type: "new_motorcycle" | "bpkb_financing";
          motorcycle_id: string | null;
          bpkb_product_id: string | null;
          vehicle_type: string | null;
          vehicle_year: number | null;
          vehicle_plate: string | null;
          requested_amount: number | null;
          selected_dp: number | null;
          selected_tenor: number | null;
          estimated_installment: number | null;
          payment_method: "cash" | "credit" | null;
          status:
            | "submitted"
            | "verification"
            | "follow_up"
            | "survey"
            | "processing"
            | "completed"
            | "cancelled";
          survey_number: string | null;
          voucher_name: string | null;
          source: string;
          follow_up_status: "pending" | "in_progress" | "done";
          is_demo: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_code?: string;
          customer_id: string;
          application_type: "new_motorcycle" | "bpkb_financing";
          motorcycle_id?: string | null;
          bpkb_product_id?: string | null;
          vehicle_type?: string | null;
          vehicle_year?: number | null;
          vehicle_plate?: string | null;
          requested_amount?: number | null;
          selected_dp?: number | null;
          selected_tenor?: number | null;
          estimated_installment?: number | null;
          payment_method?: "cash" | "credit" | null;
          status?:
            | "submitted"
            | "verification"
            | "follow_up"
            | "survey"
            | "processing"
            | "completed"
            | "cancelled";
          survey_number?: string | null;
          voucher_name?: string | null;
          source?: string;
          follow_up_status?: "pending" | "in_progress" | "done";
          is_demo?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["applications"]["Insert"]>;
      };
      conversations: {
        Row: {
          id: string;
          customer_id: string | null;
          assigned_admin_id: string | null;
          status: "open" | "closed";
          mode: "bot" | "admin" | "waiting_admin";
          guest_name: string | null;
          guest_phone: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          customer_id?: string | null;
          assigned_admin_id?: string | null;
          status?: "open" | "closed";
          mode?: "bot" | "admin" | "waiting_admin";
          guest_name?: string | null;
          guest_phone?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["conversations"]["Insert"]>;
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          sender_type: "customer" | "bot" | "admin";
          sender_id: string | null;
          message: string;
          metadata: Json | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          sender_type: "customer" | "bot" | "admin";
          sender_id?: string | null;
          message: string;
          metadata?: Json | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["messages"]["Insert"]>;
      };
      chatbot_intents: {
        Row: {
          id: string;
          intent_key: string;
          category: string;
          description: string;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          intent_key: string;
          category: string;
          description?: string;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chatbot_intents"]["Insert"]>;
      };
      chatbot_responses: {
        Row: {
          id: string;
          intent_id: string;
          trigger_examples: string[];
          response_text: string;
          priority: number;
          active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          intent_id: string;
          trigger_examples?: string[];
          response_text: string;
          priority?: number;
          active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["chatbot_responses"]["Insert"]>;
      };
      follow_ups: {
        Row: {
          id: string;
          application_id: string;
          admin_id: string | null;
          note: string;
          follow_up_date: string;
          status: "pending" | "in_progress" | "done";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          application_id: string;
          admin_id?: string | null;
          note: string;
          follow_up_date: string;
          status?: "pending" | "in_progress" | "done";
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["follow_ups"]["Insert"]>;
      };
      notifications: {
        Row: {
          id: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          type: string;
          title: string;
          message: string;
          is_read?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["notifications"]["Insert"]>;
      };
      application_counters: {
        Row: {
          prefix: string;
          year: number;
          last_number: number;
        };
        Insert: {
          prefix: string;
          year: number;
          last_number?: number;
        };
        Update: Partial<Database["public"]["Tables"]["application_counters"]["Insert"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      generate_application_code: {
        Args: { p_type: "new_motorcycle" | "bpkb_financing" };
        Returns: string;
      };
      is_staff: {
        Args: Record<PropertyKey, never>;
        Returns: boolean;
      };
    };
    Enums: Record<string, never>;
  };
};
