import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-primitives';
import { section as s03 } from './s03-operators';
import { section as s04 } from './s04-strings';
import { section as s05 } from './s05-control-flow';
import { section as s06 } from './s06-arrays';
import { section as s07 } from './s07-methods';
import { section as s08 } from './s08-classes';
import { section as s09 } from './s09-constructors';
import { section as s10 } from './s10-encapsulation';
import { section as s11 } from './s11-inheritance';
import { section as s12 } from './s12-polymorphism';
import { section as s13 } from './s13-abstract-classes';
import { section as s14 } from './s14-interfaces';
import { section as s15 } from './s15-enums';
import { section as s16 } from './s16-generics';
import { section as s17 } from './s17-collections-list';
import { section as s18 } from './s18-collections-set';
import { section as s19 } from './s19-collections-map';
import { section as s20 } from './s20-iterators';
import { section as s21 } from './s21-exceptions';
import { section as s22 } from './s22-io-streams';
import { section as s23 } from './s23-nio';
import { section as s24 } from './s24-lambdas';
import { section as s25 } from './s25-streams-api';
import { section as s26 } from './s26-optional';
import { section as s27 } from './s27-records';
import { section as s28 } from './s28-sealed-classes';
import { section as s29 } from './s29-pattern-matching';
import { section as s30 } from './s30-concurrency-threads';
import { section as s31 } from './s31-concurrency-executors';
import { section as s32 } from './s32-concurrency-locks';
import { section as s33 } from './s33-concurrent-collections';
import { section as s34 } from './s34-completable-future';
import { section as s35 } from './s35-virtual-threads';
import { section as s36 } from './s36-annotations';
import { section as s37 } from './s37-reflection';
// TODO: sections s38-s50 not yet created
// import { section as s38 } from './s38-modules';
// import { section as s39 } from './s39-testing-junit';
// import { section as s40 } from './s40-testing-mocks';
// import { section as s41 } from './s41-design-singleton';
// import { section as s42 } from './s42-design-factory';
// import { section as s43 } from './s43-design-observer';
// import { section as s44 } from './s44-design-strategy';
// import { section as s45 } from './s45-design-builder';
// import { section as s46 } from './s46-jdbc';
// import { section as s47 } from './s47-networking';
// import { section as s48 } from './s48-serialization';
// import { section as s49 } from './s49-functional';
// import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37,
];

export const track: Track = {
	id: 'java',
	name: 'Java',
	language: 'java',
	monacoLang: 'java',
	icon: '☕',
	description: 'Enterprise-grade object-oriented programming with the JVM ecosystem.',
	sections
};
