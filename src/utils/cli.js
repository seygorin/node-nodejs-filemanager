import {up, cd, ls} from '../commands/navigation.js'
import {cat, add, rn, cp, mv, rm} from '../commands/fileOperations.js'
import {
  getEOL,
  getCPUs,
  getHomeDir,
  getUsername,
  getArchitecture,
} from '../commands/osInfo.js'
import {calculateHash} from '../commands/hash.js'
import {compress, decompress} from '../commands/compression.js'

export async function processCommand(input, currentDir) {
  const args = input
    .match(/(?:[^\s"]+|"[^"]*")+/g)
    .map((arg) => arg.replace(/^"(.*)"$/, '$1'))
  const command = args.shift()

  switch (command) {
    case 'up':
      return up(currentDir)
    case 'cd':
      return cd(currentDir, args[0])
    case 'ls':
      return ls(currentDir)
    case 'cat':
      return cat(currentDir, args[0])
    case 'add':
      return add(currentDir, args[0])
    case 'rn':
      return rn(args[0], args[1])
    case 'cp':
      return cp(args[0], args[1])
    case 'mv':
      return mv(args[0], args[1])
    case 'rm':
      return rm(args[0])
    case 'os':
      switch (args[0]) {
        case '--EOL':
          return getEOL()
        case '--cpus':
          return getCPUs()
        case '--homedir':
          return getHomeDir()
        case '--username':
          return getUsername()
        case '--architecture':
          return getArchitecture()
        default:
          throw new Error('Invalid OS command')
      }
    case 'hash':
      return calculateHash(args[0])
    case 'compress':
      if (args.length !== 2) {
        throw new Error(
          'Invalid input: compress requires source and destination paths'
        )
      }
      return compress(args[0], args[1])
    case 'decompress':
      if (args.length !== 2) {
        throw new Error(
          'Invalid input: decompress requires source and destination paths'
        )
      }
      return decompress(args[0], args[1])
    default:
      throw new Error('Invalid input')
  }
}
