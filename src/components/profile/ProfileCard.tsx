import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { User } from "@supabase/supabase-js";
import { Camera, ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface ProfileData {
  avatar_url: string | null;
  full_name: string | null;
  description: string | null;
}

export const ProfileCard = ({ user }: { user: User | null }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState<ProfileData>({
    avatar_url: null,
    full_name: null,
    description: null,
  });
  const { toast } = useToast();

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("avatar_url, full_name, description")
        .eq("id", user.id)
        .maybeSingle();

      if (error) throw error;
      if (data) {
        setProfile(data);
      } else {
        // Se il profilo non esiste, creiamolo
        const { error: insertError } = await supabase
          .from("profiles")
          .insert([{ id: user.id }]);

        if (insertError) throw insertError;
      }
    } catch (error: any) {
      console.error("Error fetching profile:", error.message);
    }
  };

  const uploadAvatar = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setLoading(true);
      
      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("Devi selezionare un'immagine da caricare.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${user.id}/${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      setProfile({ ...profile, avatar_url: publicUrl });
      toast({
        title: "Successo",
        description: "Immagine profilo aggiornata con successo!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (data: Partial<ProfileData>) => {
    try {
      setLoading(true);
      const { error } = await supabase
        .from("profiles")
        .update(data)
        .eq("id", user.id);

      if (error) throw error;

      setProfile({ ...profile, ...data });
      toast({
        title: "Successo",
        description: "Profilo aggiornato con successo!",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Errore",
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-6">
          <p>Devi effettuare l'accesso per vedere il profilo.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Button 
        variant="ghost" 
        className="flex items-center gap-2" 
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="w-4 h-4" />
        Torna indietro
      </Button>
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Il tuo profilo</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <Avatar className="w-24 h-24">
              <AvatarImage src={profile.avatar_url || ""} />
              <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div className="flex items-center gap-2">
              <Input
                type="file"
                accept="image/*"
                onChange={uploadAvatar}
                disabled={loading}
                className="hidden"
                id="avatar-upload"
              />
              <Button
                variant="outline"
                size="sm"
                disabled={loading}
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                <Camera className="w-4 h-4 mr-2" />
                Cambia foto
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="full-name">Nome completo</Label>
              <Input
                id="full-name"
                value={profile.full_name || ""}
                onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                placeholder="Il tuo nome completo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrizione</Label>
              <Textarea
                id="description"
                value={profile.description || ""}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                placeholder="Scrivi qualcosa su di te..."
                rows={4}
              />
            </div>

            <Button
              className="w-full"
              onClick={() => updateProfile({
                full_name: profile.full_name,
                description: profile.description,
              })}
              disabled={loading}
            >
              Salva modifiche
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
