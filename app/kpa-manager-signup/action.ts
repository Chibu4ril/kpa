"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function SignupEmail(formData: FormData) {
  const supabase = await createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fname = formData.get("fname") as string;
  const lname = formData.get("lname") as string;

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fname,
        lname,
      },
    },
  });

  // const data = {
  //   email: formData.get("email") as string,
  //   password: formData.get("password") as string,
  //   options: {
  //     data: {
  //       fname: formData.get("fname") as string,
  //       lname: formData.get("lname") as string,
  //     },
  //   },
  // };

  if (authError) {
    redirect("/kpa-manager-signup?message=Error Signing Up");
  }

  const { error: profileError } = await supabase.from("profiles").insert({
    id: authData.user?.id,
    fname: fname,
    lname: lname,
  });

  if (profileError) {
    return redirect("/kpa-manager-signup?message=Error Creating Profile");
  }

  revalidatePath("/", "layout");
  redirect("/kpa-manager-signup?message=Success");
}
