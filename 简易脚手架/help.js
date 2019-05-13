const args = process.argv.slice(2)

const printHelp = () => {
  console.log('    usage:');
  console.log('    -------------:');
  process.exit(0)
}

args.forEach((arg)=>{
  switch(arg){
    case '-h':
    case '--help':
      printHelp()
      break
  }
})
