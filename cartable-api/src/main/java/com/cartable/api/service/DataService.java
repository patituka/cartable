package com.cartable.api.service;

import com.cartable.api.model.Resource;
import com.cartable.api.model.User;
import com.cartable.api.repository.ResourceRepository;
import com.cartable.api.repository.UserRepository;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service
public class DataService {

        private final UserRepository userRepository;
        private final ResourceRepository resourceRepository;

        public DataService(UserRepository userRepository, ResourceRepository resourceRepository) {
                this.userRepository = userRepository;
                this.resourceRepository = resourceRepository;
        }

        @PostConstruct
        @Transactional
        public void init() {
                if (userRepository.count() > 0) {
                        return; // Data already initialized
                }

                // Init Mock Users
                List<User> users = new ArrayList<>();
                users.add(new User("u0", "Sophie Nouveau", "sophie@gmail.com", null, 50, new ArrayList<>(),
                                new ArrayList<>(), new ArrayList<>(), false));
                users.add(new User("u1", "Thomas Prof", "thomas@gmail.com", null, 150, Arrays.asList("1", "4"),
                                new ArrayList<>(), Arrays.asList("u2"), true));
                users.add(new User("u2", "Marie Dupont", "marie.dupont@gmail.com", null, 40, Arrays.asList("2", "3"),
                                new ArrayList<>(), new ArrayList<>(), true));
                userRepository.saveAll(users);

                // Init Mock Resources
                List<Resource> resources = new ArrayList<>();
                resources.add(new Resource("1", "La Poésie du XIXème siècle : Baudelaire et la modernité",
                                "Une séquence complète de 6 semaines explorant Les Fleurs du Mal. Inclut des analyses linéaires et des sujets de dissertation.",
                                "Marie Dupont", "u2", "Première", "Français",
                                Arrays.asList("Poésie", "Baudelaire", "Symbolisme", "Alchimie poétique"),
                                124, 450, "2023-10-15",
                                "Séance 1: Contextualisation historique.\nSéance 2: Lecture analytique de \"L'Albatros\".\nSéance 3: Le spleen baudelairien.\nSéance 4: La femme chez Baudelaire.\nEvaluation: Commentaire composé sur \"Une Charogne\".",
                                "#", "sequence_baudelaire.pdf", 0));

                resources.add(new Resource("2", "La Guerre Froide : Un monde bipolaire",
                                "Cours magistral et études de documents sur la période 1947-1991. Focus sur les crises de Berlin et Cuba.",
                                "Jean-Pierre Martin", "u3", "Terminale", "Histoire-Géo",
                                Arrays.asList("Guerre Froide", "Géopolitique", "URSS", "USA"),
                                89, 210, "2023-11-02",
                                "Introduction: La rupture de la Grande Alliance.\nI. La formation des blocs.\nII. Les crises périphériques.\nIII. La Détente et la \"Guerre fraîche\".\nConclusion: La chute du mur.",
                                "#", "guerre_froide_cours.pdf", 5));

                resources.add(new Resource("3", "Antigone d'Anouilh : Réécriture et Résistance",
                                "Étude de l'œuvre intégrale. Comparaison avec le mythe antique de Sophocle.",
                                "Sophie Bernard", "u4", "3ème", "Français",
                                Arrays.asList("Théâtre", "Mythe", "Tragédie", "XXème siècle"),
                                215, 890, "2023-09-10",
                                "Séance 1: Le mythe d'Oedipe.\nSéance 2: Le prologue.\nSéance 3: Le face à face Créon/Antigone.\nBilan: La figure du résistant.",
                                "#", "antigone_complet.pdf", 0));

                resources.add(new Resource("4", "La Conscience et l'Inconscient",
                                "Séquence de philosophie abordant Freud, Descartes et Sartre. Fiches de révision incluses.",
                                "Luc Dubois", "u5", "Terminale", "Philosophie",
                                Arrays.asList("Freud", "Descartes", "Sujet", "Morale"),
                                156, 340, "2024-01-05",
                                "I. Le sujet cartésien : je pense donc je suis.\nII. L'hypothèse de l'inconscient freudien.\nIII. La critique de l'inconscient (Sartre, Alain).\nDissertation: Suis-je ce que j'ai conscience d'être ?",
                                "#", "philo_conscience.pdf", 10));

                resources.add(new Resource("5", "Introduction to Shakespeare: Romeo and Juliet",
                                "Séquence d'introduction à Shakespeare pour classe européenne. Activités de théâtre en classe.",
                                "Claire Evans", "u6", "Seconde", "Langues Vivantes",
                                Arrays.asList("English", "Theater", "Shakespeare", "Love"),
                                78, 120, "2024-02-20",
                                "Week 1: The Elizabethan Era.\nWeek 2: The Prologue analysis.\nWeek 3: The Balcony Scene (Acting).\nWeek 4: Conflict and Tragedy.",
                                "#", "shakespeare_intro.pdf", 3));

                resources.add(new Resource("6", "Étude des fonctions dérivées",
                                "Cours complet sur la dérivation et l'étude des variations des fonctions. Exercices corrigés inclus.",
                                "Thomas Prof", "u1", "Première", "Mathématiques",
                                Arrays.asList("Analyse", "Fonctions", "Dérivation", "Maths"),
                                134, 250, "2024-03-10",
                                "Chapitre 1: Nombre dérivé et tangente.\nChapitre 2: Fonction dérivée.\nChapitre 3: Variations et extremums.\nExercices types BAC.",
                                "#", "maths_derivation.pdf", 4));
                resourceRepository.saveAll(resources);
        }

        public List<User> getAllUsers() {
                return userRepository.findAll();
        }

        public List<Resource> getAllResources() {
                return resourceRepository.findAll();
        }
}
