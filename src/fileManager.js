import { createInterface } from 'readline';
import { homedir } from 'os';
import { processCommand } from './utils/cli.js';

export function fileManager(username) {
  let currentDir = homedir();

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`\nYou are currently in ${currentDir}`)

  async function handleInput(input) {
    if (input.trim() === '.exit') {
      rl.close()
      return
    }

    try {
      const result = await processCommand(input, currentDir);
      if (result && result.newDir) {
        currentDir = result.newDir;
      }
    } catch (error) {
      if (error.message.startsWith('Invalid input')) {
        console.error(`Invalid input: ${error.message}`)
      } else if (error.message.startsWith('Operation failed')) {
        console.error(`Operation failed: ${error.message}`)
      } else {
        console.error(`Unexpected error: ${error.message}`)
      }
    }

    console.log(`\nYou are currently in ${currentDir}`);
    rl.prompt();
  };

  rl.on('line', handleInput)

  rl.on('close', () => {
    console.log(`Thank you for using File Manager, ${username}, goodbye!`);
    process.exit(0);
  });

  rl.prompt();
}
