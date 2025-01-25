"use server";

import { createServer } from "@/db/supabase/server";

const ResetPasswordForEmail = async (formData: { email: string }) => {
  const supabase = await createServer();

  const { email } = formData;

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.toLowerCase(),
    {
      redirectTo: `https://www.zaprouter.pro/atualizar-senha`,
    }
  );

  if (error) {
    return false;
  }

  return true;
};

export default ResetPasswordForEmail;
