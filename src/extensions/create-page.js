module.exports = toolbox => {
	const {
		template,
		print: { success }
	} = toolbox

	async function createPage(name) {

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
			template: './pages/ts-page.js.ejs',
			target: `${name}/${componentName}.page.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './pages/module-page.js.ejs',
			target: `${name}/${componentName}-page.module.ts`,
			props: { camelCase, componentName }
		})

		await template.generate({
			template: './pages/stories-page.js.ejs',
			target: `${name}/${componentName}-page.stories.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './pages/template-page.js.ejs',
			target: `${name}/${componentName}.page.html`,
			props: { componentName }
		})

		await template.generate({
			template: './pages/style-page.js.ejs',
			target: `${name}/${componentName}.page.scss`
		})

		await template.generate({
			template: './pages/routing-page.js.ejs',
			target: `${name}/${componentName}-page-routing.module.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './pages/spec-page.js.ejs',
			target: `${name}/${componentName}.page.spec.ts`,
			props: { componentName, camelCase }
		})

		await template.generate({
			template: './pages/index-page.js.ejs',
			target: `${name}/index.ts`,
			props: { componentName, camelCase }
		})

		success(`Generated page ${name}`)
	}
	toolbox.createPage = createPage
}
