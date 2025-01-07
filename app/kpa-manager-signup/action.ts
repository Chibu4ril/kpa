"use server";

import { createClient } from "@/utils/supabase/server";
import { log } from "console";
import { redirect } from "next/navigation";

export async function signup(formData: FormData) {
  try {
    console.log("Signup form data here:", formData);

    const supabase = await createClient();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const firstName = formData.get("fname")?.toString();
    const lastName = formData.get("lname")?.toString();

    console.log("Signup form data hereagain:", formData);

    if (!email || !password || !firstName || !lastName) {
      console.error("Missing required fields");
      return redirect("/kpa-manager-signup?message=Missing required fields");
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { firstName, lastName },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });

    if (authError) {
      console.error("Signup error:", authError.message);
      return redirect(
        `/kpa-manager-signup?message=${encodeURIComponent(authError.message)}`
      );
    }

    if (!authData?.user) {
      console.error("Failed to create user");
      return redirect("/kpa-manager-signup?message=Failed to createw user");
    }

    const userId = authData.user.id;
    if (!userId) {
      console.error("No user ID returned from signup");
      return redirect("/kpa-manager-signup?message=No user ID returned");
    }

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      first_name: firstName,
      last_name: lastName,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error("Profile error:", profileError.message);
      return redirect(
        `/kpa-manager-signup?message=${encodeURIComponent(
          profileError.message
        )}`
      );
    }

    return redirect("/login?message=Check your email to confirm your account");
  } catch (err) {
    console.error("Server error:", err);
    return redirect("/kpa-manager-signup?message=An unexpected error occurred");
  }
}
