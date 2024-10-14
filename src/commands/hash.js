import {createHash} from 'crypto'
import {createReadStream} from 'fs'

export async function calculateHash(path) {
  return new Promise((resolve, reject) => {
    const hash = createHash('sha256')
    const stream = createReadStream(path)

    stream.on('error', (error) => reject(new Error(`Unable to read file: ${error.message}`)))

    stream.on('data', (chunk) => hash.update(chunk))

    stream.on('end', () => {
      console.log(hash.digest('hex'))
      resolve({success: true})
    })
  })
}
