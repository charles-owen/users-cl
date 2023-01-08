/**
 * @file
 * Course console entry point.
 */

import {UsersConsole} from './UsersConsole';
import MembersFetcherComponent from './'
if(!Site.UsersConsole) {
    Site.UsersConsole = new UsersConsole(Site);
}
