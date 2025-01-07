"use client";

import { useQuery } from "@tanstack/react-query";
// import useGetUser from "@/hooks/useGetUser";
import GetWhatsAppControl from "@/actions/getNumbers/actions";
import { WhatsAppLink } from "@/components/whatsapp/whatsapp-link";
import { WhatsAppNumbers } from "@/components/whatsapp/whatsapp-numbers";
import {
  WhatsAppLinkSkeleton,
  WhatsAppNumbersSkeleton,
} from "@/components/whatsapp/loading-skeleton";

export default function WhatsAppPage() {
  // const {
  //   data: userData,
  //   isLoading: isUserDataLoading,
  //   isFetching: isUserDataFetching,
  // } = useGetUser();

  const userData = {
    plan: "advanced",
    user_id: '657d71bd-3181-4394-ab7c-5d51f4759d07'
  };

  const { data, isLoading } = useQuery<any>({
    queryKey: ["whatsapp"],
    queryFn: () =>
      GetWhatsAppControl({ user_id: "657d71bd-3181-4394-ab7c-5d51f4759d07" }),
  });

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">WhatsApp</h1>
      {isLoading || !userData ? (
        <>
          <WhatsAppNumbersSkeleton />
          <WhatsAppLinkSkeleton />
        </>
      ) : (
        <>
          <WhatsAppLink link={data?.link} />
          <WhatsAppNumbers numbers={data?.numbers} userInfo={userData} />
        </>
      )}
    </div>
  );
}
