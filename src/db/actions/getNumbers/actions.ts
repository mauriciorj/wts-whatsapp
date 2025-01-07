"use server";

import { createServer } from "@/supabase/server";

const GetWhatsAppControl = async ({ user_id }: { user_id: string }) => {
  const supabase = createServer();

  const { data }: any = await supabase
    .from("whatsapp")
    .select()
    .eq("user_id", user_id);

  return data[0];
};

export default GetWhatsAppControl;
