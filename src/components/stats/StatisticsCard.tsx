
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Users, Award } from "lucide-react";

interface StatisticsProps {
  totalPoints: number;
  weeklyPoints: number;
  monthlyPoints: number;
  totalErrors: number;
}

export const StatisticsCard = ({ totalPoints, weeklyPoints, monthlyPoints, totalErrors }: StatisticsProps) => {
  return (
    <Card className="col-span-3 backdrop-blur-lg bg-white/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-yellow-500" />
          Le tue statistiche
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
            <Trophy className="h-8 w-8 text-yellow-500 mb-2" />
            <span className="text-2xl font-bold">{totalPoints}</span>
            <span className="text-sm text-primary/60">Punti Totali</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
            <Users className="h-8 w-8 text-blue-500 mb-2" />
            <span className="text-2xl font-bold">{weeklyPoints}</span>
            <span className="text-sm text-primary/60">Punti Settimanali</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
            <Award className="h-8 w-8 text-purple-500 mb-2" />
            <span className="text-2xl font-bold">{monthlyPoints}</span>
            <span className="text-sm text-primary/60">Punti Mensili</span>
          </div>
          <div className="flex flex-col items-center p-4 bg-primary/5 rounded-lg">
            <Users className="h-8 w-8 text-red-500 mb-2" />
            <span className="text-2xl font-bold">{totalErrors}</span>
            <span className="text-sm text-primary/60">Errori Totali</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
