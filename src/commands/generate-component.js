const command = {
  name: 'generate:component',
  alias: ['g:c'],
  description: 'Create a new component',
  run: async toolbox => {
    const {
      prompt,
      parameters,
      createComponent,
      createUi,
      print: { info }
    } = toolbox

    const figlet = require('figlet');
    
    const name = parameters.first

    info(figlet.textSync('DGKIT', { horizontalLayout: 'full' }))

    if (!name) {
      error('NAME MUST BE SPECIFIED!');
      return;
    }

    let select = await prompt.ask([
      {
        type: 'select',
        name: 'selector',
        message: 'What the name of selector?',
        choices: ['app', 'ui']
      }
    ])

    const selector = select.selector

    if (selector == 'app') {
      await createComponent(name, selector)
    } else {
      await createUi(name, selector)
    }
  }
}

module.exports = command;
