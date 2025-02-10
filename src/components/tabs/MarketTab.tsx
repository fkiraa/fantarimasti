
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CircleDollarSign } from "lucide-react";

export const MarketTab = () => {
  return (
    <Card className="backdrop-blur-lg bg-white/90 shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CircleDollarSign className="w-5 h-5 text-green-500" />
          Mercato
        </CardTitle>
        <CardDescription>
          Acquista e vendi i tuoi giocatori
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-center text-primary/60">
          Mercato in arrivo...
        </p>
      </CardContent>
    </Card>
  );
};
