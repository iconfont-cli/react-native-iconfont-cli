import minimist from 'minimist';
import { createJson } from './commands/createJson';
import { renderHelp } from './commands/help';
import { createIcon } from './commands/createIcon';

const args = minimist(process.argv.slice(2));

switch (args._[0]) {
    case 'init':
        createJson();
        break;
    case undefined:
        createIcon();
        break;
    default:
        renderHelp();
}
