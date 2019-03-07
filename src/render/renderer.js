// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

function mdContent(...lines) {
  return lines.join('\n');
}

var MarkdownIt = require('markdown-it'),
    md = new MarkdownIt();

var result = md.render(
  mdContent(
    '# The Awesome Markdown notebook',
    'This could become my favourite markdown notebook.',
    '',
    'I tried to learn mindforger, but no luck. It was just over engineered, but had some good ideas.',
    'Now, I try to make something similar, but easier and more human"',
    '',
    '> *Shut up and take my money!*',
    '> Anon',
    '',
    '## Features',
    '',
    ' - Editing of content on the fly',
    ' - Searching for matching content',
    ' - Linking content',
    ' - Nice layout',
    ' - code highlight',
    '',
    ' ## Additional ideas',
    ' - S3 sync',
    ' - look and feel customisation',
    '',
    ' ### H3 level header',
    '',
    ' ### H4 level header',
  )
);
var element = document.createElement('div');
element.innerHTML = result;
var content = document.getElementById('content');

content.appendChild(element);
