export interface Database {
  public: {
    Tables: {
      subscribers: {
        Row: {
          id: string;
          email: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
          welcome_email_sent: boolean;
          unsubscribe_token: string;
        };
        Insert: {
          id?: string;
          email: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          welcome_email_sent?: boolean;
          unsubscribe_token?: string;
        };
        Update: {
          id?: string;
          email?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
          welcome_email_sent?: boolean;
          unsubscribe_token?: string;
        };
      };
    };
  };
}

export type Subscriber = Database['public']['Tables']['subscribers']['Row'];
