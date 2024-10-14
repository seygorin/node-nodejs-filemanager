import {join, resolve, parse} from 'path'
import {promises as fs} from 'fs'
import path from 'path'

export async function up(currentDir) {
  const parentDir = path.resolve(currentDir, '..')
  const rootDir = path.parse(currentDir).root
  if (parentDir === currentDir || parentDir === rootDir) {
    return {newDir: currentDir}
  }
  return {newDir: parentDir}
}

export async function cd(currentDir, path) {
  const newPath = resolve(currentDir, path)
  try {
    const stats = await fs.stat(newPath)
    if (!stats.isDirectory()) {
      throw new Error('Path is not a directory')
    }
    return {newDir: newPath}
  } catch (error) {
    throw new Error('Invalid directory')
  }
}

export async function ls(currentDir) {
	try {
		const items = await fs.readdir(currentDir, { withFileTypes: true });
		
    if (items.length === 0) {
      console.log('Directory is empty')
      return {success: true}
    }

    const dirs = items
      .filter((item) => item.isDirectory())
      .map((item) => ({name: item.name, type: 'directory'}))
    const files = items
      .filter((item) => item.isFile())
      .map((item) => ({name: item.name, type: 'file'}))

    const sortedItems = [...dirs, ...files].sort((a, b) =>
      a.name.localeCompare(b.name)
    )

    console.table(sortedItems)
    return {success: true}
  } catch (error) {
    throw new Error(`Unable to list directory contents: ${error.message}`)
  }
}
