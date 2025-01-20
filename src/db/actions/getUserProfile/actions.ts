"use server";

import { createServer } from "@/supabase/server";

const GetUserProfile = async ({ userId }: { userId?: string }) => {
  if (!userId) return null;
  
  const supabase = await createServer();

  const { data, error }: any = await supabase
    .from("user_profile")
    .select(
      `
      email,
      is_subscription_active,
      first_name,
      last_name,
      plan,
      user_id,
      whatsapp (
        numbers,
        link
      )
    `
    )
    .eq("user_id", userId);

  if (error) {
    return error;
  }

  return data[0];
};

export default GetUserProfile;
