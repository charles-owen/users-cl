/**
 * @file
 * Course console entry point.
 */

import {UsersConsole} from './UsersConsole';

if(!Site.UsersConsole) {
    Site.UsersConsole = new UsersConsole(Site);
}
