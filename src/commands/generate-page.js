const command = {
	name: 'generate:page',
	alias: ['g:p'],
	description: 'Create a new page',
	run: async toolbox => {
		const {
			parameters,
			createPage,
			print: { info }
		} = toolbox

		const figlet = require('figlet');

		info(figlet.textSync('DGKIT', { horizontalLayout: 'full' }))

		const name = parameters.first
		
		if (!name) {
			error('NAME MUST BE SPECIFIED!');
			return;
		}


		await createPage(name)
	}
}

module.exports = command;

