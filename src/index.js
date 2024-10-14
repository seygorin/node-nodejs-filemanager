import {fileManager} from './fileManager.js'

const usernameArg = process.argv.find(arg => arg.startsWith('--username='))
let username = 'Anon'

if (usernameArg) {
  const providedUsername = usernameArg.split('=')[1];
  
  if (providedUsername.trim() === '') {
    console.error('Error: Username cannot be empty.')
    process.exit(1)
  }
  
  if (providedUsername.includes(' ')) {
    console.error('Error: Username cannot contain spaces.')
    process.exit(1)
  }
  
  username = providedUsername
}

console.log(`Welcome to the File Manager, ${username}!`)

if (username === 'Anon') {
  console.log('Tip: You can provide a username using --username=your_username when starting the application.')
}

process.on('SIGINT', () => {
  console.log(`Thank you for using File Manager, ${username}, goodbye!`)
  process.exit()
})

fileManager(username)
