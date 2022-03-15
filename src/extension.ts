import * as vscode from 'vscode'
import { getTypes } from './commands/getTypes'
import { getTypesFromSelected } from './commands/getTypesFromSelected'

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('tsit.get-types', () => getTypes(context))
  )
  context.subscriptions.push(
    vscode.commands.registerCommand('tsit.get-types-select', () => getTypesFromSelected(context))
  )
}

export function deactivate() {}
