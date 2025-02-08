
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PlayerCategory, RankingType } from "@/types/models";
import { Trophy, Users, Award } from "lucide-react";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("rankings");

  return (
    <div className="min-h-screen bg-secondary p-6 animate-fadeIn">
      <header className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
          Fantasy League Manager
        </div>
        <h1 className="text-4xl font-bold text-primary mb-2">Fantarimasti</h1>
        <p className="text-primary/60">Gestisci la tua squadra e scala le classifiche</p>
      </header>

      <Tabs defaultValue={activeTab} className="max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8">
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
        </TabsList>

        <div className="grid gap-6">
          <TabsContent value="rankings" className="grid gap-6 animate-fadeIn">
            {Object.values(RankingType).map((type) => (
              <Card key={type} className="backdrop-blur-lg bg-white/80">
                <CardHeader>
                  <CardTitle>Classifica {type.toLowerCase()}</CardTitle>
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
          </TabsContent>

          <TabsContent value="presidents" className="animate-fadeIn">
            <Card className="backdrop-blur-lg bg-white/80">
              <CardHeader>
                <CardTitle>Gestione Presidenti</CardTitle>
                <CardDescription>
                  Ogni presidente ha a disposizione 100 punti iniziali
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center text-primary/60">
                  Sezione presidenti in arrivo...
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="players" className="grid gap-6 animate-fadeIn">
            {Object.values(PlayerCategory).map((category) => (
              <Card key={category} className="backdrop-blur-lg bg-white/80">
                <CardHeader>
                  <CardTitle>{category}</CardTitle>
                  <CardDescription>
                    {category === PlayerCategory.CAMPIONI
                      ? "50 punti"
                      : category === PlayerCategory.TOP
                      ? "30 punti"
                      : "10 punti"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-primary/60">
                    Giocatori in arrivo...
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
