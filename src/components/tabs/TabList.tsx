
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Award, Book, CircleDollarSign, Crown } from "lucide-react";
import { cn } from "@/lib/utils";

interface TabListProps {
  setActiveTab: (value: string) => void;
  orientation?: "horizontal" | "vertical";
  defaultValue?: string;
}

export const TabList = ({ setActiveTab, orientation = "horizontal" }: TabListProps) => {
  const tabItems = [
    { value: "dashboard", icon: Crown, label: "Dashboard" },
    { value: "rankings", icon: Trophy, label: "Classifiche" },
    { value: "presidents", icon: Users, label: "Presidenti" },
    { value: "players", icon: Award, label: "Giocatori" },
    { value: "market", icon: CircleDollarSign, label: "Mercato" },
    { value: "rules", icon: Book, label: "Regole" },
  ];

  return (
    <TabsList 
      className={cn(
        "grid w-full max-w-2xl mx-auto mb-8",
        orientation === "horizontal" ? "grid-cols-6" : "grid-cols-1 gap-2"
      )}
    >
      {tabItems.map(({ value, icon: Icon, label }) => (
        <TabsTrigger 
          key={value}
          value={value} 
          onClick={() => setActiveTab(value)}
          className={cn(
            orientation === "vertical" && "justify-start px-4 py-2"
          )}
        >
          <Icon className="w-4 h-4 mr-2" />
          {label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
};
