
import { Button } from "@/components/ui/button";
import { NotificationBell } from "@/components/ui/notifications/NotificationBell";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const Header = () => {
  const { toast } = useToast();

  return (
    <header className="flex justify-between items-center mb-12">
      <div>
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
          Fantasy League Manager
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Fantarimasti
        </h1>
        <p className="text-primary/60">Gestisci la tua squadra e scala le classifiche</p>
      </div>
      <div className="flex items-center gap-4">
        <NotificationBell />
        <Button 
          variant="outline"
          onClick={() => {
            supabase.auth.signOut();
            toast({
              title: "Logout effettuato",
              description: "Hai effettuato il logout con successo",
            });
          }}
        >
          Logout
        </Button>
      </div>
    </header>
  );
};
