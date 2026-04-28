import { useAuth } from "@/_core/hooks/useAuth";
import { useLocation } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Edit, Trash2, CheckCircle, XCircle, Clock } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();

  const [, navigate] = useLocation();

  // Vérifier que l'utilisateur est admin
  if (user?.role !== "admin") {
    navigate("/");
    return null;
  }

  // Mock data for admin dashboard
  const stats = {
    totalPrograms: 12,
    totalApplications: 156,
    pendingApplications: 45,
    totalTrainings: 8,
    totalUsers: 342,
  };

  const pendingApplications = [
    {
      id: 1,
      userName: "Jean Dupont",
      programName: "Programme d'Entrepreneuriat",
      submittedDate: "2026-04-10",
      status: "pending",
    },
    {
      id: 2,
      userName: "Marie Leblanc",
      programName: "Bourse d'Études",
      submittedDate: "2026-04-12",
      status: "pending",
    },
    {
      id: 3,
      userName: "Pierre Martin",
      programName: "Formation Numérique",
      submittedDate: "2026-04-13",
      status: "pending",
    },
  ];

  const programs = [
    {
      id: 1,
      title: "Programme d'Entrepreneuriat Jeunesse",
      category: "entrepreneurship",
      applicants: 45,
      status: "active",
    },
    {
      id: 2,
      title: "Bourse d'Études Supérieures",
      category: "education",
      applicants: 32,
      status: "active",
    },
    {
      id: 3,
      title: "Programme d'Insertion Professionnelle",
      category: "employment",
      applicants: 28,
      status: "active",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-red-600 to-orange-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-red-100">
            Gérez les programmes, candidatures, formations et utilisateurs
          </p>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Programmes</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalPrograms}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Candidatures Totales</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalApplications}</p>
          </Card>
          <Card className="p-6 border-l-4 border-l-yellow-500">
            <p className="text-sm text-muted-foreground mb-1">En Attente</p>
            <p className="text-3xl font-bold text-yellow-600">{stats.pendingApplications}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Formations</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalTrainings}</p>
          </Card>
          <Card className="p-6">
            <p className="text-sm text-muted-foreground mb-1">Utilisateurs</p>
            <p className="text-3xl font-bold text-foreground">{stats.totalUsers}</p>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="applications" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="programs">Programmes</TabsTrigger>
            <TabsTrigger value="trainings">Formations</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Candidatures en Attente</h2>
              <Button variant="outline" size="sm">
                Exporter
              </Button>
            </div>

            <div className="space-y-4">
              {pendingApplications.map((app) => (
                <Card key={app.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-1">
                        {app.userName}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        {app.programName}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Soumise le{" "}
                        {new Date(app.submittedDate).toLocaleDateString("fr-FR")}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approuver
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Rejeter
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Programs Tab */}
          <TabsContent value="programs" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gérer les Programmes</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Programme
              </Button>
            </div>

            <div className="space-y-4">
              {programs.map((program) => (
                <Card key={program.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-foreground mb-2">
                        {program.title}
                      </h3>
                      <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>Catégorie: {program.category}</span>
                        <span>Candidatures: {program.applicants}</span>
                        <span className="inline-block px-2 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded text-xs">
                          Actif
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="destructive">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trainings Tab */}
          <TabsContent value="trainings" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gérer les Formations</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Formation
              </Button>
            </div>

            <Card className="p-12 text-center">
              <p className="text-muted-foreground mb-4">
                Aucune formation à afficher
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Créer une Formation
              </Button>
            </Card>
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users" className="space-y-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gérer les Utilisateurs</h2>
              <Button variant="outline" size="sm">
                Exporter
              </Button>
            </div>

            <Card className="p-6 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-2">Nom</th>
                    <th className="text-left py-2 px-2">Email</th>
                    <th className="text-left py-2 px-2">Région</th>
                    <th className="text-left py-2 px-2">Inscription</th>
                    <th className="text-left py-2 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">Jean Dupont</td>
                    <td className="py-3 px-2">jean@example.com</td>
                    <td className="py-3 px-2">Centre</td>
                    <td className="py-3 px-2">2026-03-15</td>
                    <td className="py-3 px-2">
                      <Button size="sm" variant="outline">
                        Voir
                      </Button>
                    </td>
                  </tr>
                  <tr className="border-b hover:bg-muted/50">
                    <td className="py-3 px-2">Marie Leblanc</td>
                    <td className="py-3 px-2">marie@example.com</td>
                    <td className="py-3 px-2">Littoral</td>
                    <td className="py-3 px-2">2026-03-20</td>
                    <td className="py-3 px-2">
                      <Button size="sm" variant="outline">
                        Voir
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
