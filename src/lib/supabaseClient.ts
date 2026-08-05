import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let client: SupabaseClient | null = null;

/**
 * Perezoso a propósito: si esto validara las env vars al importar el
 * archivo, cualquier persona corriendo en modo "mock" (sin llaves de
 * Supabase todavía) rompería la app entera solo por el import,
 * aunque nunca fuera a usar Supabase. Se valida recién cuando
 * SupabaseProductRepository efectivamente llama a un método.
 */
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
