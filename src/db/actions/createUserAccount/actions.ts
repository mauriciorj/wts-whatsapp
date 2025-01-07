"use server";

import { createServer } from "@/db/supabase/server";
import generateRandomCode from "@/lib/generateCode";

const checkIfCodeExists = async (randomCodeToLink: string) => {
  const supabase = createServer();
  const { data }: any = await supabase
    .from("whatsapp")
    .select()
    .eq("link", randomCodeToLink);
  return data;
};

const getUniqueCode = async () => {
  // let code;
  // do {
  //   code = await generateRandomCode();
  // } while (checkCode(code));
  // return code;
  const code = await generateRandomCode();
  const check = await checkIfCodeExists(code);
  console.log("");
  console.log("");
  console.log("=== getUniqueCode ===");
  console.log("code => ", code);
  console.log("check => ", check);
  return code;
};

const whatsAppInsert = async ({
  user_id,
  link,
}: {
  user_id: string;
  link: string;
}) => {
  const supabase = createServer();
  const { data }: any = await supabase
    .from("whatsapp")
    .insert({ user_id, link });

  return data;
};

const userProfileUpdate = async ({
  first_name,
  last_name,
  plan,
}: {
  first_name: string;
  last_name: string;
  plan: string;
}) => {
  const supabase = createServer();
  const { data }: any = await supabase
    .from("user_profile")
    .update({ first_name, last_name, plan });
  return data;
};

const CreateUserAccount = async (formData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  plan: string;
}) => {
  const supabase = createServer();

  const { email, firstName, lastName, password, plan } = formData;

  const data = {
    email: email.toLowerCase(),
    password,
  };

  // Step 1 - Create account
  // *Supabase will add the id and email to user_profile table
  const { data: signUpData, error } = await supabase.auth.signUp(data);

  // Step 2 - If user was created correctly then generate the link, update user_profile and whatsapp tables
  if (signUpData?.user?.id) {
    // Step 2.1 - Generate an unique random link
    const randomUniqueCode = await getUniqueCode();
    console.log("");
    console.log("");
    console.log("randomUniqueCode => ", randomUniqueCode);

    // Step 2.2 - Update the user_profile table with:
    // First Name, Last Name and Plan
    const profileUpdated = await userProfileUpdate({
      first_name: firstName,
      last_name: lastName,
      plan: plan,
    });
    console.log("");
    console.log("001 profileUpdated ", profileUpdated);

    // Step 2.3 - Insert in the whatsapp table:
    // user_id and link (random code)
    if (randomUniqueCode) {
      const whatsAppUpdated = await whatsAppInsert({
        user_id: signUpData?.user?.id,
        link: randomUniqueCode,
      });
      console.log("");
      console.log("002 insert whatsAppData ", whatsAppUpdated);
    }
  }

  if (error) {
    return false;
  }

  return true;
};

export default CreateUserAccount;
