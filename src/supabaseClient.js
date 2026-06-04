import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nactmrkbdceiebkthoky.supabase.co';
const supabaseKey = 'sb_publishable_RKXnRK30x_YqVi_NGkz5_Q_U4Nze_Ao';

export const supabase = createClient(supabaseUrl, supabaseKey);
