import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://jbfjbdwchrcpyklnnalx.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpiZmpiZHdjaHJjcHlrbG5uYWx4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MTY5OTYsImV4cCI6MjA3ODE5Mjk5Nn0.fsBr6d4oMvaR_bctr1jxDqJspUyOJ1EkA5_pPuP_mkI";

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;