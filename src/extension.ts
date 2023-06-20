// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import Helpers from './helpers';
import RouteProvider from './RouteProvider';
import ConfigProvider from './ConfigProvider';
import ValidationProvider from './ValidationProvider';
import TranslationProvider from './TranslationProvider';

export function activate(context: vscode.ExtensionContext) {
    if (
        vscode.workspace.workspaceFolders instanceof Array &&
        vscode.workspace.workspaceFolders.length > 0
    ) {
        if (fs.existsSync(Helpers.projectPath('artisan'))) {
            if (Helpers.outputChannel === null) {
                Helpers.outputChannel = vscode.window.createOutputChannel(
                    'Laravel Extra Intellisense',
                );
                Helpers.outputChannel.appendLine(
                    'Laravel Extra Intellisense Started...',
                );
            }

            const LANGUAGES = [
                { scheme: 'file', language: 'php' },
                { scheme: 'file', language: 'vue' },
                { scheme: 'file', language: 'javascript' },
            ];

            const PHP_ONLY = [{ scheme: 'file', language: 'php' }];

            const TRIGGER_CHARACTERS = '"\''.split('');

            context.subscriptions.push(
                vscode.languages.registerCompletionItemProvider(
                    LANGUAGES,
                    new RouteProvider(),
                    ...TRIGGER_CHARACTERS,
                ),
            );
            context.subscriptions.push(
                vscode.languages.registerCompletionItemProvider(
                    LANGUAGES,
                    new ConfigProvider(),
                    ...TRIGGER_CHARACTERS,
                ),
            );

            context.subscriptions.push(
                vscode.languages.registerCompletionItemProvider(
                    PHP_ONLY,
                    new ValidationProvider(),
                    ...TRIGGER_CHARACTERS,
                ),
            );

            context.subscriptions.push(
                vscode.languages.registerCompletionItemProvider(
                    LANGUAGES,
                    new TranslationProvider(),
                    ...TRIGGER_CHARACTERS,
                ),
            );
        }
    }
    console.log(
        'Congratulations, your extension "laravel-route" is now active!',
    );

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand(
        'laravel-route.helloWorld',
        () => {
            // The code you place here will be executed every time your command is executed
            // Display a message box to the user
            vscode.window.showInformationMessage(
                'Hello World from laravel-route!',
            );
        },
    );

    context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
