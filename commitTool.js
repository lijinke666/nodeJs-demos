const {
  user,
  projectTitle
} = require('./commit.json')

const { exec } = require('child_process')

const [_, __, commitMessage, projectNumber] = process.argv

const projectTag = projectNumber ? `[${projectTitle}-${projectNumber}]` : ''

const commitShell = `git commit -m "[${user}]${projectTag} ${commitMessage}"`

exec(commitShell, (error, stdout, stderr) => {
  if (error) {
    console.log(`[commit tool error]: ${error}`);
    return
  }
  console.log(`${stdout}`);
  console.log(`${stderr}`);
})