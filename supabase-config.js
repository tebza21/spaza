// Browser-safe Supabase configuration.
// This must contain only the publishable/anon key. Never place a service-role key here.
const SPAZA_SUPABASE_URL = "https://gbyujowoqalxtbhpdbod.supabase.co";
const SPAZA_SUPABASE_PUBLISHABLE_KEY = "sb_publishable_NrSUNf4j1hYor9a6G74DHQ_xl3h-vsv";

window.SpazaDB = window.supabase.createClient(
  SPAZA_SUPABASE_URL,
  SPAZA_SUPABASE_PUBLISHABLE_KEY
);
