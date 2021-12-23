module.exports = toolbox => {
	const {
		template,
		print: { success }
	} = toolbox

	async function createUi(name) {

		let obj = name.split('/');
		let componentName = name;

		if (obj.length > 0) {
			componentName = obj.slice(obj.length - 1)[0];
			let last = obj.slice(obj.length - 1)[0];
			obj.pop();
			last = 'ui-' + last;
			obj.push(last);
			name = obj.join('/');
			console.log(name)
		}

		let camelCase = '';
		componentName.split('-').forEach(value => {
			camelCase += value.charAt(0).toUpperCase() + value.slice(1)
		})

		await template.generate({
			template: './ui/ts-ui.js.ejs',
			target: `${name}/ui-${componentName}.component.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './ui/module-ui.js.ejs',
			target: `${name}/ui-${componentName}.module.ts`,
			props: { camelCase, componentName }
		})

		await template.generate({
			template: './ui/stories-ui.js.ejs',
			target: `${name}/ui-${componentName}.stories.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './ui/template-ui.js.ejs',
			target: `${name}/ui-${componentName}.component.html`,
			props: { componentName }
		})

		await template.generate({
			template: './ui/style-ui.js.ejs',
			target: `${name}/ui-${componentName}.component.scss`
		})

		await template.generate({
			template: './ui/index-ui.js.ejs',
			target: `${name}/index.ts`,
			props: { componentName }
		})

		await template.generate({
			template: './ui/spec-ui.js.ejs',
			target: `${name}/ui-${componentName}.component.spec.ts`,
			props: { componentName, camelCase }
		})

		success(`Generated ui component ${name}`)
	}
	toolbox.createUi = createUi
}
