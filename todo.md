# Portail des Services Gouvernementaux pour la Jeunesse - TODO

## Phase 1: Architecture et Schéma de Base de Données
- [x] Concevoir le schéma de base de données complet (users, programs, applications, trainings, opportunities, etc.)
- [x] Créer les migrations Drizzle pour toutes les tables
- [x] Définir les relations et contraintes de base de données
- [x] Configurer les enums pour les statuts (pending, approved, rejected, etc.)

## Phase 2: Infrastructure Frontend
- [x] Configurer le thème global (couleurs, typographie, espacements)
- [x] Créer le layout principal avec navigation responsive
- [x] Implémenter le système de navigation (accueil, tableau de bord, admin)
- [x] Configurer l'authentification OAuth (connexion/inscription)
- [x] Créer la page d'accueil publique avec présentation du portail
- [x] Implémenter le composant de profil utilisateur

## Phase 3: Module Utilisateur
- [ ] Créer le tableau de bord personnel
- [ ] Implémenter le suivi des demandes de candidature (statuts visuels)
- [ ] Créer l'historique des demandes
- [ ] Implémenter la gestion du profil utilisateur
- [ ] Ajouter la visualisation des statuts (en attente, approuvé, rejeté)

## Phase 4: Modules de Programmes, Formations et Opportunités
- [ ] Créer le module de candidature aux programmes gouvernementaux
- [ ] Implémenter le formulaire de candidature avec validation
- [ ] Créer le catalogue des formations avec filtres
- [ ] Implémenter l'inscription aux formations
- [ ] Créer l'annuaire des opportunités (emplois, stages, bourses, événements)
- [ ] Implémenter les filtres par domaine, région, date
- [ ] Créer la page de détails pour chaque opportunité

## Phase 5: Espace Administrateur et Notifications
- [ ] Créer le tableau de bord administrateur
- [ ] Implémenter la gestion des programmes (CRUD)
- [ ] Implémenter la validation des candidatures
- [ ] Créer la gestion des formations
- [ ] Implémenter la publication des opportunités
- [ ] Configurer le système de notifications in-app
- [ ] Configurer le système de notifications par email
- [ ] Implémenter les déclencheurs de notifications

## Phase 6: Tests, Optimisations et Livraison
- [ ] Écrire les tests unitaires (Vitest)
- [ ] Tester les flux utilisateur principaux
- [ ] Optimiser les performances (lazy loading, pagination)
- [ ] Vérifier la responsivité mobile/desktop
- [ ] Valider l'accessibilité (WCAG)
- [ ] Créer un checkpoint final
- [ ] Préparer la documentation pour l'utilisateur

## Notes de Design
- Style: Élégant, épuré, professionnel
- Typographie: Raffinée et cohérente
- Mise en page: Aérée, claire et accessible
- Cible: Jeunesse camerounaise (mobile-first)
- Accessibilité: Priorité sur la clarté et l'intuitivité
