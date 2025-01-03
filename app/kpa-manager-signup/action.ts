"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function SignupEmail(formData: FormData) {
  try {
    const supabase = await createClient();

    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const fname = formData.get("fname")?.toString();
    const lname = formData.get("lname")?.toString();

    if (!email || !password || !fname || !lname) {
      return redirect("/kpa-manager-signup?message=Missing required fields");
    }

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { fname, lname },
        emailRedirectTo: process.env.NEXT_PUBLIC_SITE_URL,
      },
    });

    if (error) {
      console.error("Signup error:", error.message);
      return redirect(
        `/kpa-manager-signup?message=${encodeURIComponent(error.message)}`
      );
    }

    if (!data?.user) {
      return redirect("/kpa-manager-signup?message=Failed to create user");
    }

    // Ensure the user ID is available
    const userId = data.user.id;
    if (!userId) {
      console.error("No user ID returned from signup");
      return redirect("/kpa-manager-signup?message=No user ID returned");
    }

    // Create profile
    const { error: profileError } = await supabase.from("profiles").insert({
      id: userId,
      first_name: fname,
      last_name: lname,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
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
