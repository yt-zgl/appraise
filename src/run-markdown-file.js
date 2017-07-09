'use strict';
const path = require('path'),
	fs = require('./fs-promise'),
	exampleFile = 'examples/hello-world.md',
	annotateExample = require('./annotate-example'),
	annotateImage = require('./annotate-image'),
	Markdown = require('markdown-it'),
	md = new Markdown().use(annotateExample).use(annotateImage),
	outputDir = 'results';


fs.mkdirAsync(outputDir)
	.then(() => fs.readFileAsync(exampleFile, 'utf8'))
	.then(text => md.render(text))
	.then(content => fs.writeFileAsync(path.join(outputDir, path.basename(exampleFile, '.md') + '.html'), content, {encoding: 'utf8'}));

