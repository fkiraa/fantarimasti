
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Player, PlayerCategory, PlayerStatus } from "@/types/models";
import { Plus } from "lucide-react";
import { AddPlayerForm } from "./AddPlayerForm";

const PlayersList = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchPlayers();
  }, []);

  const fetchPlayers = async () => {
    try {
      const { data, error } = await supabase
        .from("players")
        .select("*")
        .eq('status', PlayerStatus.AVAILABLE)
        .order("name");
      
      if (error) throw error;

      const formattedPlayers: Player[] = (data || []).map(player => ({
        id: player.id,
        name: player.name,
        category: player.category as PlayerCategory,
        basePrice: player.base_price,
        currentPrice: player.current_price,
        status: player.status as PlayerStatus,
        popularity: player.popularity,
        monthlyScore: player.monthly_score,
        createdAt: new Date(player.created_at),
        updatedAt: new Date(player.updated_at)
      }));

      setPlayers(formattedPlayers);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile caricare i giocatori",
      });
    } finally {
      setLoading(false);
    }
  };

  const addPlayerToTeam = async (playerId: string, currentPrice: number) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("Devi effettuare l'accesso");

      const { error } = await supabase
        .from("team_players")
        .insert([
          { 
            profile_id: user.id, 
            player_id: playerId,
            acquired_price: currentPrice
          }
        ]);

      if (error) {
        if (error.message.includes("più di 5 giocatori")) {
          throw new Error("Non puoi avere più di 5 giocatori nella tua squadra");
        }
        throw error;
      }

      toast({
        title: "Giocatore aggiunto",
        description: "Il giocatore è stato aggiunto alla tua squadra",
      });
      
      // Ricarica la lista dei giocatori
      fetchPlayers();
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    }
  };

  if (loading) {
    return <div>Caricamento...</div>;
  }

  return (
    <div className="space-y-6">
      <AddPlayerForm />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(PlayerCategory).map((category) => (
          <Card key={category} className="backdrop-blur-lg bg-white/90">
            <CardHeader>
              <CardTitle>{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {players
                  .filter((player) => player.category === category)
                  .map((player) => (
                    <div
                      key={player.id}
                      className="flex items-center justify-between p-2 rounded-lg bg-primary/5 hover:bg-primary/10 transition-colors"
                    >
                      <div>
                        <p className="font-medium">{player.name}</p>
                        <p className="text-sm text-primary/60">
                          Prezzo: {player.currentPrice} punti
                        </p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addPlayerToTeam(player.id, player.currentPrice)}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Aggiungi
                      </Button>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
