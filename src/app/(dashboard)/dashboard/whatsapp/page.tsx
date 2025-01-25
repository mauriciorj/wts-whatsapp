"use client";

import GetUser from "@/actions/getUser/actions";
import GetUserProfile from "@/actions/getUserProfile/actions";
import WhatsAppLink from "@/components/whatsapp/whatsapp-link";
import { WhatsAppNumbers } from "@/components/whatsapp/whatsapp-numbers";
import { useQuery } from "@tanstack/react-query";

const WhatsAppPage = () => {
  const { data: userData, isLoading: userIsLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => GetUser(),
  });

  const { data: userProfileData, isLoading: userProfileIsLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: async () => GetUserProfile({ userId: userData?.user?.id }),
    enabled: !!userData?.user?.id,
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">WhatsApp</h1>
      <WhatsAppLink
        isLoading={userIsLoading || userProfileIsLoading}
        link={userProfileData?.whatsapp?.link}
      />
      <WhatsAppNumbers
        isLoading={userIsLoading || userProfileIsLoading}
        numbers={userProfileData?.whatsapp?.numbers}
        userInfo={userProfileData}
      />
    </div>
  );
};

export default WhatsAppPage;
