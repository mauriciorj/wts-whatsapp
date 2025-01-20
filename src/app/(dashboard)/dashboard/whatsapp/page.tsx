"use client";

import { WhatsAppLink } from "@/components/whatsapp/whatsapp-link";
import { WhatsAppNumbers } from "@/components/whatsapp/whatsapp-numbers";
import {
  WhatsAppLinkSkeleton,
  WhatsAppNumbersSkeleton,
} from "@/components/whatsapp/loading-skeleton";
import { useQuery } from "@tanstack/react-query";
import GetUserProfile from "@/actions/getUserProfile/actions";
import GetUser from "@/actions/getUser/actions";

export default function WhatsAppPage() {
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
      {userIsLoading || userProfileIsLoading ? (
        <>
          <WhatsAppNumbersSkeleton />
          <WhatsAppLinkSkeleton />
        </>
      ) : (
        <>
          <WhatsAppLink link={userProfileData?.whatsapp?.link} />
          <WhatsAppNumbers
            numbers={userProfileData?.whatsapp?.numbers}
            userInfo={userProfileData}
          />
        </>
      )}
    </div>
  );
}
