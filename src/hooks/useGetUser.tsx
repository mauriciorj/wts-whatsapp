import { createClient } from "@/db/supabase/client";
import { useQuery } from "@tanstack/react-query";

const useGetUser = () => {
  return useQuery<any>({
    queryKey: ["user"],
    queryFn: async () => {
      const supabase = createClient();
      const { data } = await supabase.auth.getUser();
      return data;
    },
  });
};

export default useGetUser;
