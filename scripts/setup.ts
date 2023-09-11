const exec = require('child_process').exec
const os = process.platform

exec('docker run --name wizardsurvey-dev -d -p 27017:27017 mongo:latest')

if (os === 'win32') {
  exec('copy .env.example .env.development.local')
} else if (os === 'linux' || os === 'darwin') {
  exec('cp .env.example .env.development.local')
} else {
  console.error(`Unsupported OS: ${os}`)
  process.exit(1)
}
