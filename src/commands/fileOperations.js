import {createReadStream, createWriteStream} from 'fs'
import {promises as fs} from 'fs'
import {join, resolve} from 'path'
import {pipeline} from 'stream/promises'

export async function cat(currentDir, path) {
  const fullPath = resolve(currentDir, path)
  try {
    await fs.access(fullPath, fs.constants.R_OK)
    const stats = await fs.stat(fullPath)
    if (!stats.isFile()) {
      throw new Error('The specified path is not a file')
    }

    const readStream = createReadStream(fullPath, {encoding: 'utf8'})
    await pipeline(readStream, async function* (source) {
      for await (const chunk of source) {
        console.log(chunk)
      }
    })
    return {success: true}
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${fullPath}`)
    } else if (error.code === 'EACCES') {
      throw new Error(`Permission denied: ${fullPath}`)
    } else {
      throw new Error(`Unable to read file: ${error.message}`)
    }
  }
}

export async function add(currentDir, fileName) {
  try {
    const filePath = join(currentDir, fileName)
    await fs.writeFile(filePath, '')
    return {success: true}
  } catch (error) {
    throw new Error(`Unable to create file: ${error.message}`)
  }
}

export async function rn(oldPath, newName) {
  try {
    const dir = resolve(oldPath, '..')
    const newPath = join(dir, newName)
    await fs.rename(oldPath, newPath)
    return {success: true}
  } catch (error) {
    throw new Error(`Unable to rename file: ${error.message}`)
  }
}

export async function cp(sourcePath, destDir) {
  try {
    await fs.access(destDir)
    const fileName = resolve(sourcePath).split('/').pop()
    const destPath = join(destDir, fileName)
    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(destPath)
    await pipeline(readStream, writeStream)
    return {success: true}
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Destination directory does not exist: ${destDir}`)
    }
    throw new Error(`Unable to copy file: ${error.message}`)
  }
}

export async function mv(sourcePath, destDir) {
  try {
    const fileName = resolve(sourcePath).split('/').pop()
    const destPath = join(destDir, fileName)

    await fs.access(sourcePath)
    await fs.access(destDir)

    const readStream = createReadStream(sourcePath)
    const writeStream = createWriteStream(destPath)

    await pipeline(readStream, writeStream)

    await fs.unlink(sourcePath)

    console.log(`File moved successfully to: ${destPath}`)
    return {success: true}
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`Source file or destination directory does not exist`)
    }
    throw new Error(`Unable to move file: ${error.message}`)
  }
}

export async function rm(path) {
  try {
    await fs.unlink(path)
    return {success: true}
  } catch (error) {
    throw new Error(`Unable to delete file: ${error.message}`)
  }
}
