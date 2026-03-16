import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types';
import { section as s03 } from './s03-strings';
import { section as s04 } from './s04-operators';
import { section as s05 } from './s05-control-flow';
import { section as s06 } from './s06-functions';
import { section as s07 } from './s07-closures';
import { section as s08 } from './s08-arrays';
import { section as s09 } from './s09-dictionaries';
import { section as s10 } from './s10-sets';
import { section as s11 } from './s11-optionals';
import { section as s12 } from './s12-enums';
import { section as s13 } from './s13-structs';
import { section as s14 } from './s14-classes';
import { section as s15 } from './s15-inheritance';
import { section as s16 } from './s16-protocols';
import { section as s17 } from './s17-extensions';
import { section as s18 } from './s18-generics';
import { section as s19 } from './s19-error-handling';
import { section as s20 } from './s20-access-control';
import { section as s21 } from './s21-properties';
import { section as s22 } from './s22-subscripts';
import { section as s23 } from './s23-initialization';
import { section as s24 } from './s24-deinitialization';
import { section as s25 } from './s25-arc';
import { section as s26 } from './s26-closures-advanced';
import { section as s27 } from './s27-type-casting';
import { section as s28 } from './s28-nested-types';
import { section as s29 } from './s29-opaque-types';
import { section as s30 } from './s30-concurrency-async';
import { section as s31 } from './s31-concurrency-actors';
import { section as s32 } from './s32-concurrency-structured';
import { section as s33 } from './s33-pattern-matching';
import { section as s34 } from './s34-result-builders';
import { section as s35 } from './s35-property-wrappers';
import { section as s36 } from './s36-codable';
import { section as s37 } from './s37-keypath';
import { section as s38 } from './s38-collection-protocols';
import { section as s39 } from './s39-custom-operators';
import { section as s40 } from './s40-macros';
import { section as s41 } from './s41-testing';
import { section as s42 } from './s42-design-singleton';
import { section as s43 } from './s43-design-factory';
import { section as s44 } from './s44-design-observer';
import { section as s45 } from './s45-design-strategy';
import { section as s46 } from './s46-design-mvvm';
import { section as s47 } from './s47-swiftui-basics';
import { section as s48 } from './s48-combine';
import { section as s49 } from './s49-advanced';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
	s41, s42, s43, s44, s45, s46, s47, s48, s49, s50
];

export const track: Track = {
	id: 'swift',
	name: 'Swift',
	language: 'swift',
	monacoLang: 'swift',
	icon: '🐦',
	description: 'Safe, fast, and expressive programming for Apple platforms and beyond.',
	sections
};
