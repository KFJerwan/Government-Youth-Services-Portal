import { ReactNode } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { Button } from "@/components/ui/button";
import {
  Menu,
  X,
  LogOut,
  Bell,
  LayoutDashboard,
  FileText,
  BookOpen,
  Briefcase,
  Home,
  Shield,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface MainLayoutProps {
  children: ReactNode;
}

const NAV_LINKS = [
  { href: "/", label: "Accueil", icon: Home, public: true },
  { href: "/programs", label: "Programmes", icon: FileText, public: true },
  { href: "/trainings", label: "Formations", icon: BookOpen, public: true },
  { href: "/opportunities", label: "Opportunités", icon: Briefcase, public: true },
  { href: "/dashboard", label: "Tableau de Bord", icon: LayoutDashboard, public: false },
];

export default function MainLayout({ children }: MainLayoutProps) {
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location, navigate] = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate("/");
    setMobileMenuOpen(false);
  };

  // Fetch unread notification count (only when authenticated)
  const { data: notifications = [] } = trpc.notifications.list.useQuery(
    { limit: 50 },
    { enabled: isAuthenticated, refetchInterval: 30_000 }
  );
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const isActive = (href: string) =>
    href === "/" ? location === "/" : location.startsWith(href);

  const visibleLinks = isAuthenticated
    ? NAV_LINKS
    : NAV_LINKS.filter((l) => l.public);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      {/* ── Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 dark:bg-card/95 backdrop-blur border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <a href="/" className="flex items-center gap-3 shrink-0">
              <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center shadow-sm">
                <span className="text-white font-black text-sm">PJ</span>
              </div>
              <div className="hidden sm:block">
                <p className="text-base font-bold text-foreground leading-tight">
                  Portail Jeunesse
                </p>
                <p className="text-[10px] text-muted-foreground leading-tight uppercase tracking-widest">
                  Cameroun
                </p>
              </div>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {visibleLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-primary text-white shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
              {isAuthenticated && user?.role === "admin" && (
                <a
                  href="/admin"
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive("/admin")
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <Shield className="w-4 h-4" />
                  Admin
                </a>
              )}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-2">
              {!loading && isAuthenticated && user ? (
                <>
                  {/* Notification Bell */}
                  <a
                    href="/dashboard?tab=notifications"
                    className="relative p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Bell className="w-5 h-5 text-foreground" />
                    {unreadCount > 0 && (
                      <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                        {unreadCount > 9 ? "9+" : unreadCount}
                      </span>
                    )}
                  </a>

                  {/* User menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="hidden sm:flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full hover:bg-muted transition-colors border border-border">
                        <div className="w-7 h-7 bg-gradient-to-br from-primary to-blue-700 rounded-full flex items-center justify-center">
                          {user.profileImage ? (
                            <img
                              src={user.profileImage}
                              alt={user.name ?? ""}
                              className="w-7 h-7 rounded-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-xs">
                              {(user.name || "U").charAt(0).toUpperCase()}
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-medium text-foreground max-w-[120px] truncate">
                          {user.name || "Mon compte"}
                        </span>
                        <ChevronDown className="w-3.5 h-3.5 text-muted-foreground" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-52">
                      <DropdownMenuLabel>
                        <div>
                          <p className="font-semibold">{user.name || "Utilisateur"}</p>
                          <p className="text-xs text-muted-foreground font-normal truncate">
                            {user.email}
                          </p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <a href="/dashboard" className="cursor-pointer">
                          <LayoutDashboard className="w-4 h-4 mr-2" />
                          Tableau de Bord
                        </a>
                      </DropdownMenuItem>
                      {user.role === "admin" && (
                        <DropdownMenuItem asChild>
                          <a href="/admin" className="cursor-pointer">
                            <Shield className="w-4 h-4 mr-2" />
                            Espace Admin
                          </a>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={handleLogout}
                        className="text-destructive focus:text-destructive cursor-pointer"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Déconnexion
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : !loading ? (
                <div className="hidden sm:flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    Connexion
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    S'inscrire
                  </Button>
                </div>
              ) : null}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2 hover:bg-muted rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* ── Mobile Menu ── */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-3 pt-3 border-t border-border space-y-1 pb-2">
              {visibleLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                >
                  <link.icon className="w-4 h-4" />
                  {link.label}
                </a>
              ))}
              {isAuthenticated && user?.role === "admin" && (
                <a
                  href="/admin"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-muted"
                >
                  <Shield className="w-4 h-4" />
                  Espace Admin
                </a>
              )}

              {isAuthenticated ? (
                <div className="pt-2 mt-2 border-t border-border space-y-1">
                  <div className="px-4 py-2">
                    <p className="text-sm font-semibold text-foreground">
                      {user?.name}
                    </p>
                    <p className="text-xs text-muted-foreground">{user?.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Déconnexion
                  </button>
                </div>
              ) : (
                <div className="pt-2 mt-2 border-t border-border space-y-2 px-2">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    Connexion
                  </Button>
                  <Button
                    className="w-full"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    S'inscrire gratuitement
                  </Button>
                </div>
              )}
            </nav>
          )}
        </div>
      </header>

      {/* ── Main ── */}
      <main className="flex-1">{children}</main>

      {/* ── Footer ── */}
      <footer className="bg-slate-900 text-slate-300 mt-16">
        <div className="container mx-auto px-4 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
            {/* Brand */}
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-blue-700 rounded-xl flex items-center justify-center">
                  <span className="text-white font-black text-sm">PJ</span>
                </div>
                <div>
                  <p className="font-bold text-white text-base">Portail Jeunesse</p>
                  <p className="text-xs text-slate-400 uppercase tracking-widest">Cameroun</p>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed">
                La plateforme officielle qui centralise les programmes
                gouvernementaux, formations et opportunités pour la jeunesse
                camerounaise.
              </p>
            </div>

            {/* Modules */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Modules
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: "/programs", label: "Programmes Gouvernementaux" },
                  { href: "/trainings", label: "Formations Certifiantes" },
                  { href: "/opportunities", label: "Emplois & Stages" },
                  { href: "/opportunities?type=scholarship", label: "Bourses d'Études" },
                  { href: "/opportunities?type=event", label: "Événements" },
                ].map((l) => (
                  <li key={l.href}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Ministères */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Partenaires
              </h3>
              <ul className="space-y-2.5 text-sm text-slate-400">
                <li>MINJEC</li>
                <li>MINESUP</li>
                <li>MINTSS</li>
                <li>MINADER</li>
                <li>MINPOSTEL</li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                Contact & Aide
              </h3>
              <ul className="space-y-2.5">
                {[
                  { href: "#", label: "Centre d'Aide" },
                  { href: "#", label: "FAQ" },
                  { href: "mailto:contact@portailjeunesse.cm", label: "Nous Contacter" },
                  { href: "#", label: "Politique de Confidentialité" },
                  { href: "#", label: "Conditions d'Utilisation" },
                ].map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      className="text-sm text-slate-400 hover:text-white transition-colors"
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-slate-700 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-500">
              © {new Date().getFullYear()} Portail Jeunesse Cameroun. Tous droits réservés.
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <span>🇨🇲</span>
              <span>Fait avec passion pour la jeunesse camerounaise</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
