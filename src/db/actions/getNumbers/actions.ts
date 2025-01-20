"use server";

import { createServer } from "@/supabase/server";

const GetWhatsAppControl = async ({ user_id }: { user_id: string }) => {
  const supabase = await createServer();

  const { data, error }: any = await supabase
    .from("whatsapp")
    .select()
    .eq("user_id", user_id);

  if (error) {
    return error;
  }

  return data[0];
};

export default GetWhatsAppControl;
