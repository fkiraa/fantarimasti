
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Award, AlertCircle, Users, CheckCircle, Shuffle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  points: number;
}

interface UserAchievement {
  achievement_id: string;
}

const iconMap: { [key: string]: any } = {
  'award': Award,
  'alert-circle': AlertCircle,
  'users': Users,
  'check-circle': CheckCircle,
  'shuffle': Shuffle,
};

export const AchievementsList = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [userAchievements, setUserAchievements] = useState<string[]>([]);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    // Fetch all achievements
    const { data: achievementsData } = await supabase
      .from('achievements')
      .select('*');

    // Fetch user's achievements
    const { data: userAchievementsData } = await supabase
      .from('user_achievements')
      .select('achievement_id')
      .eq('profile_id', user.id);

    if (achievementsData) setAchievements(achievementsData);
    if (userAchievementsData) {
      setUserAchievements(userAchievementsData.map(ua => ua.achievement_id));
    }
  };

  return (
    <Card className="backdrop-blur-lg bg-white/90">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Award className="h-5 w-5 text-yellow-500" />
          Achievement
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {achievements.map((achievement) => {
            const Icon = iconMap[achievement.icon] || Award;
            const isUnlocked = userAchievements.includes(achievement.id);

            return (
              <div
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  isUnlocked ? 'bg-primary/10 border-primary' : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`h-8 w-8 ${isUnlocked ? 'text-primary' : 'text-gray-400'}`} />
                  <div>
                    <h3 className="font-semibold">{achievement.name}</h3>
                    <p className="text-sm text-primary/60">{achievement.description}</p>
                  </div>
                </div>
                <div className="mt-2 text-sm font-medium text-right">
                  {achievement.points} punti
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
