# myCrew – Agent IA Multi-Agents & LLM

Outil multi-agents IA développé avec Node.js permettant de créer des équipes d'agents intelligents qui collaborent pour accomplir des tâches automatisées.

## Stack technique
- Node.js + Express
- LLaMA 3.1 8B via LM Studio (local)
- API REST (wttr.in météo)
- JavaScript ES6+

## Fonctionnalités
- Architecture multi-agents : Tool, Task, Agent, Crew
- Outil LLM : génération de texte via LLaMA
- Outil Météo : récupération météo en temps réel
- Outil Writer : sauvegarde automatique de fichiers
- Version console et interface graphique web

## Lancer le projet
Démarrer LM Studio et charger le modèle LLaMA, puis :
npm install
node MyCrewDemo.js
node server.js

## Interface web
http://localhost:3000