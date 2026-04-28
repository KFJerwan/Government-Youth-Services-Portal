import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
  Calendar,
  MapPin,
  DollarSign,
  Users,
  ArrowRight,
  Search,
  X,
  CheckCircle,
  FileText,
  Clock,
  Phone,
  Mail,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const REGIONS_CAMEROUN = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];

const CATEGORIES = [
  "Entrepreneuriat", "Éducation", "Emploi", "Agriculture",
  "Santé", "Numérique", "Culture", "Sport",
];

const CATEGORY_COLORS: Record<string, string> = {
  Entrepreneuriat: "from-orange-500 to-amber-600",
  Éducation: "from-blue-500 to-indigo-600",
  Emploi: "from-green-500 to-emerald-600",
  Agriculture: "from-lime-500 to-green-600",
  Santé: "from-red-500 to-rose-600",
  Numérique: "from-purple-500 to-violet-600",
  Culture: "from-pink-500 to-fuchsia-600",
  Sport: "from-cyan-500 to-sky-600",
};

const CATEGORY_EMOJIS: Record<string, string> = {
  Entrepreneuriat: "🚀", Éducation: "📚", Emploi: "💼",
  Agriculture: "🌱", Santé: "🏥", Numérique: "💻",
  Culture: "🎨", Sport: "⚽",
};

type Program = {
  id: number;
  title: string;
  description: string;
  category: string;
  region?: string | null;
  fundingAmount?: string | null;
  maxApplicants?: number | null;
  applicationDeadline?: Date | string | null;
  requirements?: string | null;
  benefits?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  isActive: boolean;
};

