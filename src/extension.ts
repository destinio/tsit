import * as vscode from 'vscode'
import { getTypes } from './commands/getTypes'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tsit.get-types', () => getTypes(context))
  )
}

export function deactivate() {}
