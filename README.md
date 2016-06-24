# Enhanced Grunt Logs

Extends Grunt with functionality for logging ["pretty" JSON objects](https://github.com/rafeca/prettyjson) and [tables](https://github.com/Automattic/cli-table).

![Example Video](https://github.com/tkambler/grunt-enhanced-logs/raw/master/screenshot.png)

---

## Setup

Extend Grunt as shown below.

```
// Gruntfile.js

module.exports = (grunt) => {
	require('grunt-enhanced-logs')(grunt);
};
```

## Examples

```
module.exports = (grunt) => {

	grunt.registerTask('foo', function() {

		const users = [
			{
			    'first_name': 'John',
			    'last_name': 'Doe'
			},
			{
			    'first_name': 'Jane',
			    'last_name': 'Doe'
			}
		];

		grunt.log.subhead(`Log a single JSON object:`);
		grunt.log.prettyJSON(users[0]);

		grunt.log.subhead(`Log an array of JSON objects:`);
		grunt.log.prettyJSON(users);

        grunt.log.subhead(`Log a simple CLI table:`);
		grunt.log.cliTable(users);

        grunt.log.subhead(`Log a CLI table with some additional options:`);
		grunt.log.cliTable({
			'head': [
				{
					'key': 'first_name',
					'label': 'First Name'
				},
				{
					'key': 'last_name',
					'label': 'Last Name'
				}
			]
		}, users);

	});

};
```