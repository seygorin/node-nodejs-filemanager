import os from 'os'

export function getEOL() {
  console.log(JSON.stringify(os.EOL))
  return {success: true}
}

export function getCPUs() {
  const cpus = os.cpus()
  const cpuInfo = cpus.map((cpu) => ({
    model: cpu.model,
    speed: `${cpu.speed / 1000} GHz`,
  }))
  console.log(`Overall amount of CPUs: ${cpus.length}`)
  console.table(cpuInfo)
  return {success: true}
}

export function getHomeDir() {
  console.log(os.homedir())
  return {success: true}
}

export function getUsername() {
  console.log(os.userInfo().username)
  return {success: true}
}

export function getArchitecture() {
  console.log(process.arch)
  return {success: true}
}
