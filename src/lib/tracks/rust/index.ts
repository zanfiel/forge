import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-basic-types';
import { section as s03 } from './s03-functions';
import { section as s04 } from './s04-control-flow';
import { section as s05 } from './s05-ownership';
import { section as s06 } from './s06-borrowing';
import { section as s07 } from './s07-slices';
import { section as s08 } from './s08-structs';
import { section as s09 } from './s09-enums';
import { section as s10 } from './s10-pattern-matching';
import { section as s11 } from './s11-methods';
import { section as s12 } from './s12-traits';
import { section as s13 } from './s13-generics';
import { section as s14 } from './s14-lifetimes';
import { section as s15 } from './s15-closures';
import { section as s16 } from './s16-iterators';
import { section as s17 } from './s17-smart-pointers';
import { section as s18 } from './s18-error-handling';
import { section as s19 } from './s19-collections-vec';
import { section as s20 } from './s20-collections-hashmap';
import { section as s21 } from './s21-strings';
import { section as s22 } from './s22-modules';
import { section as s23 } from './s23-crates';
import { section as s24 } from './s24-testing';
import { section as s25 } from './s25-concurrency-threads';
import { section as s26 } from './s26-concurrency-channels';
import { section as s27 } from './s27-concurrency-shared';
import { section as s28 } from './s28-async-await';
import { section as s29 } from './s29-macros-declarative';
import { section as s30 } from './s30-macros-procedural';
import { section as s31 } from './s31-unsafe';
import { section as s32 } from './s32-trait-objects';
import { section as s33 } from './s33-associated-types';
import { section as s34 } from './s34-operator-overloading';
import { section as s35 } from './s35-deref-coercion';
import { section as s36 } from './s36-drop-trait';
import { section as s37 } from './s37-rc-arc';
import { section as s38 } from './s38-interior-mutability';
import { section as s39 } from './s39-type-state';
import { section as s40 } from './s40-builder-pattern';
import { section as s41 } from './s41-newtype';
import { section as s42 } from './s42-phantom-data';
import { section as s43 } from './s43-pin-unpin';
import { section as s44 } from './s44-futures';
import { section as s45 } from './s45-tokio-basics';
import { section as s46 } from './s46-serde';
import { section as s47 } from './s47-cli-apps';
import { section as s48 } from './s48-web-basics';
import { section as s49 } from './s49-ffi';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
	s41, s42, s43, s44, s45, s46, s47, s48, s49, s50
];

export const track: Track = {
	id: 'rust',
	name: 'Rust',
	language: 'rust',
	monacoLang: 'rust',
	icon: '🦀',
	description: 'Systems programming with safety guarantees, zero-cost abstractions, and fearless concurrency.',
	sections
};
