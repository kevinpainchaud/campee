export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      nudges: {
        Row: {
          created_at: string
          created_by: string
          id: string
          to_participant_id: string
          voting_room_id: string
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          to_participant_id: string
          voting_room_id: string
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          to_participant_id?: string
          voting_room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "nudges_voting_room_id_fkey"
            columns: ["voting_room_id"]
            isOneToOne: false
            referencedRelation: "voting_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      participants: {
        Row: {
          created_at: string
          id: string
          user_id: string
          vote: string | null
          voting_room_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          user_id?: string
          vote?: string | null
          voting_room_id: string
        }
        Update: {
          created_at?: string
          id?: string
          user_id?: string
          vote?: string | null
          voting_room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "participants_voting_room_id_fkey"
            columns: ["voting_room_id"]
            isOneToOne: false
            referencedRelation: "voting_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name: string | null
          display_name: string
          id: string
        }
        Insert: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name?: string | null
          display_name: string
          id: string
        }
        Update: {
          backface_card_style_key?: Database["public"]["Enums"]["backface_card_style_key"]
          company_name?: string | null
          display_name?: string
          id?: string
        }
        Relationships: []
      }
      voting_rooms: {
        Row: {
          created_at: string
          created_by: string
          id: string
          invitation_code: string
          name: string
          updated_at: string
          updated_by: string | null
          votes_revealed: boolean
          voting_system: Database["public"]["Enums"]["voting_system"]
        }
        Insert: {
          created_at?: string
          created_by?: string
          id?: string
          invitation_code?: string
          name: string
          updated_at?: string
          updated_by?: string | null
          votes_revealed?: boolean
          voting_system?: Database["public"]["Enums"]["voting_system"]
        }
        Update: {
          created_at?: string
          created_by?: string
          id?: string
          invitation_code?: string
          name?: string
          updated_at?: string
          updated_by?: string | null
          votes_revealed?: boolean
          voting_system?: Database["public"]["Enums"]["voting_system"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_voting_room: {
        Args: {
          name: string
          voting_system: Database["public"]["Enums"]["voting_system"]
        }
        Returns: {
          created_at: string
          created_by: string
          id: string
          invitation_code: string
          name: string
          updated_at: string
          updated_by: string | null
          votes_revealed: boolean
          voting_system: Database["public"]["Enums"]["voting_system"]
        }[]
        SetofOptions: {
          from: "*"
          to: "voting_rooms"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      generate_invitation_code: { Args: { length?: number }; Returns: string }
      get_profiles: {
        Args: { ids: string[] }
        Returns: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name: string | null
          display_name: string
          id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_profile: {
        Args: never
        Returns: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name: string | null
          display_name: string
          id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_user_voting_rooms: {
        Args: never
        Returns: {
          created_at: string
          created_by: string
          id: string
          invitation_code: string
          name: string
          updated_at: string
          updated_by: string | null
          votes_revealed: boolean
          voting_system: Database["public"]["Enums"]["voting_system"]
        }[]
        SetofOptions: {
          from: "*"
          to: "voting_rooms"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_voting_room: {
        Args: { invitation_code: string }
        Returns: {
          created_at: string
          created_by: string
          id: string
          invitation_code: string
          name: string
          updated_at: string
          updated_by: string | null
          votes_revealed: boolean
          voting_system: Database["public"]["Enums"]["voting_system"]
        }[]
        SetofOptions: {
          from: "*"
          to: "voting_rooms"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_voting_room_participants: {
        Args: { voting_room_id: string }
        Returns: {
          created_at: string
          id: string
          user_id: string
          vote: string | null
          voting_room_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "participants"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      get_voting_room_participants_profiles: {
        Args: { voting_room_id: string }
        Returns: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name: string | null
          display_name: string
          id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      join_voting_room: { Args: { voting_room_id: string }; Returns: undefined }
      leave_voting_room: {
        Args: { voting_room_id: string }
        Returns: undefined
      }
      reveal_votes: { Args: { voting_room_id: string }; Returns: undefined }
      send_nudge: {
        Args: { to_participant_id: string; voting_room_id: string }
        Returns: undefined
      }
      start_new_voting_round: {
        Args: { voting_room_id: string }
        Returns: undefined
      }
      update_profile: {
        Args: {
          backface_card_style_key?: Database["public"]["Enums"]["backface_card_style_key"]
          company_name?: string
          display_name?: string
        }
        Returns: {
          backface_card_style_key: Database["public"]["Enums"]["backface_card_style_key"]
          company_name: string | null
          display_name: string
          id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "profiles"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      update_voting_room: {
        Args: {
          id: string
          name?: string
          voting_system?: Database["public"]["Enums"]["voting_system"]
        }
        Returns: {
          created_at: string
          created_by: string
          id: string
          invitation_code: string
          name: string
          updated_at: string
          updated_by: string | null
          votes_revealed: boolean
          voting_system: Database["public"]["Enums"]["voting_system"]
        }[]
        SetofOptions: {
          from: "*"
          to: "voting_rooms"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      vote: {
        Args: { vote?: string; voting_room_id: string }
        Returns: undefined
      }
    }
    Enums: {
      backface_card_style_key:
        | "animal"
        | "bike"
        | "cool"
        | "fantasy"
        | "food"
        | "gaming"
        | "music"
        | "sport"
      voting_system: "scrum" | "fibonacci" | "t-shirts"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      backface_card_style_key: [
        "animal",
        "bike",
        "cool",
        "fantasy",
        "food",
        "gaming",
        "music",
        "sport",
      ],
      voting_system: ["scrum", "fibonacci", "t-shirts"],
    },
  },
} as const
