// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as child_process from 'child_process';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "kustomize-preview" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('kustomize-preview.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from kustomize-preview!');
	// });

	// context.subscriptions.push(disposable);

	vscode.commands.registerCommand('kustomize-preview.preview', (resource: vscode.Uri) => {
		const path = resource.fsPath;
		const parentDirectoryParts = path.split('/').slice(0, -1);
		const parentDirectory = parentDirectoryParts.join('/');

		vscode.window.showInformationMessage(parentDirectory);

		child_process.exec(`kustomize build ${parentDirectory}`, function callback(error, stdout, stderr) {
			vscode.window.showErrorMessage(stderr);

			vscode.workspace.openTextDocument({language: 'yaml'}).then(doc => {
				vscode.window.showTextDocument(doc, 1, false).then(e => {
					e.edit(edit => {
						console.log(stdout);
						edit.insert(new vscode.Position(0, 0), stdout);
					});
				});
			});
		});
	});
}

// this method is called when your extension is deactivated
export function deactivate() {}
