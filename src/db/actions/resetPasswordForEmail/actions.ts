'use server';

import { createServer } from '@db/supabase/server';
import { getLocale } from 'next-intl/server';

const ResetPasswordForEmail = async (formData: { email: string }) => {
  const supabase = createServer();
  const locale = await getLocale();

  const { email } = formData;

  const { error } = await supabase.auth.resetPasswordForEmail(
    email.toLowerCase(),
    {
      redirectTo: `https://www.wetracksales.com/${locale}/update-password`,
    }
  );

  if (error) {
    return false;
  }

  return true;
};

export default ResetPasswordForEmail;
