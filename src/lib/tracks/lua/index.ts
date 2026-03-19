import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types';
import { section as s03 } from './s03-strings';
import { section as s04 } from './s04-numbers';
import { section as s05 } from './s05-tables-array';
import { section as s06 } from './s06-tables-dict';
import { section as s07 } from './s07-control-flow';
import { section as s08 } from './s08-functions';
import { section as s09 } from './s09-scope';
import { section as s10 } from './s10-closures';
import { section as s11 } from './s11-iterators';
import { section as s12 } from './s12-coroutines';
import { section as s13 } from './s13-metatables';
import { section as s14 } from './s14-metamethods';
import { section as s15 } from './s15-oop-basic';
import { section as s16 } from './s16-oop-inheritance';
import { section as s17 } from './s17-modules';
import { section as s18 } from './s18-file-io';
import { section as s19 } from './s19-string-patterns';
import { section as s20 } from './s20-error-handling';
import { section as s21 } from './s21-pcall-xpcall';
import { section as s22 } from './s22-environments';
import { section as s23 } from './s23-weak-tables';
import { section as s24 } from './s24-garbage-collection';
import { section as s25 } from './s25-c-api-basics';
import { section as s26 } from './s26-userdata';
import { section as s27 } from './s27-debug-library';
import { section as s28 } from './s28-table-library';
import { section as s29 } from './s29-math-library';
import { section as s30 } from './s30-os-library';
import { section as s31 } from './s31-io-library';
import { section as s32 } from './s32-string-library';
import { section as s33 } from './s33-package-system';
import { section as s34 } from './s34-varargs';
import { section as s35 } from './s35-tail-calls';
import { section as s36 } from './s36-multiple-returns';
import { section as s37 } from './s37-table-manipulation';
import { section as s38 } from './s38-functional';
import { section as s39 } from './s39-event-system';
import { section as s40 } from './s40-state-machine';
import { section as s41 } from './s41-ecs-pattern';
import { section as s42 } from './s42-serialization';
import { section as s43 } from './s43-config-dsl';
import { section as s44 } from './s44-game-loop';
import { section as s45 } from './s45-love2d-basics';
import { section as s46 } from './s46-design-singleton';
import { section as s47 } from './s47-design-factory';
import { section as s48 } from './s48-design-observer';
import { section as s49 } from './s49-performance';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
	s41, s42, s43, s44, s45, s46, s47, s48, s49, s50
];

export const track: Track = {
	id: 'lua',
	name: 'Lua',
	language: 'lua',
	monacoLang: 'lua',
	icon: '🌙',
	description: 'Lightweight embeddable scripting language for game development and configuration.',
	sections
};
