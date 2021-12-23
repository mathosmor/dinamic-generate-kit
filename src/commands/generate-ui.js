const command = {
	name: 'generate:ui',
	alias: ['g:u'],
	description: 'Create a new ui component',
	run: async toolbox => {
		const {
			parameters,
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

		await createUi(name)
	}
}

module.exports = command;
