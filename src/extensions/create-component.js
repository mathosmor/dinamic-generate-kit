module.exports = toolbox => {
  const {
    template,
    print: { success, error }
  } = toolbox

  async function createComponent(name, selector, namePath) {
    let ui = 'UI'
    namePath += 's'

    const type = 'Component';
    const typeLow = type.toLowerCase();

    const obj = name.split('/');
    let componentName = name;

    if (obj.length > 0) {
      componentName = obj.slice(obj.length - 1)[0]
    }

    let camelCase = '';
    componentName.split('-').forEach(value => {
      camelCase += value.charAt(0).toUpperCase() + value.slice(1)
    })

    await template.generate({
      template: 'component.js.ejs',
      target: `${name}/${componentName}.component.ts`,
      props: { componentName, camelCase, type, typeLow, selector, ui }
    })

    await template.generate({
      template: 'module.js.ejs',
      target: `${name}/${componentName}-component.module.ts`,
      props: { camelCase, componentName, type, typeLow, ui }
    })

    await template.generate({
      template: 'stories.js.ejs',
      target: `${name}/${componentName}.stories.ts`,
      props: { componentName, camelCase, type, typeLow, ui, namePath }
    })

    await template.generate({
      template: 'template.js.ejs',
      target: `${name}/${componentName}.component.html`,
      props: { componentName }
    })

    await template.generate({
      template: 'style.js.ejs',
      target: `${name}/${componentName}.component.scss`
    })

    await template.generate({
      template: 'index.js.ejs',
      target: `${name}/index.ts`,
      props: { componentName, ui }
    })

    await template.generate({
      template: 'spec.js.ejs',
      target: `${name}/${componentName}.component.spec.ts`,
      props: { componentName, camelCase, type, typeLow, ui }
    })

    success(`Generated component ${name}`)
  }
  toolbox.createComponent = createComponent
}
