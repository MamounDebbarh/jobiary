import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { LoaderCircle } from "lucide-react";
import { Button } from "../ui/button";

interface ClientAuthButtonProps {
  user: User;
}

export default function ClientAuthButton({ user }: ClientAuthButtonProps) {
  const supabase = createClient();

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      // Redirect after logout
      window.location.href = "/";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <form action={signOut}>
        <Button>Logout</Button>
      </form>
    </div>
  ) : (
    <LoaderCircle className="animate-spin" />
  );
}
