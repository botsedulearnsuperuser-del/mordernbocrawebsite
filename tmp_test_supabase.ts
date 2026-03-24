import { supabase } from './src/lib/supabase';

async function testSupabase() {
    console.log('Testing Supabase Connection...');
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error selecting from profiles:', error);
    } else {
        console.log('Successfully connected to profiles table. Data count:', data.length);
    }
}

testSupabase();
