module.exports = toolbox => {
  const {
    prompt,
    template,
    print: { success, error }
  } = toolbox

  async function createState(name) {
    if (!name) {
      error('Name must be specified!');
      return;
    }

    let ask = await prompt.ask([
      {
        type: 'input',
        name: 'action',
        message: 'What is action name? ** First letter should be uppercase! **'
      }
    ])

    let actionName = ask.action;

    const obj = name.split('/')
    let stateName = name;

    if (obj.length > 0) {
      stateName = obj.slice(obj.length - 1)[0];
    }

    let camelCase = '';
    stateName.split('-').forEach(value => {
      camelCase += value.charAt(0).toUpperCase() + value.slice(1);
    })

    function camelize(str) {
      return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
        if (+match === 0) return ''
        return index === 0 ? match.toLowerCase() : match.toUpperCase()
      })
    }

    let nameCamalize = camelize(camelCase)

    await template.generate({
      template: './states/action-state.js.ejs',
      target: `${name}/${stateName}-state.actions.ts`,
      props: { camelCase, actionName }
    })

    await template.generate({
      template: './states/state-state.js.ejs',
      target: `${name}/${stateName}-state.ts`,
      props: { stateName, camelCase, actionName }
    })

    await template.generate({
      template: './states/sandbox-state.js.ejs',
      target: `${name}/${stateName}-state.sandbox.ts`,
      props: { stateName, camelCase, actionName, nameCamalize }
    })

    await template.generate({
      template: './states/module-state.js.ejs',
      target: `${name}/${stateName}-state.module.ts`,
      props: { stateName, camelCase }
    })

    await template.generate({
      template: './states/index-state.js.ejs',
      target: `${name}/index.ts`,
      props: { stateName }
    })

    success(`Generated state ${name}`)
  }
  toolbox.createState = createState
}
