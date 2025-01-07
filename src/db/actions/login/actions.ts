'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createServer } from '@/db/supabase/server';

const LoginUser = async (formData: { email: string; password: string }) => {
  const supabase = await createServer();

  const { email, password } = formData;
  const data = {
    email: email.toLowerCase(),
    password,
  };

  const { error } = await supabase.auth.signInWithPassword(data);

  console.log('')
  console.log('')
  console.log('')
  console.log('error',error)

  if (error) {
    return false;
  }

  revalidatePath(`/`, 'layout');
  redirect(`/dashboard`);
};

export default LoginUser;
