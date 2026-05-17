require('dotenv').config();
const { Tool, Task, Agent, Crew } = require('./core');
const { callLLM, getWeather, writeFile } = require('./tools');

async function main() {
  // --- CREW 1 : Météo + Programme du jour ---
  const weatherTool = new Tool('Weather', 'Récupère la météo', getWeather);
  const llmTool = new Tool('LLM', 'Génère du texte', callLLM);
  const writerTool = new Tool('Writer', 'Écrit un fichier', writeFile);

  const weatherAgent = new Agent('WeatherAgent',
    'Tu es un assistant météo', [weatherTool]);
  const programAgent = new Agent('ProgramAgent',
    'Tu prépares un programme de journée', [llmTool]);

  const task1 = new Task('Récupérer la météo de Paris', weatherAgent, 'Paris');
  const task2 = new Task('Préparer un programme pour Paris',
    programAgent,
    'Propose un programme de journée à Paris en fonction de la météo');

  const crew1 = new Crew('Météo & Programme', [weatherAgent, programAgent], [task1, task2]);
  await crew1.run();

  // --- CREW 2 : Blog ---
  const blogAgent = new Agent('BlogAgent',
    'Tu es un rédacteur de blog tech', [llmTool]);
  const saveAgent = new Agent('SaveAgent',
    'Tu sauvegardes les articles', [writerTool]);

  const task3 = new Task('Écrire un article sur Apache Flink',
    blogAgent,
    'Écris un court article de blog sur Apache Flink et le streaming temps réel');
  const task4 = new Task('Sauvegarder l article',
  saveAgent,
  'article_flink.txt');

  const crew2 = new Crew('Blog Tech', [blogAgent, saveAgent], [task3, task4]);
  await crew2.run();
}

main().catch(console.error);