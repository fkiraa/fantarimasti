
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Book } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PLAYER_COSTS, INITIAL_POINTS, ERROR_POINTS } from "@/constants/gameRules";
import { PlayerCategory, ErrorType } from "@/types/models";

export const RulesTab = () => {
  return (
    <Card className="backdrop-blur-lg bg-white/90 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="w-5 h-5 text-red-500" />
          Regolamento
        </CardTitle>
        <CardDescription>
          Tutto quello che devi sapere per giocare
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-6">
            <section>
              <h3 className="font-semibold mb-2">Punti Iniziali</h3>
              <p>Ogni presidente inizia con {INITIAL_POINTS} punti da utilizzare per acquistare i giocatori.</p>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Categorie Giocatori</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>CAMPIONI: {PLAYER_COSTS[PlayerCategory.CAMPIONI]} punti</li>
                <li>TOP: {PLAYER_COSTS[PlayerCategory.TOP]} punti</li>
                <li>SEMITOP: {PLAYER_COSTS[PlayerCategory.SEMITOP]} punti</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Penalità per Errori</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Errore Semplice: {ERROR_POINTS[ErrorType.SIMPLE]} punti</li>
                <li>Errore Grave: {ERROR_POINTS[ErrorType.GRAVE]} punti</li>
                <li>Errore Colossale: {ERROR_POINTS[ErrorType.COLOSSALE]} punti</li>
              </ul>
            </section>

            <section>
              <h3 className="font-semibold mb-2">Regole Generali</h3>
              <ul className="list-disc pl-4 space-y-2">
                <li>Ogni presidente può avere massimo 5 giocatori nella propria squadra</li>
                <li>I punti vengono detratti in base agli errori commessi dai giocatori</li>
                <li>Le assenze vengono penalizzate con una detrazione del 5% dei punti totali</li>
                <li>La classifica viene aggiornata quotidianamente</li>
              </ul>
            </section>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
