import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

export default function ClientAuthButton() {
  const supabase = createClient();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await supabase.auth.getSession();
      setUser(session.data.session?.user ?? null);
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

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
