module.exports = toolbox => {
	const {
		template,
		print: { success }
	} = toolbox

	async function createComponent(name) {

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
			template: './components/ts-component.js.ejs',
			target: `${name}/${componentName}.component.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './components/module-component.js.ejs',
			target: `${name}/${componentName}-component.module.ts`,
			props: { camelCase, componentName }
		})

		await template.generate({
			template: './components/stories-component.js.ejs',
			target: `${name}/${componentName}.stories.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './components/template-component.js.ejs',
			target: `${name}/${componentName}.component.html`,
			props: { componentName }
		})

		await template.generate({
			template: './components/style-component.js.ejs',
			target: `${name}/${componentName}.component.scss`
		})

		await template.generate({
			template: './components/index-component.js.ejs',
			target: `${name}/index.ts`,
			props: { componentName }
		})

		await template.generate({
			template: './components/spec-component.js.ejs',
			target: `${name}/${componentName}.component.spec.ts`,
			props: { componentName, camelCase }
		})

		success(`Generated component ${name}`)
	}
	toolbox.createComponent = createComponent
}
