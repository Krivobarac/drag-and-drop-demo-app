import {ProjectInput} from './components/project-input.js';
import {ProjectList} from './components/project-list.js';
import { ProjectStatus } from './_types/enums/project-status.js';

new ProjectInput();

new ProjectList(ProjectStatus.ACTIVE);
new ProjectList(ProjectStatus.FINISHED);

