
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trophy, Users, Award, Book, CircleDollarSign, Settings } from "lucide-react";
import { PlayerCategory, RankingType } from "@/types/models";
import { PLAYER_COSTS, INITIAL_POINTS, ERROR_POINTS } from "@/constants/gameRules";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";
import PlayersList from "@/components/players/PlayersList";

const Index = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("rankings");
  const [session, setSession] = useState<any>(null);
  const [googleClientId, setGoogleClientId] = useState("");
  const [googleClientSecret, setGoogleClientSecret] = useState("");
  const [showSettings, setShowSettings] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSaveGoogleSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Qui dovresti salvare le credenziali in modo sicuro
      // Per ora mostreremo solo un toast di conferma
      toast({
        title: "Configurazione salvata",
        description: "Le credenziali di Google sono state salvate con successo",
      });
      setShowSettings(false);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    }
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
            Fantarimasti
          </h1>
          <p className="text-primary/60">Accedi o registrati per iniziare</p>
        </header>
        <AuthForm />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-6 animate-fadeIn">
      <header className="text-center mb-12">
        <div className="inline-block px-3 py-1 bg-primary/10 rounded-full text-primary text-sm mb-4">
          Fantasy League Manager
        </div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent mb-2">
          Fantarimasti
        </h1>
        <p className="text-primary/60">Gestisci la tua squadra e scala le classifiche</p>
        <div className="flex justify-center gap-2 mt-4">
          <Button 
            variant="outline"
            onClick={() => {
              supabase.auth.signOut();
              toast({
                title: "Logout effettuato",
                description: "Hai effettuato il logout con successo",
              });
            }}
          >
            Logout
          </Button>
          <Button
            variant="outline"
            onClick={() => setShowSettings(!showSettings)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Configurazione
          </Button>
        </div>
      </header>

      {showSettings && (
        <Card className="max-w-md mx-auto mb-8">
          <CardHeader>
            <CardTitle>Configurazione Google OAuth</CardTitle>
            <CardDescription>
              Inserisci le credenziali OAuth di Google per abilitare il login
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveGoogleSettings} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="clientId">Client ID</Label>
                <Input
                  id="clientId"
                  value={googleClientId}
                  onChange={(e) => setGoogleClientId(e.target.value)}
                  placeholder="Inserisci il Client ID di Google"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientSecret">Client Secret</Label>
                <Input
                  id="clientSecret"
                  type="password"
                  value={googleClientSecret}
                  onChange={(e) => setGoogleClientSecret(e.target.value)}
                  placeholder="Inserisci il Client Secret di Google"
                />
              </div>
              <Button type="submit" className="w-full">
                Salva configurazione
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue={activeTab} className="max-w-4xl mx-auto">
        <TabsList className="grid w-full max-w-2xl mx-auto mb-8 grid-cols-5">
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

        <div className="grid gap-6">
          <TabsContent value="rankings" className="grid gap-6 animate-fadeIn">
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
          </TabsContent>

          <TabsContent value="presidents" className="animate-fadeIn">
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
          </TabsContent>

          <TabsContent value="players" className="animate-fadeIn">
            <PlayersList />
          </TabsContent>

          <TabsContent value="market" className="animate-fadeIn">
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
          </TabsContent>

          <TabsContent value="rules" className="animate-fadeIn">
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
                        <li>CAMPIONI: {PLAYER_COSTS.CAMPIONI} punti</li>
                        <li>TOP: {PLAYER_COSTS.TOP} punti</li>
                        <li>SEMITOP: {PLAYER_COSTS.SEMITOP} punti</li>
                      </ul>
                    </section>

                    <section>
                      <h3 className="font-semibold mb-2">Penalità per Errori</h3>
                      <ul className="list-disc pl-4 space-y-2">
                        <li>Errore Semplice: {ERROR_POINTS.SIMPLE} punti</li>
                        <li>Errore Grave: {ERROR_POINTS.GRAVE} punti</li>
                        <li>Errore Colossale: {ERROR_POINTS.COLOSSALE} punti</li>
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
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
