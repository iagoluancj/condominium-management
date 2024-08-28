import { createClient } from '@supabase/supabase-js'
const supabaseUrl = 'https://wletlhsjwcdvwxjqkrae.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndsZXRsaHNqd2Nkdnd4anFrcmFlIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcyNDIwMzgwNCwiZXhwIjoyMDM5Nzc5ODA0fQ.HMyFRMBGlri7WTCa2PEubzgZCs6FvfoNbythOrzPdN0'

export const supabase = createClient(supabaseUrl!, supabaseKey!)