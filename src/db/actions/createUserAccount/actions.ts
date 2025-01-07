"use server";

import { createServer } from "@/db/supabase/server";
import generateRandomCode from "@/lib/generateCode";

const checkIfCodeExists = async (randomCodeToLink: string) => {
  const supabase = await createServer();
  const { data } = await supabase
    .from("whatsapp")
    .select()
    .eq("link", randomCodeToLink);
  return data;
};

const getUniqueCode = async () => {
  // let code;
  // do {
  //   code = await generateRandomCode();
  // } while (checkIfCodeExists(code));
  // return code;
  const code = await generateRandomCode();
  const check = await checkIfCodeExists(code);
  return code;
};

const whatsAppInsert = async ({
  user_id,
  link,
}: {
  user_id: string;
  link: string;
}) => {
  const supabase = await createServer();
  const { error } = await supabase.from("whatsapp").insert({ user_id, link });
  return error;
};

const userProfileUpdate = async ({
  first_name,
  last_name,
  plan,
  user_id,
}: {
  first_name: string;
  last_name: string;
  plan: string;
  user_id: string;
}) => {
  const supabase = await createServer();
  const { error } = await supabase
    .from("user_profile")
    .update({ first_name, last_name, plan })
    .eq("user_id", user_id);
  return error;
};

const CreateUserAccount = async (formData: {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  plan: string;
}) => {
  const supabase = await createServer();

  const { email, firstName, lastName, password, plan } = formData;

  const data = {
    email: email.toLowerCase(),
    password,
  };

  const { data: hasUser } = await supabase
    .from("user_profile")
    .select("email")
    .eq("email", email);

  if (hasUser && hasUser[0]?.email) {
    return { status: 400 };
  }

  // Step 1 - Create account
  // *Supabase will add the id and email to user_profile table
  const { data: signUpData, error } = await supabase.auth.signUp(data);

  if (error) {
    return { status: 500 };
  }

  // Step 2 - If user was created correctly then generate the link, update user_profile and whatsapp tables
  if (signUpData?.user?.id) {
    // Step 2.1 - Generate an unique random link
    const randomUniqueCode = await getUniqueCode();

    if (randomUniqueCode) {
      // Step 2.2 - Update the user_profile table with:
      // First Name, Last Name and Plan
      const profileUpdated = await userProfileUpdate({
        first_name: firstName,
        last_name: lastName,
        plan: plan,
        user_id: signUpData?.user?.id,
      });

      if (profileUpdated) {
        return { status: 500 };
      }

      // Step 2.3 - Insert in the whatsapp table:
      // user_id and link (random code)
      const whatsAppUpdated = await whatsAppInsert({
        user_id: signUpData?.user?.id,
        link: randomUniqueCode,
      });

      if (whatsAppUpdated) {
        return { status: 500 };
      }
    } else {
      return { status: 500 };
    }
  }

  return { status: 200 };
};

export default CreateUserAccount;
