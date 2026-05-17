class Tool {
  constructor(name, description, fn) {
    this.name = name;
    this.description = description;
    this.fn = fn;
  }
  async run(...args) {
    return await this.fn(...args);
  }
}

class Task {
  constructor(description, agent, input) {
    this.description = description;
    this.agent = agent;
    this.input = input;
  }
}

class Agent {
  constructor(name, prompt, tools) {
    this.name = name;
    this.prompt = prompt;
    this.tools = tools;
  }
  async execute(task) {
  console.log(`[Agent ${this.name}] Exécution : ${task.description}`);
  const tool = this.tools[0];
  if (tool.name === 'Writer') {
    const result = await tool.run('article_flink.txt', task.input);
    return result;
  }
  const result = await tool.run(task.input);
  return result;
}
}

class Crew {
  constructor(name, agents, tasks) {
    this.name = name;
    this.agents = agents;
    this.tasks = tasks;
  }
  async run() {
    console.log(`\n=== Crew : ${this.name} ===`);
    const results = [];
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      const agent = this.agents[i % this.agents.length];
      const result = await agent.execute(task);
      results.push(result);
      console.log(`[Résultat] ${result}`);
    }
    return results;
  }
}

module.exports = { Tool, Task, Agent, Crew };