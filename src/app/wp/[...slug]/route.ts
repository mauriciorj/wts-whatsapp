export const dynamic = "force-dynamic";

import { geolocation } from "@vercel/functions";
import { type NextRequest, NextResponse, userAgent } from "next/server";

import { createServer } from "@/db/supabase/server";

type whatsappApp = {
  id: string;
  numbers: [
    { number: string; message: string },
    { number: string; message: string }
  ];
  redirect_to: number;
  user_profile: { is_subscription_active: boolean };
}[];

export async function GET(request: NextRequest) {
  const supabase = await createServer();

  const getRequestUrl = request.url;

  const url = new URL(getRequestUrl);
  const pathname = url.pathname.split("/")[2];

  // Fetch the Whatsapp's User's Info
  const { data, error } = await supabase
    .from("whatsapp")
    .select(
      "id, numbers,redirect_to, user_id, user_profile(is_subscription_active)"
    )
    .eq("link", pathname)
    .returns<whatsappApp>();

  if (error || !data?.length) {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }

  const { id, numbers, redirect_to, user_profile } = data[0];

  if (user_profile?.is_subscription_active) {
    const whatsappNumbers = numbers;
    const currentIndex = redirect_to || 0;
    const nextRedirectTo = (currentIndex + 1) % whatsappNumbers?.length;

    // Update the Whatsapp's next redirect_to index
    await supabase
      .from("whatsapp")
      .update({ redirect_to: nextRedirectTo })
      .eq("id", data[0]["id"]);

    const { city, country } = geolocation(request);
    const { device, os } = userAgent(request);

    const trackingInfo = {
      user_id: id,
      number: whatsappNumbers[currentIndex]["number"],
      country: country,
      city: city,
      device_system: os.name,
      device_size: device.type,
      link: pathname,
    };

    await supabase.from("whatsapp_tracking").insert(trackingInfo);

    let whatsappLink = "";

    if (!whatsappNumbers[currentIndex]["message"]?.length) {
      whatsappLink = `https://wa.me/${whatsappNumbers[currentIndex]["number"]}`;
    } else {
      const msg_encoded = encodeURIComponent(
        whatsappNumbers[currentIndex]["message"]
      );
      whatsappLink = `https://wa.me/${whatsappNumbers[currentIndex]["number"]}?text=${msg_encoded}`;
    }

    return NextResponse.redirect(new URL(whatsappLink, request.url));
  } else {
    return NextResponse.redirect(new URL("/not-found", request.url));
  }
}
