import {createReadStream, createWriteStream} from 'fs'
import {promises as fs} from 'fs'
import {join, resolve} from 'path'
import {pipeline} from 'stream/promises'

export async function cat(path) {
  try {
    await fs.access(path, fs.constants.R_OK)

    const stats = await fs.stat(path)
    if (!stats.isFile()) {
      throw new Error('The specified path is not a file')
    }

    const content = await fs.readFile(path, 'utf8')
    console.log(content)
    return {success: true}
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(`File not found: ${path}`)
    } else if (error.code === 'EACCES') {
      throw new Error(`Permission denied: ${path}`)
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
    await cp(sourcePath, destDir)
    await fs.unlink(sourcePath)
    return {success: true}
  } catch (error) {
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
