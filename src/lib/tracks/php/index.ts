import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types';
import { section as s03 } from './s03-operators';
import { section as s04 } from './s04-strings';
import { section as s05 } from './s05-arrays';
import { section as s06 } from './s06-control-flow';
import { section as s07 } from './s07-functions';
import { section as s08 } from './s08-closures';
import { section as s09 } from './s09-classes';
import { section as s10 } from './s10-inheritance';
import { section as s11 } from './s11-interfaces';
import { section as s12 } from './s12-traits';
import { section as s13 } from './s13-abstract';
import { section as s14 } from './s14-enums';
import { section as s15 } from './s15-namespaces';
import { section as s16 } from './s16-exceptions';
import { section as s17 } from './s17-generators';
import { section as s18 } from './s18-type-system';
import { section as s19 } from './s19-collections';
import { section as s20 } from './s20-regex';
import { section as s21 } from './s21-file-io';
import { section as s22 } from './s22-json';
import { section as s23 } from './s23-datetime';
import { section as s24 } from './s24-pdo';
import { section as s25 } from './s25-sessions-cookies';
import { section as s26 } from './s26-http';
import { section as s27 } from './s27-forms';
import { section as s28 } from './s28-security';
import { section as s29 } from './s29-composer';
import { section as s30 } from './s30-testing';
import { section as s31 } from './s31-design-singleton';
import { section as s32 } from './s32-design-factory';
import { section as s33 } from './s33-design-observer';
import { section as s34 } from './s34-design-strategy';
import { section as s35 } from './s35-design-decorator';
import { section as s36 } from './s36-dependency-injection';
import { section as s37 } from './s37-middleware';
import { section as s38 } from './s38-routing';
import { section as s39 } from './s39-templating';
import { section as s40 } from './s40-orm-basics';
import { section as s41 } from './s41-fibers';
import { section as s42 } from './s42-attributes';
import { section as s43 } from './s43-readonly';
import { section as s44 } from './s44-intersection-union';
import { section as s45 } from './s45-match-expression';
import { section as s46 } from './s46-named-arguments';
import { section as s47 } from './s47-first-class-callable';
import { section as s48 } from './s48-fiber-async';
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
	id: 'php',
	name: 'PHP',
	language: 'php',
	monacoLang: 'php',
	icon: '🐘',
	description: 'Server-side web development with modern PHP features and ecosystem tools.',
	sections
};
