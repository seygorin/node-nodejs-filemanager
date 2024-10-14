import {createBrotliCompress, createBrotliDecompress} from 'zlib'
import {createReadStream, createWriteStream} from 'fs'
import {pipeline} from 'stream/promises'
import {join, basename} from 'path'
import {promises as fs} from 'fs'

export async function compress(sourcePath, destPath) {
  try {
    await fs.access(sourcePath)

    const sourceFileName = basename(sourcePath)
    const compressedFileName = `${sourceFileName}.br`
    const fullDestPath = join(destPath, compressedFileName)

    try {
      await fs.access(destPath)
    } catch (error) {
      console.error(`Destination directory does not exist: ${destPath}`)
      throw new Error('Destination directory does not exist')
    }

    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(fullDestPath)
    const brotli = createBrotliCompress()

    await pipeline(readStream, brotli, writeStream)
    console.log(`File compressed successfully: ${fullDestPath}`)
    return {success: true}
  } catch (error) {
    console.error(`Compression failed: ${error.message}`)
    console.error(`Source path: ${sourcePath}`)
    console.error(`Destination path: ${destPath}`)
    throw new Error(`Unable to compress file: ${error.message}`)
  }
}

export async function decompress(sourcePath, destPath) {
  try {
    await fs.access(sourcePath)

    if (!sourcePath.endsWith('.br')) {
      throw new Error('Source file must have a .br extension')
    }

    const sourceFileName = basename(sourcePath)
    const decompressedFileName = sourceFileName.slice(0, -3)
    const fullDestPath = join(destPath, decompressedFileName)

    try {
      await fs.access(destPath)
    } catch (error) {
      throw new Error(`Destination directory does not exist: ${destPath}`)
    }

    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(fullDestPath)
    const brotli = createBrotliDecompress()

    await pipeline(readStream, brotli, writeStream)
    console.log(`File decompressed successfully: ${fullDestPath}`)
    return {success: true}
  } catch (error) {
    throw new Error(`Unable to decompress file: ${error.message}`)
  }
}
