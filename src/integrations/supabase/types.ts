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
      achievements: {
        Row: {
          created_at: string
          description: string
          icon: string
          id: string
          name: string
          points: number
        }
        Insert: {
          created_at?: string
          description: string
          icon: string
          id?: string
          name: string
          points: number
        }
        Update: {
          created_at?: string
          description?: string
          icon?: string
          id?: string
          name?: string
          points?: number
        }
        Relationships: []
      }
      market_listings: {
        Row: {
          buyer_id: string | null
          created_at: string
          expiration_date: string
          id: string
          max_price: number
          min_price: number
          player_id: string
          price: number
          seller_id: string
          status: string
        }
        Insert: {
          buyer_id?: string | null
          created_at?: string
          expiration_date?: string
          id?: string
          max_price?: number
          min_price?: number
          player_id: string
          price: number
          seller_id: string
          status?: string
        }
        Update: {
          buyer_id?: string | null
          created_at?: string
          expiration_date?: string
          id?: string
          max_price?: number
          min_price?: number
          player_id?: string
          price?: number
          seller_id?: string
          status?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_listings_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_listings_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      market_transactions: {
        Row: {
          buyer_id: string
          created_at: string
          id: string
          player_id: string
          price: number
          seller_id: string | null
          transaction_type: string
        }
        Insert: {
          buyer_id: string
          created_at?: string
          id?: string
          player_id: string
          price: number
          seller_id?: string | null
          transaction_type: string
        }
        Update: {
          buyer_id?: string
          created_at?: string
          id?: string
          player_id?: string
          price?: number
          seller_id?: string | null
          transaction_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "market_transactions_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_transactions_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "market_transactions_seller_id_fkey"
            columns: ["seller_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      monthly_achievements: {
        Row: {
          achievement_type: string
          created_at: string
          id: string
          month: number
          points_awarded: number
          profile_id: string
          year: number
        }
        Insert: {
          achievement_type: string
          created_at?: string
          id?: string
          month: number
          points_awarded: number
          profile_id: string
          year: number
        }
        Update: {
          achievement_type?: string
          created_at?: string
          id?: string
          month?: number
          points_awarded?: number
          profile_id?: string
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "monthly_achievements_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          message: string
          profile_id: string
          read: boolean
          title: string
          type: string
        }
        Insert: {
          created_at?: string
          id?: string
          message: string
          profile_id: string
          read?: boolean
          title: string
          type: string
        }
        Update: {
          created_at?: string
          id?: string
          message?: string
          profile_id?: string
          read?: boolean
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      player_errors: {
        Row: {
          created_at: string
          error_type: Database["public"]["Enums"]["error_type"]
          id: string
          player_id: string
          points_deducted: number
        }
        Insert: {
          created_at?: string
          error_type: Database["public"]["Enums"]["error_type"]
          id?: string
          player_id: string
          points_deducted: number
        }
        Update: {
          created_at?: string
          error_type?: Database["public"]["Enums"]["error_type"]
          id?: string
          player_id?: string
          points_deducted?: number
        }
        Relationships: [
          {
            foreignKeyName: "player_errors_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
        ]
      }
      players: {
        Row: {
          base_price: number
          category: Database["public"]["Enums"]["player_category"]
          created_at: string
          current_price: number
          id: string
          monthly_score: number | null
          name: string
          popularity: number | null
          status: Database["public"]["Enums"]["player_status"] | null
          updated_at: string
        }
        Insert: {
          base_price: number
          category: Database["public"]["Enums"]["player_category"]
          created_at?: string
          current_price: number
          id?: string
          monthly_score?: number | null
          name: string
          popularity?: number | null
          status?: Database["public"]["Enums"]["player_status"] | null
          updated_at?: string
        }
        Update: {
          base_price?: number
          category?: Database["public"]["Enums"]["player_category"]
          created_at?: string
          current_price?: number
          id?: string
          monthly_score?: number | null
          name?: string
          popularity?: number | null
          status?: Database["public"]["Enums"]["player_status"] | null
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          description: string | null
          full_name: string | null
          id: string
          points: number | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id: string
          points?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          description?: string | null
          full_name?: string | null
          id?: string
          points?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      statistics: {
        Row: {
          created_at: string
          id: string
          monthly_points: number
          profile_id: string
          total_errors: number
          total_points: number
          weekly_points: number
        }
        Insert: {
          created_at?: string
          id?: string
          monthly_points?: number
          profile_id: string
          total_errors?: number
          total_points?: number
          weekly_points?: number
        }
        Update: {
          created_at?: string
          id?: string
          monthly_points?: number
          profile_id?: string
          total_errors?: number
          total_points?: number
          weekly_points?: number
        }
        Relationships: [
          {
            foreignKeyName: "statistics_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      team_players: {
        Row: {
          acquired_at: string
          acquired_price: number
          player_id: string
          profile_id: string
        }
        Insert: {
          acquired_at?: string
          acquired_price: number
          player_id: string
          profile_id: string
        }
        Update: {
          acquired_at?: string
          acquired_price?: number
          player_id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_players_player_id_fkey"
            columns: ["player_id"]
            isOneToOne: false
            referencedRelation: "players"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_players_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          created_at: string
          id: string
          profile_id: string
        }
        Insert: {
          achievement_id: string
          created_at?: string
          id?: string
          profile_id: string
        }
        Update: {
          achievement_id?: string
          created_at?: string
          id?: string
          profile_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_achievements_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_statistics: {
        Row: {
          bonus_points: number | null
          created_at: string
          id: string
          penalty_points: number | null
          points: number
          profile_id: string
          total_errors: number | null
          week_number: number
          year: number
        }
        Insert: {
          bonus_points?: number | null
          created_at?: string
          id?: string
          penalty_points?: number | null
          points?: number
          profile_id: string
          total_errors?: number | null
          week_number: number
          year: number
        }
        Update: {
          bonus_points?: number | null
          created_at?: string
          id?: string
          penalty_points?: number | null
          points?: number
          profile_id?: string
          total_errors?: number | null
          week_number?: number
          year?: number
        }
        Relationships: [
          {
            foreignKeyName: "weekly_statistics_profile_id_fkey"
            columns: ["profile_id"]
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
      error_type: "SIMPLE" | "GRAVE" | "COLOSSALE"
      market_status: "OPEN" | "CLOSED"
      player_category: "CAMPIONI" | "TOP" | "SEMITOP"
      player_status: "AVAILABLE" | "INJURED" | "SUSPENDED" | "UNAVAILABLE"
      user_role: "president" | "admin"
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

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
