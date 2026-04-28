import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Clock,
  Users,
  Award,
  MapPin,
  ArrowRight,
  Search,
  X,
  CheckCircle,
  BookOpen,
  Monitor,
  Building,
  Layers,
  Calendar,
  UserCircle,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const DOMAINS = [
  { value: "Programmation", label: "Programmation", emoji: "💻" },
  { value: "Marketing Digital", label: "Marketing Digital", emoji: "📣" },
  { value: "Comptabilité", label: "Comptabilité", emoji: "📊" },
  { value: "Entrepreneuriat", label: "Entrepreneuriat", emoji: "🚀" },
  { value: "Design Graphique", label: "Design Graphique", emoji: "🎨" },
  { value: "Agriculture", label: "Agriculture", emoji: "🌱" },
  { value: "Santé", label: "Santé", emoji: "🏥" },
  { value: "Langues", label: "Langues", emoji: "🗣️" },
];

const DOMAIN_COLORS: Record<string, string> = {
  Programmation: "from-blue-500 to-indigo-600",
  "Marketing Digital": "from-pink-500 to-rose-600",
  Comptabilité: "from-green-500 to-emerald-600",
  Entrepreneuriat: "from-orange-500 to-amber-600",
  "Design Graphique": "from-purple-500 to-violet-600",
  Agriculture: "from-lime-500 to-green-600",
  Santé: "from-red-500 to-rose-600",
  Langues: "from-cyan-500 to-sky-600",
};

