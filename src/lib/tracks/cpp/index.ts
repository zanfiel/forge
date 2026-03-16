import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types';
import { section as s03 } from './s03-operators';
import { section as s04 } from './s04-control-flow';
import { section as s05 } from './s05-functions';
import { section as s06 } from './s06-references';
import { section as s07 } from './s07-pointers';
import { section as s08 } from './s08-arrays';
import { section as s09 } from './s09-strings';
import { section as s10 } from './s10-structs';
import { section as s11 } from './s11-classes';
import { section as s12 } from './s12-constructors';
import { section as s13 } from './s13-copy-move';
import { section as s14 } from './s14-inheritance';
import { section as s15 } from './s15-polymorphism';
import { section as s16 } from './s16-templates-basic';
import { section as s17 } from './s17-templates-advanced';
import { section as s18 } from './s18-stl-vector';
import { section as s19 } from './s19-stl-map';
import { section as s20 } from './s20-stl-set';
import { section as s21 } from './s21-stl-algorithms';
import { section as s22 } from './s22-iterators';
import { section as s23 } from './s23-smart-pointers';
import { section as s24 } from './s24-raii';
import { section as s25 } from './s25-exceptions';
import { section as s26 } from './s26-namespaces';
import { section as s27 } from './s27-operator-overloading';
import { section as s28 } from './s28-lambda';
import { section as s29 } from './s29-auto-decltype';
import { section as s30 } from './s30-constexpr';
import { section as s31 } from './s31-concepts';
import { section as s32 } from './s32-ranges';
import { section as s33 } from './s33-coroutines';
import { section as s34 } from './s34-modules-cpp20';
import { section as s35 } from './s35-move-semantics';
import { section as s36 } from './s36-perfect-forwarding';
import { section as s37 } from './s37-variadic-templates';
import { section as s38 } from './s38-sfinae';
import { section as s39 } from './s39-type-traits';
import { section as s40 } from './s40-memory-model';
import { section as s41 } from './s41-atomics';
import { section as s42 } from './s42-threads';
import { section as s43 } from './s43-mutex-locks';
import { section as s44 } from './s44-condition-variables';
import { section as s45 } from './s45-design-patterns';
import { section as s46 } from './s46-metaprogramming';
import { section as s47 } from './s47-crtp';
import { section as s48 } from './s48-allocators';
import { section as s49 } from './s49-embedded';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
	s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
	s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
	s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
	s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
	s41, s42, s43, s44, s45, s46, s47, s48, s49, s50
];

export const track: Track = {
	id: 'cpp',
	name: 'C++',
	language: 'cpp',
	monacoLang: 'cpp',
	icon: '⚡',
	description: 'High-performance programming with zero-overhead abstractions and modern C++ features.',
	sections
};
