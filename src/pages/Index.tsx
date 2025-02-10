
import { useState, useEffect } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import AuthForm from "@/components/auth/AuthForm";
import PlayersList from "@/components/players/PlayersList";
import { StatisticsCard } from "@/components/stats/StatisticsCard";
import { AchievementsList } from "@/components/achievements/AchievementsList";
import { Header } from "@/components/layout/Header";
import { TabList } from "@/components/tabs/TabList";
import { RankingsTab } from "@/components/tabs/RankingsTab";
import { PresidentsTab } from "@/components/tabs/PresidentsTab";
import { MarketTab } from "@/components/tabs/MarketTab";
import { RulesTab } from "@/components/tabs/RulesTab";
import { ProfileCard } from "@/components/profile/ProfileCard";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [session, setSession] = useState<any>(null);
  const [stats, setStats] = useState({
    totalPoints: 0,
    weeklyPoints: 0,
    monthlyPoints: 0,
    totalErrors: 0
  });
  const isMobile = useIsMobile();

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

  useEffect(() => {
    if (session?.user) {
      fetchStatistics();
    }
  }, [session]);

  const fetchStatistics = async () => {
    const { data, error } = await supabase
      .from('statistics')
      .select('*')
      .eq('profile_id', session.user.id)
      .single();

    if (error) {
      console.error('Error fetching statistics:', error);
      return;
    }

    if (data) {
      setStats({
        totalPoints: data.total_points,
        weeklyPoints: data.weekly_points,
        monthlyPoints: data.monthly_points,
        totalErrors: data.total_errors
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
      <Header setActiveTab={setActiveTab} />

      <Tabs defaultValue={activeTab} className="max-w-6xl mx-auto">
        {!isMobile && <TabList setActiveTab={setActiveTab} />}

        <div className="grid gap-6">
          <TabsContent value="dashboard" className="grid gap-6 animate-fadeIn">
            <StatisticsCard {...stats} />
            <AchievementsList />
          </TabsContent>

          <TabsContent value="rankings" className="grid gap-6 animate-fadeIn">
            <RankingsTab />
          </TabsContent>

          <TabsContent value="presidents" className="animate-fadeIn">
            <PresidentsTab />
          </TabsContent>

          <TabsContent value="players" className="animate-fadeIn">
            <PlayersList />
          </TabsContent>

          <TabsContent value="market" className="animate-fadeIn">
            <MarketTab />
          </TabsContent>

          <TabsContent value="profile" className="animate-fadeIn">
            <ProfileCard user={session.user} />
          </TabsContent>

          <TabsContent value="rules" className="animate-fadeIn">
            <RulesTab />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Index;
