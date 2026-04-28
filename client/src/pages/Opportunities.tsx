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
  Briefcase,
  MapPin,
  Clock,
  DollarSign,
  Building2,
  ArrowRight,
  Search,
  X,
  CheckCircle,
  GraduationCap,
  Calendar,
  PartyPopper,
  Mail,
  Phone,
  ExternalLink,
} from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { toast } from "sonner";

const REGIONS_CAMEROUN = [
  "Adamaoua", "Centre", "Est", "Extrême-Nord", "Littoral",
  "Nord", "Nord-Ouest", "Ouest", "Sud", "Sud-Ouest",
];

const OPPORTUNITY_TYPES = [
  { value: "job", label: "Emploi", icon: Briefcase, color: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200", gradient: "from-blue-500 to-blue-700", emoji: "💼" },
  { value: "internship", label: "Stage", icon: Clock, color: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200", gradient: "from-purple-500 to-violet-600", emoji: "📋" },
  { value: "scholarship", label: "Bourse", icon: GraduationCap, color: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200", gradient: "from-green-500 to-emerald-600", emoji: "🎓" },
  { value: "event", label: "Événement", icon: PartyPopper, color: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200", gradient: "from-orange-500 to-amber-600", emoji: "🎉" },
];

const DOMAINS = [
  "Technologie", "Marketing", "Finance", "Santé", "Éducation",
  "Agriculture", "Management", "Entrepreneuriat", "Juridique", "Art & Culture",
];

type Opportunity = {
  id: number;
  title: string;
  description: string;
  type: "job" | "internship" | "scholarship" | "event";
  domain?: string | null;
  region?: string | null;
  organization?: string | null;
  salary?: string | null;
  duration?: string | null;
  applicationDeadline?: Date | string | null;
  startDate?: Date | string | null;
  requirements?: string | null;
  benefits?: string | null;
  contactEmail?: string | null;
  contactPhone?: string | null;
  applicationUrl?: string | null;
  isActive: boolean;
};

function getTypeConfig(type: string) {
  return OPPORTUNITY_TYPES.find((t) => t.value === type) ?? OPPORTUNITY_TYPES[0];
}

function OpportunityCard({
  opp,
  onApply,
  isApplied,
}: {
  opp: Opportunity;
  onApply: (o: Opportunity) => void;
  isApplied: boolean;
}) {
  const typeConfig = getTypeConfig(opp.type);
  const deadline = opp.applicationDeadline ? new Date(opp.applicationDeadline) : null;
  const isExpired = deadline ? deadline < new Date() : false;
  const daysLeft = deadline
    ? Math.ceil((deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null;

  return (
    <Card className="p-6 hover:shadow-xl transition-all duration-300 group border hover:border-primary/30">
      <div className="flex items-start gap-4">
        {/* Type icon */}
        <div
          className={`w-12 h-12 rounded-xl bg-gradient-to-br ${typeConfig.gradient} flex items-center justify-center text-white shrink-0 text-xl`}
        >
          {typeConfig.emoji}
        </div>

        <div className="flex-1 min-w-0">
          {/* Header row */}
          <div className="flex items-start justify-between gap-2 mb-2 flex-wrap">
            <div className="min-w-0">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${typeConfig.color}`}>
                {typeConfig.label}
              </span>
              {opp.domain && (
                <span className="ml-2 text-xs text-muted-foreground">{opp.domain}</span>
              )}
            </div>
            {isApplied && (
              <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 shrink-0">
                <CheckCircle className="w-3 h-3 mr-1" />
                Candidaté
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-bold text-foreground mb-1 leading-snug">
            {opp.title}
          </h3>

          {opp.organization && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
              <Building2 className="w-4 h-4 shrink-0" />
              <span className="font-medium">{opp.organization}</span>
            </div>
          )}

          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {opp.description}
          </p>

          {/* Details grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-4">
            {opp.region && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                <span className="truncate">{opp.region}</span>
              </div>
            )}
            {opp.salary && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <DollarSign className="w-3.5 h-3.5 text-green-500 shrink-0" />
                <span className="truncate font-medium text-foreground">{opp.salary}</span>
              </div>
            )}
            {opp.duration && (
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Clock className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">{opp.duration}</span>
              </div>
            )}
            {deadline && (
              <div
                className={`flex items-center gap-1.5 ${
                  isExpired
                    ? "text-red-500"
                    : daysLeft !== null && daysLeft <= 7
                    ? "text-orange-500 font-medium"
                    : "text-muted-foreground"
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" />
                <span className="truncate">
                  {isExpired
                    ? "Clôturé"
                    : daysLeft !== null && daysLeft <= 7
                    ? `J-${daysLeft}`
                    : deadline.toLocaleDateString("fr-FR")}
                </span>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex gap-2 flex-wrap">
            {isApplied ? (
              <Button variant="outline" size="sm" disabled>
                <CheckCircle className="mr-1.5 w-4 h-4 text-green-500" />
                Candidature envoyée
              </Button>
            ) : isExpired ? (
              <Button variant="outline" size="sm" disabled>
                Offre expirée
              </Button>
            ) : (
              <Button size="sm" onClick={() => onApply(opp)}>
                Candidater
                <ArrowRight className="ml-1.5 w-4 h-4" />
              </Button>
            )}
            {opp.applicationUrl && (
              <Button variant="ghost" size="sm" asChild>
                <a href={opp.applicationUrl} target="_blank" rel="noreferrer">
                  <ExternalLink className="w-4 h-4" />
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

export default function Opportunities() {
  const { isAuthenticated } = useAuth();

  const [filters, setFilters] = useState({ type: "", domain: "", region: "", search: "" });
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedOpp, setSelectedOpp] = useState<Opportunity | null>(null);
  const [coverLetter, setCoverLetter] = useState("");

  // Real data
  const { data: opportunities = [], isLoading } = trpc.opportunities.list.useQuery({
    type: (filters.type as "job" | "internship" | "scholarship" | "event") || undefined,
    domain: filters.domain || undefined,
    region: filters.region || undefined,
    search: debouncedSearch || undefined,
    limit: 50,
  });

  const { data: myApps = [] } = trpc.opportunities.myApplications.useQuery(undefined, {
    enabled: isAuthenticated,
  });
  const appliedOppIds = new Set(myApps.map((a) => a.opportunityId));

  const applyMutation = trpc.opportunities.apply.useMutation({
    onSuccess: () => {
      toast.success("Candidature envoyée avec succès !");
      setSelectedOpp(null);
      setCoverLetter("");
    },
    onError: (err) => {
      toast.error(err.message || "Erreur lors de la candidature");
    },
  });

  const handleSearchChange = (val: string) => {
    setFilters((f) => ({ ...f, search: val }));
    clearTimeout((window as any).__searchTimerO);
    (window as any).__searchTimerO = setTimeout(() => setDebouncedSearch(val), 400);
  };

  const resetFilters = () => {
    setFilters({ type: "", domain: "", region: "", search: "" });
    setDebouncedSearch("");
  };

  const handleApply = (opp: Opportunity) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    setSelectedOpp(opp);
  };

  const hasFilters = filters.type || filters.domain || filters.region || filters.search;

  // Count by type for stats
  const countByType = OPPORTUNITY_TYPES.reduce<Record<string, number>>((acc, t) => {
    acc[t.value] = opportunities.filter((o) => o.type === t.value).length;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-14">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              Opportunités de Développement
            </h1>
            <p className="text-purple-100 text-lg">
              Emplois, stages, bourses et événements sélectionnés pour accélérer
              votre insertion socio-professionnelle.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Type quick-filters */}
        <div className="flex gap-2 flex-wrap mb-6">
          {OPPORTUNITY_TYPES.map((t) => (
            <button
              key={t.value}
              onClick={() =>
                setFilters((f) => ({ ...f, type: f.type === t.value ? "" : t.value }))
              }
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filters.type === t.value
                  ? "bg-primary text-white border-primary shadow-md"
                  : "bg-card border-border hover:border-primary/50"
              }`}
            >
              <span>{t.emoji}</span>
              <span>{t.label}</span>
              {countByType[t.value] > 0 && (
                <span
                  className={`text-xs rounded-full px-1.5 ${
                    filters.type === t.value ? "bg-white/20" : "bg-muted"
                  }`}
                >
                  {countByType[t.value]}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Filter bar */}
        <div className="bg-card rounded-2xl border border-border p-5 mb-8 shadow-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            <div className="relative">
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
                  <SelectItem key={d} value={d}>{d}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select
              value={filters.region}
              onValueChange={(v) => setFilters((f) => ({ ...f, region: v === "_all" ? "" : v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Région" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="_all">Toutes les régions</SelectItem>
                {REGIONS_CAMEROUN.map((r) => (
                  <SelectItem key={r} value={r}>{r}</SelectItem>
                ))}
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
            : `${opportunities.length} opportunité${opportunities.length !== 1 ? "s" : ""} trouvée${opportunities.length !== 1 ? "s" : ""}`}
        </p>

        {/* List */}
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-xl bg-muted shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-5 bg-muted rounded w-2/3" />
                    <div className="h-3 bg-muted rounded w-full" />
                    <div className="h-3 bg-muted rounded w-3/4" />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : opportunities.length > 0 ? (
          <div className="space-y-4">
            {opportunities.map((opp) => (
              <OpportunityCard
                key={opp.id}
                opp={opp as Opportunity}
                onApply={handleApply}
                isApplied={appliedOppIds.has(opp.id)}
              />
            ))}
          </div>
        ) : (
          <Card className="p-16 text-center">
            <Briefcase className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-30" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Aucune opportunité trouvée
            </h3>
            <p className="text-muted-foreground mb-6">
              Aucune opportunité ne correspond à vos critères actuels.
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
        open={!!selectedOpp}
        onOpenChange={(o) => {
          if (!o) {
            setSelectedOpp(null);
            setCoverLetter("");
          }
        }}
      >
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Candidater à l'opportunité</DialogTitle>
            <DialogDescription>{selectedOpp?.organization}</DialogDescription>
          </DialogHeader>

          {selectedOpp && (
            <div className="space-y-5 py-2">
              {/* Summary card */}
              <div className="bg-muted/50 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <span className="text-2xl">{getTypeConfig(selectedOpp.type).emoji}</span>
                  <div>
                    <p className="font-semibold text-foreground">{selectedOpp.title}</p>
                    {selectedOpp.organization && (
                      <p className="text-sm text-muted-foreground">{selectedOpp.organization}</p>
                    )}
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      {selectedOpp.region && (
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {selectedOpp.region}
                        </span>
                      )}
                      {selectedOpp.salary && (
                        <span className="flex items-center gap-1">
                          <DollarSign className="w-3 h-3" />
                          {selectedOpp.salary}
                        </span>
                      )}
                      {selectedOpp.duration && (
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {selectedOpp.duration}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Requirements */}
              {selectedOpp.requirements && (
                <div>
                  <Label className="text-xs uppercase tracking-wide text-muted-foreground mb-1.5 block">
                    Conditions requises
                  </Label>
                  <p className="text-sm text-foreground bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-3">
                    {selectedOpp.requirements}
                  </p>
                </div>
              )}

              {/* Cover letter */}
              <div className="space-y-2">
                <Label htmlFor="cover">
                  Lettre de motivation{" "}
                  <span className="text-muted-foreground font-normal">(recommandée)</span>
                </Label>
                <Textarea
                  id="cover"
                  placeholder="Présentez-vous, expliquez vos motivations et ce que vous apporteriez à cette opportunité..."
                  value={coverLetter}
                  onChange={(e) => setCoverLetter(e.target.value)}
                  rows={5}
                />
                <p className="text-xs text-muted-foreground">
                  {coverLetter.length}/1000 caractères
                </p>
              </div>

              {/* Contact info */}
              {(selectedOpp.contactEmail || selectedOpp.contactPhone) && (
                <div className="text-xs text-muted-foreground space-y-1.5 bg-muted/50 rounded-lg p-3">
                  <p className="font-medium text-foreground mb-1">Contact direct</p>
                  {selectedOpp.contactEmail && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5" />
                      <a href={`mailto:${selectedOpp.contactEmail}`} className="hover:text-primary underline">
                        {selectedOpp.contactEmail}
                      </a>
                    </div>
                  )}
                  {selectedOpp.contactPhone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5" />
                      <span>{selectedOpp.contactPhone}</span>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOpp(null)}>
              Annuler
            </Button>
            <Button
              onClick={() =>
                selectedOpp &&
                applyMutation.mutate({
                  opportunityId: selectedOpp.id,
                  coverLetter: coverLetter || undefined,
                })
              }
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
