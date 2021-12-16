module.exports = toolbox => {
  const {
    template,
    print: { error, success }
  } = toolbox

  async function createPage(name) {
    const type = 'Page';
    const typeLow = type.toLowerCase();

    if (!name) {
      error('Name must be specified!');
      return;
    }

    const selector = 'app';

    const obj = name.split('/')
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
      target: `${name}/${componentName}.page.ts`,
      props: { componentName, camelCase, type, typeLow, selector }
    })

    await template.generate({
      template: 'module.js.ejs',
      target: `${name}/${componentName}-page.module.ts`,
      props: { camelCase, componentName, type, typeLow }
    })

    await template.generate({
      template: 'stories.js.ejs',
      target: `${name}/${componentName}-page.stories.ts`,
      props: { componentName, camelCase, type, typeLow }
    })

    await template.generate({
      template: 'template.js.ejs',
      target: `${name}/${componentName}.page.html`,
      props: { componentName }
    })

    await template.generate({
      template: 'style.js.ejs',
      target: `${name}/${componentName}.page.scss`
    })

    await template.generate({
      template: 'routing.js.ejs',
      target: `${name}/${componentName}-page-routing.module.ts`,
      props: { componentName, camelCase }
    })

    await template.generate({
      template: 'spec.js.ejs',
      target: `${name}/${componentName}.page.spec.ts`,
      props: { componentName, camelCase, type, typeLow }
    })

    success(`Generated page ${name}`)
  }
  toolbox.createPage = createPage
}
