import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types';
import { section as s03 } from './s03-operators';
import { section as s04 } from './s04-control-flow';
import { section as s05 } from './s05-functions';
import { section as s06 } from './s06-arrays';
import { section as s07 } from './s07-slices';
import { section as s08 } from './s08-pointers';
import { section as s09 } from './s09-structs';
import { section as s10 } from './s10-enums';
import { section as s11 } from './s11-unions';
import { section as s12 } from './s12-optionals';
import { section as s13 } from './s13-error-handling';
import { section as s14 } from './s14-error-unions';
import { section as s15 } from './s15-defer-errdefer';
import { section as s16 } from './s16-comptime';
import { section as s17 } from './s17-generics';
import { section as s18 } from './s18-allocators';
import { section as s19 } from './s19-arraylist';
import { section as s20 } from './s20-hashmap';
import { section as s21 } from './s21-strings';
import { section as s22 } from './s22-formatting';
import { section as s23 } from './s23-io';
import { section as s24 } from './s24-file-system';
import { section as s25 } from './s25-testing';
import { section as s26 } from './s26-build-system';
import { section as s27 } from './s27-packed-structs';
import { section as s28 } from './s28-vectors';
import { section as s29 } from './s29-async';
import { section as s30 } from './s30-threads';
import { section as s31 } from './s31-atomics';
import { section as s32 } from './s32-sentinel-terminated';
import { section as s33 } from './s33-alignment';
import { section as s34 } from './s34-extern';
import { section as s35 } from './s35-c-interop';
import { section as s36 } from './s36-inline-assembly';
import { section as s37 } from './s37-type-info';
import { section as s38 } from './s38-anytype';
import { section as s39 } from './s39-tuples';
import { section as s40 } from './s40-labelled-blocks';
import { section as s41 } from './s41-error-tracing';
import { section as s42 } from './s42-safety-features';
import { section as s43 } from './s43-performance';
import { section as s44 } from './s44-design-patterns';
import { section as s45 } from './s45-memory-patterns';
import { section as s46 } from './s46-data-structures';
import { section as s47 } from './s47-algorithms';
import { section as s48 } from './s48-embedded';
import { section as s49 } from './s49-wasm';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
	s41, s42, s43, s44, s45, s46, s47, s48, s49, s50
];

export const track: Track = {
	id: 'zig',
	name: 'Zig',
	language: 'zig',
	monacoLang: 'zig',
	icon: '⟠',
	description: 'Low-level systems programming with comptime metaprogramming and no hidden control flow.',
	sections
};
