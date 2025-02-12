
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { PlayerCategory } from "@/types/models";
import { Plus } from "lucide-react";
import { PLAYER_COSTS } from "@/constants/gameRules";

export const AddPlayerForm = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [category, setCategory] = useState<PlayerCategory | "">("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !category) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Compila tutti i campi",
      });
      return;
    }

    try {
      const basePrice = PLAYER_COSTS[category as PlayerCategory];
      
      const { error } = await supabase.from("players").insert([
        {
          name,
          category,
          base_price: basePrice,
          current_price: basePrice,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Successo",
        description: "Giocatore aggiunto con successo",
      });
      
      setOpen(false);
      setName("");
      setCategory("");
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: "Impossibile aggiungere il giocatore",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="mb-4">
          <Plus className="w-4 h-4 mr-2" /> Aggiungi Giocatore
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aggiungi Nuovo Giocatore</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              placeholder="Nome del giocatore"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Select value={category} onValueChange={(value: PlayerCategory) => setCategory(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Seleziona categoria" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(PlayerCategory).map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat} - {PLAYER_COSTS[cat]} punti
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="w-full">
            Aggiungi
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
