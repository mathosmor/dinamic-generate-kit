const command = {
	name: 'generate:component',
	alias: ['g:c'],
	description: 'Create a new component',
	run: async toolbox => {
		const {
			parameters,
			createComponent,
			print: { info }
		} = toolbox

		const figlet = require('figlet');

		const name = parameters.first

		info(figlet.textSync('DGKIT', { horizontalLayout: 'full' }))

		if (!name) {
			error('NAME MUST BE SPECIFIED!');
			return;
		}

		await createComponent(name)
	}
}

module.exports = command;
