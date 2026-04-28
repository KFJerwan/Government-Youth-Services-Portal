import { useAuth } from "@/_core/hooks/useAuth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Clock, XCircle, FileText, BookOpen, Briefcase } from "lucide-react";

export default function Dashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Bienvenue, {user?.name || "Utilisateur"}</h1>
          <p className="text-blue-100">Gérez vos candidatures, formations et opportunités</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Candidatures Actives</p>
                <p className="text-3xl font-bold text-foreground">3</p>
              </div>
              <FileText className="w-12 h-12 text-primary opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Formations Suivies</p>
                <p className="text-3xl font-bold text-foreground">2</p>
              </div>
              <BookOpen className="w-12 h-12 text-blue-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Opportunités Sauvegardées</p>
                <p className="text-3xl font-bold text-foreground">7</p>
              </div>
              <Briefcase className="w-12 h-12 text-green-500 opacity-20" />
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Profil Complétude</p>
                <p className="text-3xl font-bold text-foreground">75%</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-yellow-500 opacity-20 flex items-center justify-center">
                <span className="text-xs font-bold">75%</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="applications">Mes Candidatures</TabsTrigger>
            <TabsTrigger value="trainings">Mes Formations</TabsTrigger>
            <TabsTrigger value="profile">Mon Profil</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Mes Candidatures</h2>
              <Button>Nouvelle Candidature</Button>
            </div>

            {/* Application Cards */}
            <div className="space-y-4">
              {/* Pending Application */}
              <Card className="p-6 border-l-4 border-l-yellow-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="w-5 h-5 text-yellow-500" />
                      <h3 className="text-lg font-semibold text-foreground">Programme d'Entrepreneuriat Jeunesse</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Candidature soumise le 10 avril 2026</p>
                    <div className="inline-block px-3 py-1 bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 rounded-full text-xs font-medium">
                      En Attente
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Voir Détails</Button>
                </div>
              </Card>

              {/* Approved Application */}
              <Card className="p-6 border-l-4 border-l-green-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <h3 className="text-lg font-semibold text-foreground">Bourse d'Études Supérieures</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Approuvée le 8 avril 2026</p>
                    <div className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full text-xs font-medium">
                      Approuvée
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Voir Détails</Button>
                </div>
              </Card>

              {/* Rejected Application */}
              <Card className="p-6 border-l-4 border-l-red-500">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <XCircle className="w-5 h-5 text-red-500" />
                      <h3 className="text-lg font-semibold text-foreground">Stage Professionnel - Secteur Tech</h3>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">Rejetée le 5 avril 2026</p>
                    <div className="inline-block px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-xs font-medium">
                      Rejetée
                    </div>
                  </div>
                  <Button variant="outline" size="sm">Voir Détails</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Trainings Tab */}
          <TabsContent value="trainings" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-foreground">Mes Formations</h2>
              <Button>Découvrir Formations</Button>
            </div>

            <div className="space-y-4">
              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Python pour Débutants</h3>
                    <p className="text-sm text-muted-foreground mb-3">Durée: 4 semaines | En ligne</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "65%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">65% complété</p>
                  </div>
                  <Button variant="outline" size="sm">Continuer</Button>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-foreground mb-2">Marketing Digital Essentials</h3>
                    <p className="text-sm text-muted-foreground mb-3">Durée: 6 semaines | Hybride</p>
                    <div className="w-full bg-muted rounded-full h-2 mb-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "30%" }}></div>
                    </div>
                    <p className="text-xs text-muted-foreground">30% complété</p>
                  </div>
                  <Button variant="outline" size="sm">Continuer</Button>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground mb-6">Mon Profil</h2>

            <Card className="p-6">
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-2xl">
                      {(user?.name || "U").charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{user?.name}</h3>
                    <p className="text-sm text-muted-foreground">{user?.email}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-foreground">Téléphone</label>
                    <p className="text-muted-foreground">{user?.phone || "Non renseigné"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Région</label>
                    <p className="text-muted-foreground">{user?.region || "Non renseignée"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Ville</label>
                    <p className="text-muted-foreground">{user?.city || "Non renseignée"}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground">Date de Naissance</label>
                    <p className="text-muted-foreground">Non renseignée</p>
                  </div>
                </div>

                <Button className="w-full md:w-auto">Modifier Mon Profil</Button>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
