# Guide de Développement - Portail des Services Gouvernementaux pour la Jeunesse

## Table des Matières

1. [Architecture Technique](#architecture-technique)
2. [Structure du Projet](#structure-du-projet)
3. [Guide d'Implémentation](#guide-dimplémentation)
4. [Modules à Développer](#modules-à-développer)
5. [Bonnes Pratiques](#bonnes-pratiques)
6. [Déploiement](#déploiement)

---

## Architecture Technique

### Stack Technologique

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | React 19 + TypeScript | 19.2.1 |
| **Styling** | Tailwind CSS 4 + OKLCH | 4.1.14 |
| **Backend** | Node.js + Express | 4.21.2 |
| **API** | tRPC 11 | 11.6.0 |
| **Base de Données** | MySQL/TiDB + Drizzle | 0.44.5 |
| **Authentification** | Manus OAuth | Intégré |
| **Notifications** | Système in-app + Email | Personnalisé |
| **Stockage** | S3 (Images, Documents) | AWS SDK |

### Architecture Globale

```
┌─────────────────────────────────────────────────────────────┐
│                     Client (React 19)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Pages        │  │ Components   │  │ Hooks        │       │
│  │ - Home       │  │ - MainLayout │  │ - useAuth    │       │
│  │ - Dashboard  │  │ - Cards      │  │ - useQuery   │       │
│  │ - Programs   │  │ - Forms      │  │ - useMutation│       │
│  │ - Trainings  │  │ - Tables     │  │              │       │
│  │ - Admin      │  │ - Modals     │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓ tRPC
┌─────────────────────────────────────────────────────────────┐
│                  Backend (Express + tRPC)                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Routers      │  │ Procedures   │  │ Middleware   │       │
│  │ - programs   │  │ - list       │  │ - Auth       │       │
│  │ - trainings  │  │ - create     │  │ - Validation │       │
│  │ - apps       │  │ - update     │  │ - Logging    │       │
│  │ - admin      │  │ - delete     │  │              │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↓ SQL
┌─────────────────────────────────────────────────────────────┐
│                   Database (MySQL/TiDB)                      │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐    │
│  │ users    │  │ programs │  │ trainings│  │ opps     │    │
│  │ apps     │  │ enroll   │  │ notif    │  │ audit    │    │
│  └──────────┘  └──────────┘  └──────────┘  └──────────┘    │
└─────────────────────────────────────────────────────────────┘
```

---

## Structure du Projet

```
PortailJeunesse/
├── client/                          # Frontend React
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.tsx            # Landing page
│   │   │   ├── Dashboard.tsx       # User dashboard
│   │   │   ├── Programs.tsx        # Programs listing (À créer)
│   │   │   ├── Trainings.tsx       # Trainings listing (À créer)
│   │   │   ├── Opportunities.tsx   # Opportunities listing (À créer)
│   │   │   ├── Admin.tsx           # Admin panel (À créer)
│   │   │   └── NotFound.tsx
│   │   ├── components/
│   │   │   ├── MainLayout.tsx      # Main layout with nav
│   │   │   ├── ProgramCard.tsx     # Program card component (À créer)
│   │   │   ├── ApplicationForm.tsx # Application form (À créer)
│   │   │   └── ui/                 # shadcn/ui components
│   │   ├── contexts/
│   │   │   └── ThemeContext.tsx
│   │   ├── _core/
│   │   │   └── hooks/
│   │   │       └── useAuth.ts
│   │   ├── lib/
│   │   │   └── trpc.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   └── index.css
│   ├── public/
│   │   ├── favicon.ico
│   │   └── robots.txt
│   └── index.html
│
├── server/                          # Backend Express + tRPC
│   ├── routers.ts                  # Main router
│   ├── db.ts                       # Database queries
│   ├── _core/
│   │   ├── index.ts                # Server entry point
│   │   ├── context.ts              # tRPC context
│   │   ├── trpc.ts                 # tRPC setup
│   │   ├── auth.ts                 # Auth logic
│   │   ├── llm.ts                  # LLM integration
│   │   ├── notification.ts         # Notifications
│   │   └── env.ts                  # Environment variables
│   ├── auth.logout.test.ts         # Test example
│   └── storage.ts                  # S3 storage helpers
│
├── drizzle/                         # Database schema
│   ├── schema.ts                   # All table definitions
│   ├── 0001_solid_scarlet_spider.sql  # Migration
│   └── drizzle.config.ts
│
├── shared/                          # Shared types/constants
│   └── const.ts
│
├── package.json
├── tsconfig.json
├── vite.config.ts
├── drizzle.config.ts
├── todo.md                         # Project tracking
└── GUIDE_DEVELOPMENT.md            # This file
```

---

## Guide d'Implémentation

### Phase 3: Module Utilisateur (Tableau de Bord)

#### 3.1 Créer les Procédures tRPC pour les Candidatures

**Fichier: `server/routers.ts`**

```typescript
// Ajouter dans appRouter
applications: router({
  // Récupérer les candidatures de l'utilisateur
  list: protectedProcedure
    .input(z.object({
      status: z.enum(['pending', 'approved', 'rejected', 'withdrawn']).optional(),
      limit: z.number().default(10),
      offset: z.number().default(0),
    }))
    .query(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const apps = await db
        .select()
        .from(programApplications)
        .where(eq(programApplications.userId, ctx.user.id))
        .limit(input.limit)
        .offset(input.offset);
      
      return apps;
    }),

  // Créer une nouvelle candidature
  create: protectedProcedure
    .input(z.object({
      programId: z.number(),
      attachments: z.array(z.string()).optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const db = await getDb();
      if (!db) throw new Error('Database not available');
      
      const app = await db
        .insert(programApplications)
        .values({
          userId: ctx.user.id,
          programId: input.programId,
          status: 'pending',
          attachments: JSON.stringify(input.attachments || []),
        });
      
      // Créer une notification
      await db.insert(notifications).values({
        userId: ctx.user.id,
        type: 'application_status',
        title: 'Candidature Soumise',
        message: 'Votre candidature a été soumise avec succès',
        relatedEntityType: 'program',
        relatedEntityId: input.programId,
      });
      
      return app;
    }),
}),
```

#### 3.2 Créer le Composant ApplicationCard

**Fichier: `client/src/components/ApplicationCard.tsx`**

```typescript
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, XCircle } from "lucide-react";

interface ApplicationCardProps {
  id: number;
  title: string;
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  submittedDate: Date;
  reviewedDate?: Date;
  rejectionReason?: string;
}

export default function ApplicationCard({
  id,
  title,
  status,
  submittedDate,
  reviewedDate,
  rejectionReason,
}: ApplicationCardProps) {
  const statusConfig = {
    pending: {
      icon: Clock,
      color: 'border-l-yellow-500',
      bgColor: 'bg-yellow-100 dark:bg-yellow-900',
      textColor: 'text-yellow-800 dark:text-yellow-200',
      label: 'En Attente',
    },
    approved: {
      icon: CheckCircle,
      color: 'border-l-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900',
      textColor: 'text-green-800 dark:text-green-200',
      label: 'Approuvée',
    },
    rejected: {
      icon: XCircle,
      color: 'border-l-red-500',
      bgColor: 'bg-red-100 dark:bg-red-900',
      textColor: 'text-red-800 dark:text-red-200',
      label: 'Rejetée',
    },
    withdrawn: {
      icon: XCircle,
      color: 'border-l-gray-500',
      bgColor: 'bg-gray-100 dark:bg-gray-900',
      textColor: 'text-gray-800 dark:text-gray-200',
      label: 'Retirée',
    },
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Card className={`p-6 border-l-4 ${config.color}`}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Icon className={`w-5 h-5 ${config.textColor}`} />
            <h3 className="text-lg font-semibold text-foreground">{title}</h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            Soumise le {new Date(submittedDate).toLocaleDateString('fr-FR')}
          </p>
          <div className={`inline-block px-3 py-1 ${config.bgColor} ${config.textColor} rounded-full text-xs font-medium`}>
            {config.label}
          </div>
          {rejectionReason && (
            <p className="text-sm text-destructive mt-2">
              Raison: {rejectionReason}
            </p>
          )}
        </div>
        <Button variant="outline" size="sm">
          Voir Détails
        </Button>
      </div>
    </Card>
  );
}
```

### Phase 4: Modules de Programmes, Formations et Opportunités

#### 4.1 Créer la Page Programs

**Fichier: `client/src/pages/Programs.tsx`**

```typescript
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2 } from "lucide-react";

export default function Programs() {
  const [filters, setFilters] = useState({
    category: '',
    region: '',
    search: '',
  });

  // À implémenter: Créer la procédure tRPC programs.list
  // const { data: programs, isLoading } = trpc.programs.list.useQuery(filters);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Programmes Gouvernementaux</h1>
          <p className="text-blue-100">Découvrez les programmes disponibles pour votre développement</p>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Input
            placeholder="Rechercher un programme..."
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
          <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Catégorie" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les catégories</SelectItem>
              <SelectItem value="employment">Emploi</SelectItem>
              <SelectItem value="education">Éducation</SelectItem>
              <SelectItem value="entrepreneurship">Entrepreneuriat</SelectItem>
              <SelectItem value="other">Autre</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filters.region} onValueChange={(value) => setFilters({ ...filters, region: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Région" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">Toutes les régions</SelectItem>
              <SelectItem value="centre">Centre</SelectItem>
              <SelectItem value="littoral">Littoral</SelectItem>
              <SelectItem value="sud">Sud</SelectItem>
            </SelectContent>
          </Select>
          <Button className="w-full">Filtrer</Button>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* À remplacer par la boucle sur les données */}
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-lg font-bold text-foreground mb-2">Programme d'Entrepreneuriat</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Soutenez votre projet entrepreneurial avec nos ressources et financements
            </p>
            <div className="space-y-2 mb-4">
              <p className="text-xs text-muted-foreground"><strong>Région:</strong> Centre</p>
              <p className="text-xs text-muted-foreground"><strong>Deadline:</strong> 30 avril 2026</p>
              <p className="text-xs text-muted-foreground"><strong>Financement:</strong> 5,000,000 FCFA</p>
            </div>
            <Button className="w-full">Candidater</Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
```

### Phase 5: Espace Administrateur

#### 5.1 Créer la Page Admin

**Fichier: `client/src/pages/Admin.tsx`**

```typescript
import { useAuth } from "@/_core/hooks/useAuth";
import { Navigate } from "wouter";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Admin() {
  const { user } = useAuth();

  // Vérifier que l'utilisateur est admin
  if (user?.role !== 'admin') {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Tableau de Bord Administrateur</h1>
          <p className="text-blue-100">Gérez les programmes, candidatures et utilisateurs</p>
        </div>
      </div>

      {/* Admin Tabs */}
      <div className="container mx-auto px-4 py-12">
        <Tabs defaultValue="programs" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="programs">Programmes</TabsTrigger>
            <TabsTrigger value="applications">Candidatures</TabsTrigger>
            <TabsTrigger value="trainings">Formations</TabsTrigger>
            <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          </TabsList>

          {/* Programs Tab */}
          <TabsContent value="programs">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gérer les Programmes</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouveau Programme
              </Button>
            </div>
            {/* Programme list table - À implémenter */}
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <h2 className="text-2xl font-bold mb-6">Valider les Candidatures</h2>
            {/* Applications table - À implémenter */}
          </TabsContent>

          {/* Trainings Tab */}
          <TabsContent value="trainings">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Gérer les Formations</h2>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Nouvelle Formation
              </Button>
            </div>
            {/* Trainings list table - À implémenter */}
          </TabsContent>

          {/* Users Tab */}
          <TabsContent value="users">
            <h2 className="text-2xl font-bold mb-6">Gérer les Utilisateurs</h2>
            {/* Users list table - À implémenter */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
```

---

## Modules à Développer

### Priorité 1 (Critique)

1. **Procédures tRPC pour Programs**
   - `programs.list` - Récupérer la liste des programmes
   - `programs.getById` - Récupérer un programme spécifique
   - `programs.create` (admin) - Créer un programme
   - `programs.update` (admin) - Mettre à jour un programme
   - `programs.delete` (admin) - Supprimer un programme

2. **Procédures tRPC pour Applications**
   - `applications.list` - Récupérer les candidatures de l'utilisateur
   - `applications.create` - Soumettre une candidature
   - `applications.approve` (admin) - Approuver une candidature
   - `applications.reject` (admin) - Rejeter une candidature

3. **Pages Frontend**
   - `/programs` - Liste des programmes
   - `/programs/:id` - Détails du programme
   - `/trainings` - Liste des formations
   - `/opportunities` - Liste des opportunités

### Priorité 2 (Important)

1. **Système de Notifications**
   - Notifications in-app
   - Notifications par email
   - Déclencheurs automatiques

2. **Espace Administrateur**
   - Tableau de bord admin
   - Gestion des programmes
   - Validation des candidatures
   - Gestion des utilisateurs

3. **Profil Utilisateur**
   - Édition du profil
   - Upload de photo
   - Historique des candidatures

### Priorité 3 (Améliorations)

1. **Recherche et Filtrage Avancés**
2. **Système de Favoris**
3. **Partage sur les Réseaux Sociaux**
4. **Analytics et Statistiques**

---

## Bonnes Pratiques

### Frontend

1. **Composants Réutilisables**
   - Créer des composants génériques (Card, Button, Input)
   - Utiliser les composants shadcn/ui
   - Éviter la duplication de code

2. **Gestion d'État**
   - Utiliser tRPC pour les données serveur
   - Utiliser useState pour l'état local
   - Implémenter les mises à jour optimistes

3. **Performance**
   - Lazy loading des images
   - Code splitting des pages
   - Pagination pour les listes longues

### Backend

1. **Sécurité**
   - Valider toutes les entrées avec Zod
   - Vérifier les permissions avec `protectedProcedure`
   - Utiliser des enums pour les statuts

2. **Gestion des Erreurs**
   - Utiliser les erreurs tRPC appropriées
   - Fournir des messages d'erreur clairs
   - Logger les erreurs

3. **Performance**
   - Utiliser les indices de base de données
   - Implémenter la pagination
   - Cacher les résultats quand possible

### Base de Données

1. **Schéma**
   - Utiliser les types appropriés
   - Ajouter des contraintes
   - Documenter les relations

2. **Migrations**
   - Générer avec Drizzle Kit
   - Tester les migrations
   - Garder l'historique

---

## Déploiement

### Avant le Déploiement

1. **Tests**
   ```bash
   pnpm test
   ```

2. **Build**
   ```bash
   pnpm build
   ```

3. **Vérification TypeScript**
   ```bash
   pnpm check
   ```

### Déploiement sur Manus

1. Créer un checkpoint
2. Cliquer sur "Publish" dans l'interface Manus
3. Configurer le domaine personnalisé
4. Activer HTTPS

---

## Ressources Utiles

- [Documentation tRPC](https://trpc.io/docs)
- [Documentation Drizzle](https://orm.drizzle.team)
- [Documentation Tailwind CSS](https://tailwindcss.com)
- [Documentation shadcn/ui](https://ui.shadcn.com)
- [Documentation React](https://react.dev)

---

## Support

Pour toute question ou problème, veuillez consulter la documentation du projet ou contacter l'équipe de développement.

**Bon développement ! 🚀**
