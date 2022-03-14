import * as vscode from 'vscode'
import axios from 'axios'
import jsonToTs from 'json-to-ts'
import * as copy from 'copy-to-clipboard'

function createHTML(text: string[], webview: vscode.Webview, context: vscode.ExtensionContext) {
  const pres = text
    .map(type => {
      return `
        <pre>${type}</pre>`
    })
    .join('')

  const toCopy = text
    .map(type => {
      return `${type}`
    })
    .join('\n\n')

  console.log(toCopy)

  const css = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'public', 'styles.css')
  )

  const js = vscode.Uri.joinPath(context.extensionUri, 'public', 'tsit.js')

  const scriptUri = js.with({ scheme: 'vscode-resource' })

  return `<!DOCTYPE html>
	<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
		<link href="${css}" rel="stylesheet">
</head>
<body>
	<h1>Types</h1>
  <div class="controls">
    <button id="copy-btn" class="btn">Copy to clipboard</button>
    <div id="check-mark" class="check-mark">&#10003;</div>
  </div>
  <div id="to-copy" style="display: none">${toCopy}</div>
  ${pres}
  <script src="${scriptUri}"></script>
</body>
</html>`
}

async function getTypes(context: vscode.ExtensionContext) {
  const url = await vscode.window.showInputBox({
    title: 'Get type defs from json api end-point',
    placeHolder: 'Please enter a valid URL',
    value: 'https://jsonplaceholder.typicode.com/users',
    ignoreFocusOut: true,
  })

  if (!url || url.length <= 0) {
    vscode.window.showErrorMessage('Please Enter a valid URL')
    return
  }

  const urlRegEx = new RegExp(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
  )

  const isUrl = urlRegEx.test(url)

  if (!isUrl) {
    vscode.window.showErrorMessage('Please Enter a valid URL')
    return
  }

  const res = await axios(url)
  const json = await res.data

  const types = jsonToTs(json)

  const panel = vscode.window.createWebviewPanel(
    'tsit',
    'TSIt: Get all types',
    vscode.ViewColumn.One,
    {
      enableScripts: true,
    }
  )

  panel.webview.html = createHTML(types, panel.webview, context)
}

export { getTypes }

// https://jsonplaceholder.typicode.com/users
