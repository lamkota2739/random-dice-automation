import UiController from "./core/UiController.js";
import Tasks from "./tasks/index.js";

function parseArgs() {
  const args = {
    task: null,
    current_wave_count: 100,
    max_wave_count: 10000,
  };

  const argv = process.argv.slice(2);
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    switch (arg) {
      case "--task":
      case "-t":
        i++;
        args.task = argv[i];
        break;
      case "--current_wave_count":
      case "-c":
        i++;
        args.current_wave_count = parseInt(argv[i]);
        break;
      case "--max_wave_count":
      case "-m":
        i++;
        args.max_wave_count = parseInt(argv[i]);
        break;
    }
  }
  return args;
}

function mapToTask(abbr) {
  const mapping = {
    dm: "CoopDistortionMonolith",
  };
  return mapping[abbr];
}

async function main() {
  const args = parseArgs();
  const uic = new UiController();

  const taskName = mapToTask(args.task);
  const TaskClass = Tasks[taskName];
  const taskInstance = new TaskClass(uic);

  await taskInstance.run(args);
}

main();
