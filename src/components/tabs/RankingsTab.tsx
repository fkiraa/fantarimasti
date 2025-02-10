
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy } from "lucide-react";
import { RankingType } from "@/types/models";

export const RankingsTab = () => {
  return (
    <>
      {Object.values(RankingType).map((type) => (
        <Card key={type} className="backdrop-blur-lg bg-white/90 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-500" />
              Classifica {type.toLowerCase()}
            </CardTitle>
            <CardDescription>
              Aggiornata al {new Date().toLocaleDateString()}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-primary/60">
              Classifica in arrivo...
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};
