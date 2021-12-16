const command = {
  name: 'dgk',
  description: 'Create a new path',
  run: async toolbox => {
    const {
      parameters,
      prompt,
      createComponent,
      createPage,
      createUi,
      createState,
      print: { info }
    } = toolbox

    const figlet = require('figlet');

    let name = parameters.first;

    info(figlet.textSync('DGKIT', { horizontalLayout: 'full' }))

    let type = await prompt.ask([
      {
        type: 'select',
        name: 'name',
        message: 'What you want to generate?',
        choices: ['component', 'page', 'state', 'ui']
      }
    ])

    if (!name) {
      let inputName = await prompt.ask([
        {
          type: 'input',
          name: 'name',
          message: `What's the ${type.name} name?`,
        }
      ])
      name = inputName.name;
    }

    switch (type.name) {
      case 'component':
        await createComponent(name, 'app', type.name)
        break

      case 'ui':
        await createUi(name, 'ui', type.name)
        break
      case 'page':
        await createPage(name)
        break

      case 'state':
        await createState(name)
        break

      default:
        break
    }
  }
}

module.exports = command
