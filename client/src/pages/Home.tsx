import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { ArrowRight, BookOpen, Briefcase, Target, Users, CheckCircle, Zap } from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-blue-600 to-blue-700 text-white py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Votre Portail vers l'Avenir
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Découvrez les programmes gouvernementaux, formations et opportunités spécialement conçus pour la jeunesse camerounaise
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              {isAuthenticated ? (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-blue-50"
                    onClick={() => (window.location.href = "/dashboard")}
                  >
                    Accéder au Tableau de Bord
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-blue-50"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    Commencer Maintenant
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white/10"
                    onClick={() => (window.location.href = getLoginUrl())}
                  >
                    En Savoir Plus
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Nos Services Principaux
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Accédez à une plateforme complète dédiée à votre développement personnel et professionnel
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1 */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Programmes</h3>
              <p className="text-sm text-muted-foreground">
                Candidatez aux programmes gouvernementaux et accédez à des financements
              </p>
            </Card>

            {/* Feature 2 */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center mb-4">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Formations</h3>
              <p className="text-sm text-muted-foreground">
                Développez vos compétences avec nos formations en ligne et hors ligne
              </p>
            </Card>

            {/* Feature 3 */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Opportunités</h3>
              <p className="text-sm text-muted-foreground">
                Découvrez emplois, stages, bourses et événements exclusifs
              </p>
            </Card>

            {/* Feature 4 */}
            <Card className="p-8 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Restez informé des mises à jour et des nouvelles opportunités
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-foreground">
            Comment Ça Marche
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            Quatre étapes simples pour accéder à toutes les opportunités
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                1
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">S'inscrire</h3>
              <p className="text-sm text-muted-foreground">
                Créez votre compte en quelques minutes
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                2
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Compléter Profil</h3>
              <p className="text-sm text-muted-foreground">
                Remplissez vos informations personnelles
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                3
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Explorer</h3>
              <p className="text-sm text-muted-foreground">
                Parcourez les programmes et opportunités
              </p>
            </div>

            {/* Step 4 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                4
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Candidater</h3>
              <p className="text-sm text-muted-foreground">
                Postulez et suivez vos candidatures
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-foreground">
              Pourquoi Nous Choisir
            </h2>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Centralisé et Accessible</h3>
                  <p className="text-muted-foreground">
                    Tous les programmes gouvernementaux, formations et opportunités en un seul endroit
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Notifications en Temps Réel</h3>
                  <p className="text-muted-foreground">
                    Recevez des alertes instantanées sur les mises à jour de vos candidatures et nouvelles opportunités
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Suivi Transparent</h3>
                  <p className="text-muted-foreground">
                    Suivez l'état de vos candidatures en temps réel avec un historique complet
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Formations de Qualité</h3>
                  <p className="text-muted-foreground">
                    Accédez à des formations certifiées pour développer vos compétences professionnelles
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-green-600 mt-1" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground mb-2">Support Dédié</h3>
                  <p className="text-muted-foreground">
                    Notre équipe est disponible pour vous aider à chaque étape de votre parcours
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à Transformer Votre Avenir ?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers de jeunes Camerounais qui ont déjà trouvé des opportunités grâce à notre portail
          </p>
          {!isAuthenticated && (
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-blue-50"
              onClick={() => (window.location.href = getLoginUrl())}
            >
              Commencer Maintenant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