function ProgramCard({
  program,
  onApply,
  isApplied,
}: {
  program: Program;
  onApply: (p: Program) => void;
  isApplied: boolean;
}) {
  const gradient = CATEGORY_COLORS[program.category] ?? "from-primary to-blue-700";
  const emoji = CATEGORY_EMOJIS[program.category] ?? "📋";
  const deadline = program.applicationDeadline
    ? new Date(program.applicationDeadline)
    : null;
  const isExpired = deadline ? deadline < new Date() : false;

  return (
    <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Card Header */}
      <div
        className={`h-36 bg-gradient-to-br ${gradient} flex items-center justify-center text-white relative overflow-hidden`}
      >
        <span className="text-5xl opacity-80 group-hover:scale-110 transition-transform duration-300">
          {emoji}
        </span>
        {isApplied && (
          <div className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5" />
            <span className="text-xs font-medium">Candidaté</span>
          </div>
        )}
        {isExpired && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-sm bg-black/50 px-3 py-1 rounded-full">
              Clôturé
            </span>
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col">
        <Badge variant="outline" className="w-fit mb-3 text-xs">
          {program.category}
        </Badge>

        <h3 className="text-lg font-bold text-foreground mb-2 leading-snug line-clamp-2">
          {program.title}
        </h3>
        <p className="text-sm text-muted-foreground mb-4 flex-1 line-clamp-3">
          {program.description}
        </p>

        {/* Details */}
        <div className="space-y-2 mb-5 text-sm">
          {program.region && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 shrink-0 text-primary" />
              <span>{program.region}</span>
            </div>
          )}
          {program.fundingAmount && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <DollarSign className="w-4 h-4 shrink-0 text-green-500" />
              <span className="font-medium text-foreground">
                {parseFloat(String(program.fundingAmount)).toLocaleString("fr-FR")} FCFA
              </span>
            </div>
          )}
          {program.maxApplicants && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <Users className="w-4 h-4 shrink-0 text-blue-500" />
              <span>{program.maxApplicants} places disponibles</span>
            </div>
          )}
          {deadline && (
            <div className={`flex items-center gap-2 ${isExpired ? "text-red-500" : "text-muted-foreground"}`}>
              <Clock className="w-4 h-4 shrink-0" />
              <span>
                {isExpired ? "Clôturé le " : "Deadline: "}
                {deadline.toLocaleDateString("fr-FR")}
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        {isApplied ? (
          <Button variant="outline" className="w-full" disabled>
            <CheckCircle className="mr-2 w-4 h-4 text-green-500" />
            Candidature envoyée
          </Button>
        ) : isExpired ? (
          <Button variant="outline" className="w-full" disabled>
            Programme clôturé
          </Button>
        ) : (
          <Button className="w-full" onClick={() => onApply(program)}>
            Candidater
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </Card>
  );
}

export default function Programs() {
  const { isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({ category: "", region: "", search: "" });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [applyNotes, setApplyNotes] = useState("");
  const [detailProgram, setDetailProgram] = useState<Program | null>(null);

  // Live query
  const { data: programs = [], isLoading } = trpc.programs.list.useQuery({
    category: filters.category || undefined,
    region: filters.region || undefined,
    search: debouncedSearch || undefined,
    limit: 50,
  });

  // My applications to check which ones I've already applied to
  const { data: myApps = [] } = trpc.programs.myApplications.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const appliedProgramIds = new Set(myApps.map((a) => a.programId));

  const applyMutation = trpc.programs.apply.useMutation({
    onSuccess: () => {
      toast.success("Candidature envoyée avec succès !");
      setSelectedProgram(null);
      setApplyNotes("");
    },
    onError: (err) => {
      toast.error(err.message || "Erreur lors de la candidature");
    },
  });

  const handleSearchChange = (val: string) => {
    setFilters((f) => ({ ...f, search: val }));
    clearTimeout((window as any).__searchTimer);
    (window as any).__searchTimer = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const resetFilters = () => {
    setFilters({ category: "", region: "", search: "" });
    setDebouncedSearch("");
  };

  const handleApply = (program: Program) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setSelectedProgram(program);
  };

  const handleSubmitApplication = () => {
    if (!selectedProgram) return;
    applyMutation.mutate({ programId: selectedProgram.id, notes: applyNotes || undefined });
  };

  const hasFilters = filters.category || filters.region || filters.search;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary to-blue-700 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Programmes Gouvernementaux
            </h1>
            <p className="text-blue-100 text-lg">
              Découvrez et candidatez aux programmes officiels conçus pour
              soutenir le développement de la jeunesse camerounaise.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters Bar */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un programme..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-9"
              />
            </div>

            {/* Category */}
            <Select
              value={filters.category}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, category: v === "_all" ? "" : v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes catégories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Toutes les catégories</SelectItem>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>
                    {CATEGORY_EMOJIS[c]} {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Region */}
            <Select
              value={filters.region}
              onValueChange={(v) =>
                setFilters((f) => ({ ...f, region: v === "_all" ? "" : v }))
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Toutes les régions" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Toutes les régions</SelectItem>
                {REGIONS_CAMEROUN.map((r) => (
                  <SelectItem key={r} value={r}>
                    {r}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Reset */}
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

        {/* Results count */}
        <p className="text-sm text-muted-foreground mb-6">
          {isLoading
            ? "Chargement..."
            : `${programs.length} programme${programs.length !== 1 ? "s" : ""} trouvé${programs.length !== 1 ? "s" : ""}`}
        </p>

        {/* Programs Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="overflow-hidden animate-pulse">
                <div className="h-36 bg-muted" />
                <div className="p-6 space-y-3">
                  <div className="h-3 bg-muted rounded w-1/4" />
                  <div className="h-5 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-full" />
                  <div className="h-3 bg-muted rounded w-2/3" />
                  <div className="h-10 bg-muted rounded mt-4" />
                </div>
              </Card>
            ))}
          </div>
        ) : programs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <ProgramCard
                key={program.id}
                program={program as Program}
                onApply={handleApply}
                isApplied={appliedProgramIds.has(program.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center">
            <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucun programme trouvé
            </h3>
            <p className="text-muted-foreground mb-6">
              Aucun programme ne correspond à vos critères de recherche.
            </p>
            {hasFilters && (
              <Button variant="outline" onClick={resetFilters}>
                Réinitialiser les filtres
              </Button>
            )}
          </Card>
        )}
      </div>

      {/* Application Dialog */}
      <Dialog
        open={!!selectedProgram}
        onOpenChange={(o) => {
          if (!o) {
            setSelectedProgram(null);
            setApplyNotes("");
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Candidater au programme</DialogTitle>
            <DialogDescription>
              {selectedProgram?.title}
            </DialogDescription>
          </DialogHeader>

          {selectedProgram && (
            <div className="space-y-5 py-2">
              {/* Program summary */}
              <div className="bg-muted/50 rounded-xl p-4 space-y-2 text-sm">
                {selectedProgram.region && (
                  <div className="flex gap-2 text-muted-foreground">
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>{selectedProgram.region}</span>
                  </div>
                )}
                {selectedProgram.fundingAmount && (
                  <div className="flex gap-2 text-muted-foreground">
                    <DollarSign className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      {parseFloat(String(selectedProgram.fundingAmount)).toLocaleString("fr-FR")} FCFA
                    </span>
                  </div>
                )}
                {selectedProgram.applicationDeadline && (
                  <div className="flex gap-2 text-muted-foreground">
                    <Calendar className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>
                      Deadline:{" "}
                      {new Date(selectedProgram.applicationDeadline).toLocaleDateString("fr-FR")}
                    </span>
                  </div>
                )}
              </div>

              {/* Requirements */}
              {selectedProgram.requirements && (
                <div>
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-2 block">
                    Conditions d'éligibilité
                  </Label>
                  <p className="text-sm text-foreground bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    {selectedProgram.requirements}
                  </p>
                </div>
              )}

              {/* Notes */}
              <div className="space-y-2">
                <Label htmlFor="notes">
                  Message de motivation{" "}
                  <span className="text-muted-foreground font-normal">(optionnel)</span>
                </Label>
                <Textarea
                  id="notes"
                  placeholder="Expliquez pourquoi vous souhaitez participer à ce programme, vos motivations et votre projet..."
                  value={applyNotes}
                  onChange={(e) => setApplyNotes(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Contact */}
              {(selectedProgram.contactEmail || selectedProgram.contactPhone) && (
                <div className="text-xs text-muted-foreground space-y-1">
                  <p className="font-medium text-foreground mb-1">Contact</p>
                  {selectedProgram.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${selectedProgram.contactEmail}`} className="hover:text-primary">
                        {selectedProgram.contactEmail}
                      </a>
                    </div>
                  )}
                  {selectedProgram.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedProgram.contactPhone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedProgram(null)}>
              Annuler
            </Button>
            <Button
              onClick={handleSubmitApplication}
              disabled={applyMutation.isPending}
            >
              {applyMutation.isPending ? "Envoi..." : "Envoyer ma candidature"}
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
