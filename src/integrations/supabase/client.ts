// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://utpkenkditbmwfqyyodq.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV0cGtlbmtkaXRibXdmcXl5b2RxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkwNTkwOTgsImV4cCI6MjA1NDYzNTA5OH0.EDiIzuJZVRDBvY7sIlhKLl7FnhjpDgFYwHMNGKhExZE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);