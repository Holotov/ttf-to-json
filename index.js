const fs = require('fs')
const { Command } = require('commander')
const { convert } = require('./converter')

// parse the parameters
const program = new Command()
program.version('0.0.1')
program
  .option('-i, --input <path>', 'path to the input TTF font file')

program.parse(process.argv)
const options = program.opts()

if (!options.input) {
  console.error('error: no input file specified')
  return 1
}

const dest = process.argv[process.argv.length-1]
if (!dest) {
  return 1
}


// 1. read the input file as an array buffer
fs.readFile(options.input, (err, data) => {
  if (err) {
    console.error(`An error has occured while trying to read the file '${options.input}': ${err.message}`)
    process.exit(1)
    return
  }

  // no error, the data can be processed 
  const json = convert(data.buffer)
  
  // save to the output file
  fs.writeFile(dest, json, (error) => {
    if (error) {
      console.error(`An error has occured while writing the converted font to the destination '${dest}': ${error.message}`)
      process.exit(1)
      return
    }
    
    console.log(`Font was converted and written at '${dest}' !`)
  })
})