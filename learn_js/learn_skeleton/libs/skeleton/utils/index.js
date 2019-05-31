const path = require('path');
const fs = require('fs');
const { promisify } = require('util')

async function genScriptContent() {
    const sourcePath = path.resolve(__dirname, './handler.js');
    const result = await promisify(fs.readFile)(sourcePath, 'utf-8');
    return result;
}

// add script tag into html string, just as document.body.appendChild(script)
function addScriptTag(source, src, port) {
    const token = source.split('</body>');
    if (token.length < 2) return source;
    const scriptTag = `
      <script>
        window._pageSkeletonSocketPort = ${port}
      </script>
      <script type="text/javascript" src="${src}" defer></script>
      `;
    return `${token[0]}${scriptTag}</body>${token[1]}`;
}

module.exports = {
    addScriptTag,
    genScriptContent
};
