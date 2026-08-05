import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

export function getSupabaseClient(): SupabaseClient {
  if (client) return client;

  const url = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. ' +
        'Copia .env.example a .env y completa tus llaves de Supabase.'
    );
  }

  client = createClient(url, anonKey);
  return client;
}
