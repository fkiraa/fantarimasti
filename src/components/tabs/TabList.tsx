
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Award, Book, CircleDollarSign, Crown } from "lucide-react";

interface TabListProps {
  setActiveTab: (value: string) => void;
}

export const TabList = ({ setActiveTab }: TabListProps) => {
  return (
    <TabsList className="grid w-full max-w-2xl mx-auto mb-8 grid-cols-6">
      <TabsTrigger value="dashboard" onClick={() => setActiveTab("dashboard")}>
        <Crown className="w-4 h-4 mr-2" />
        Dashboard
      </TabsTrigger>
      <TabsTrigger value="rankings" onClick={() => setActiveTab("rankings")}>
        <Trophy className="w-4 h-4 mr-2" />
        Classifiche
      </TabsTrigger>
      <TabsTrigger value="presidents" onClick={() => setActiveTab("presidents")}>
        <Users className="w-4 h-4 mr-2" />
        Presidenti
      </TabsTrigger>
      <TabsTrigger value="players" onClick={() => setActiveTab("players")}>
        <Award className="w-4 h-4 mr-2" />
        Giocatori
      </TabsTrigger>
      <TabsTrigger value="market" onClick={() => setActiveTab("market")}>
        <CircleDollarSign className="w-4 h-4 mr-2" />
        Mercato
      </TabsTrigger>
      <TabsTrigger value="rules" onClick={() => setActiveTab("rules")}>
        <Book className="w-4 h-4 mr-2" />
        Regole
      </TabsTrigger>
    </TabsList>
  );
};
