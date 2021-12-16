const command = {
  name: 'generate:state',
  alias: ['g:s'],
  description: 'Create a new state',
  run: async toolbox => {
    const {
      parameters,
      createState,
      print: { info }
    } = toolbox

    const figlet = require('figlet');

    const name = parameters.first

    info(figlet.textSync('DGKIT', { horizontalLayout: 'full' }))

    await createState(name)
  }
}

module.exports = command;