const LEVEL_LABELS: Record<string, { label: string; color: string }> = {
  beginner: { label: "Débutant", color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" },
  intermediate: { label: "Intermédiaire", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200" },
  advanced: { label: "Avancé", color: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200" },
};

const FORMAT_ICONS: Record<string, React.ReactNode> = {
  online: <Monitor className="w-4 h-4" />,
  offline: <Building className="w-4 h-4" />,
  hybrid: <Layers className="w-4 h-4" />,
};

const FORMAT_LABELS: Record<string, string> = {
  online: "En ligne",
  offline: "Présentiel",
  hybrid: "Hybride",
};

type Training = {
  id: number;
  title: string;
  description: string;
  domain: string;
  level: "beginner" | "intermediate" | "advanced";
  format: "online" | "offline" | "hybrid";
  duration?: string | null;
  startDate: Date | string;
  endDate: Date | string;
  maxParticipants?: number | null;
  currentParticipants: number;
  instructorName?: string | null;
  instructorBio?: string | null;
  certificateProvided: boolean;
  price?: string | null;
  region?: string | null;
};

function CapacityBar({ current, max }: { current: number; max?: number | null }) {
  if (!max) return null;
  const pct = Math.min((current / max) * 100, 100);
  const color = pct >= 90 ? "bg-red-500" : pct >= 60 ? "bg-yellow-500" : "bg-green-500";
  return (
    <div>
      <div className="flex justify-between text-xs text-muted-foreground mb-1">
        <span>{current} inscrits</span>
        <span>{max} places</span>
      </div>
      <div className="w-full bg-muted rounded-full h-1.5">
        <div className={`h-1.5 rounded-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function TrainingCard({
  training,
  onEnroll,
  isEnrolled,
}: {
  training: Training;
  onEnroll: (t: Training) => void;
  isEnrolled: boolean;
}) {
  const gradient = DOMAIN_COLORS[training.domain] ?? "from-primary to-blue-700";
  const domainItem = DOMAINS.find((d) => d.value === training.domain);
  const levelConfig = LEVEL_LABELS[training.level] ?? LEVEL_LABELS.beginner;
  const isFull =
    training.maxParticipants !== null &&
    training.maxParticipants !== undefined &&
    training.currentParticipants >= training.maxParticipants;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Header */}
      <div
        className={`h-32 bg-gradient-to-br ${gradient} flex flex-col items-center justify-center text-white px-4 relative`}
      >
        <span className="text-4xl mb-1 group-hover:scale-110 transition-transform duration-300">
          {domainItem?.emoji ?? "📖"}
        </span>
        <span className="text-xs font-medium opacity-90">{training.domain}</span>
        {isEnrolled && (
          <div className="absolute top-2 right-2 bg-white/20 backdrop-blur-sm rounded-full px-2 py-0.5 flex items-center gap-1">
            <CheckCircle className="w-3 h-3" />
            <span className="text-xs">Inscrit</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Level badge */}
        <span className={`text-xs font-medium px-2 py-0.5 rounded-full w-fit mb-3 ${levelConfig.color}`}>
          {levelConfig.label}
        </span>

        <h3 className="text-base font-bold text-foreground mb-2 line-clamp-2">{training.title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">{training.description}</p>

        {/* Details grid */}
        <div className="space-y-2 text-sm mb-4">
          {training.duration && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4 text-primary shrink-0" />
              <span>{training.duration}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-muted-foreground">
            {FORMAT_ICONS[training.format]}
            <span>{FORMAT_LABELS[training.format]}</span>
          </div>
          {training.region && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-primary shrink-0" />
              <span>{training.region}</span>
            </div>
          )}
          {training.instructorName && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <UserCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">{training.instructorName}</span>
            </div>
          )}
          {training.certificateProvided && (
            <div className="flex items-center gap-2 text-green-600">
              <Award className="w-4 h-4 shrink-0" />
              <span className="font-medium">Certificat fourni</span>
            </div>
          )}
        </div>

        {/* Capacity bar */}
        <div className="mb-4">
          <CapacityBar current={training.currentParticipants} max={training.maxParticipants} />
        </div>

        {/* Price tag */}
        <div className="flex items-center justify-between mb-4">
          <span className={`text-sm font-bold ${(!training.price || Number(training.price) === 0) ? "text-green-600" : "text-foreground"}`}>
            {(!training.price || Number(training.price) === 0) ? "🎁 Gratuit" : `${Number(training.price).toLocaleString("fr-FR")} FCFA`}
          </span>
          {isFull && (
            <Badge variant="destructive" className="text-xs">Complet</Badge>
          )}
        </div>

        {/* CTA */}
        {isEnrolled ? (
          <Button variant="outline" className="w-full" disabled>
            <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
            Déjà inscrit
          </Button>
        ) : isFull ? (
          <Button variant="outline" className="w-full" disabled>
            Formation complète
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onEnroll(training)}>
            S'inscrire
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function Trainings() {
  const { isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({ domain: "", level: "", format: "", search: "" });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  // Real data
  const { data: trainings = [], isLoading } = trpc.trainings.list.useQuery({
    domain: filters.domain || undefined,
    level: (filters.level as "beginner" | "intermediate" | "advanced") || undefined,
    format: (filters.format as "online" | "offline" | "hybrid") || undefined,
    search: debouncedSearch || undefined,
    limit: 50,
  });

  const { data: myEnrollments = [] } = trpc.trainings.myEnrollments.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const enrolledTrainingIds = new Set(myEnrollments.map((e) => e.trainingId));

  const enrollMutation = trpc.trainings.enroll.useMutation({
    onSuccess: () => {
      toast.success("Inscription confirmée ! Bonne formation 🎓");
      setSelectedTraining(null);
    },
    onError: (err) => {
      toast.error(err.message || "Erreur lors de l'inscription");
    },
  });

  const handleSearchChange = (val: string) => {
    setFilters((f) => ({ ...f, search: val }));
    clearTimeout((window as any).__searchTimerT);
    (window as any).__searchTimerT = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const resetFilters = () => {
    setFilters({ domain: "", level: "", format: "", search: "" });
    setDebouncedSearch("");
  };

  const handleEnroll = (training: Training) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setSelectedTraining(training);
  };

  const hasFilters = filters.domain || filters.level || filters.format || filters.search;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-700 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">Formations Disponibles</h1>
            <p className="text-green-100 text-lg">
              Développez vos compétences avec nos formations certifiantes, gratuites
              et accessibles à tous les jeunes camerounais.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filter bar */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            <div className="relative sm:col-span-2 md:col-span-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>

            <Select
              value={filters.domain}
              onValueChange={(v) => setFilters((f) => ({ ...f, domain: v === "_all" ? "" : v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Domaine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Tous les domaines</SelectItem>
                {DOMAINS.map((d) => (
                  <SelectItem key={d.value} value={d.value}>
                    {d.emoji} {d.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.level}
              onValueChange={(v) => setFilters((f) => ({ ...f, level: v === "_all" ? "" : v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Niveau" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Tous les niveaux</SelectItem>
                <SelectItem value="beginner">Débutant</SelectItem>
                <SelectItem value="intermediate">Intermédiaire</SelectItem>
                <SelectItem value="advanced">Avancé</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={filters.format}
              onValueChange={(v) => setFilters((f) => ({ ...f, format: v === "_all" ? "" : v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Tous les formats</SelectItem>
                <SelectItem value="online">🖥️ En ligne</SelectItem>
                <SelectItem value="offline">🏢 Présentiel</SelectItem>
                <SelectItem value="hybrid">🔄 Hybride</SelectItem>
              </SelectContent>
            </Select>

            {hasFilters ? (
              <Button variant="outline" onClick={resetFilters} className="gap-2">
                <X className="w-4 h-4" />
                Réinitialiser
              </Button>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* Count */}
        <p className="text-sm text-muted-foreground mb-6">
          {isLoading
            ? "Chargement..."
            : `${trainings.length} formation${trainings.length !== 1 ? "s" : ""} trouvée${trainings.length !== 1 ? "s" : ""}`}
        </p>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-32 bg-muted" />
                <div className="p-5 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/3" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-10 bg-muted rounded mt-4" />
                </div>
              </Card>
            ))}
          </div>
        ) : trainings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {trainings.map((training) => (
              <TrainingCard
                key={training.id}
                training={training as Training}
                onEnroll={handleEnroll}
                isEnrolled={enrolledTrainingIds.has(training.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center">
            <BookOpen className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucune formation trouvée
            </h3>
            <p className="text-muted-foreground mb-6">
              Aucune formation ne correspond à vos critères.
            </p>
            {hasFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Enrollment Confirmation Dialog */}
      <Dialog
        open={!!selectedTraining}
        onOpenChange={(o) => { if (!o) setSelectedTraining(null); }}
      >
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Confirmer l'inscription</DialogTitle>
            <DialogDescription>
              Vous allez vous inscrire à la formation suivante
            </DialogDescription>
          </DialogHeader>

          {selectedTraining && (
            <div className="space-y-4 py-2">
              <div className="bg-muted/50 rounded-xl p-4 space-y-3 text-sm">
                <p className="font-semibold text-foreground text-base">
                  {selectedTraining.title}
                </p>
                <p className="text-muted-foreground">{selectedTraining.description}</p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  {selectedTraining.duration && (
                    <div className="flex items-center gap-1.5 text-muted-foreground">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{selectedTraining.duration}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    {FORMAT_ICONS[selectedTraining.format]}
                    <span>{FORMAT_LABELS[selectedTraining.format]}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(selectedTraining.startDate).toLocaleDateString("fr-FR")}</span>
                  </div>
                  {selectedTraining.certificateProvided && (
                    <div className="flex items-center gap-1.5 text-green-600 font-medium">
                      <Award className="w-3.5 h-3.5" />
                      <span>Certificat inclus</span>
                    </div>
                  )}
                </div>
              </div>

              {selectedTraining.instructorName && (
                <div className="flex items-center gap-3 px-1">
                  <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center">
                    <UserCircle className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {selectedTraining.instructorName}
                    </p>
                    <p className="text-xs text-muted-foreground">Formateur</p>
                  </div>
                </div>
              )}

              <p className="text-xs text-muted-foreground bg-blue-50 dark:bg-blue-900/20 rounded-lg px-3 py-2">
                ℹ️ En vous inscrivant, une place vous sera réservée. Vous pourrez
                annuler depuis votre tableau de bord.
              </p>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedTraining(null)}>
              Annuler
            </Button>
            <Button
              onClick={() =>
                selectedTraining && enrollMutation.mutate({ trainingId: selectedTraining.id })
              }
              disabled={enrollMutation.isPending}
            >
              {enrollMutation.isPending ? "Inscription..." : "Confirmer l'inscription"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
