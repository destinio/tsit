import * as vscode from 'vscode'
import axios from 'axios'
import jsonToTs from 'json-to-ts'
import * as path from 'path'

function createHTML(text: string[], webview: vscode.Webview, context: vscode.ExtensionContext) {
  const pres = text
    .map(type => {
      return `
        <pre>${type}</pre>`
    })
    .join('')

  const css = webview.asWebviewUri(
    vscode.Uri.joinPath(context.extensionUri, 'public', 'styles.css')
  )

  return `<!DOCTYPE html>
	<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cat Coding</title>
		<link href="${css}" rel="stylesheet">
</head>
<body>
	<h1>Types<h1>
  ${pres}
</body>
</html>`
}

async function getTypes(context: vscode.ExtensionContext) {
  const url = await vscode.window.showInputBox({
    title: 'Get type defs from json api end-point',
    placeHolder: 'Please enter a valid URL',
    ignoreFocusOut: true,
  })

  const res = await axios(url!)
  const json = await res.data

  const types = jsonToTs(json)

  const panel = vscode.window.createWebviewPanel(
    'tsit',
    'TSIt: Get all types',
    vscode.ViewColumn.One,
    {
      // Only allow the webview to access resources in our extension's public directory
      // localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, 'public'))],
    }
  )

  panel.webview.html = createHTML(types, panel.webview, context)
}

export { getTypes }

// https://jsonplaceholder.typicode.com/users
