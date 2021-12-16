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
        message: 'What is action name? **Must be in camelCase**'
      }
    ])

    let actionName = ask.action;

    //TODO VERIFICAR ERRO NO EXPORT
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
        if (+match === 0) return '' // or if (/\s+/.test(match)) for white spaces
        return index === 0 ? match.toLowerCase() : match.toUpperCase()
      })
    }

    let nameCamalize = camelize(camelCase)

    await template.generate({
      template: 'action.js.ejs',
      target: `${name}/${stateName}-state.actions.ts`,
      props: { camelCase, actionName }
    })

    await template.generate({
      template: 'state.js.ejs',
      target: `${name}/${stateName}-state.ts`,
      props: { stateName, camelCase, actionName }
    })

    await template.generate({
      template: 'sandbox.js.ejs',
      target: `${name}/${stateName}-state.sandbox.ts`,
      props: { stateName, camelCase, actionName, nameCamalize }
    })

    await template.generate({
      template: 'module-state.js.ejs',
      target: `${name}/${stateName}-state.module.ts`,
      props: { stateName, camelCase }
    })

    await template.generate({
      template: 'index-state.js.ejs',
      target: `${name}/index.ts`,
      props: { stateName }
    })

    success(`Generated state ${name}`)
  }
  toolbox.createState = createState
}
