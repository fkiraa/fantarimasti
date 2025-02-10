
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";
import { INITIAL_POINTS } from "@/constants/gameRules";

export const PresidentsTab = () => {
  return (
    <Card className="backdrop-blur-lg bg-white/90 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-blue-500" />
          Gestione Presidenti
        </CardTitle>
        <CardDescription>
          Ogni presidente ha a disposizione {INITIAL_POINTS} punti iniziali
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-primary/60">
          Sezione presidenti in arrivo...
        </p>
      </CardContent>
    </Card>
  );
};
