/**
 * TypeScript Track — 1000 exercises across 50 sections
 *
 * Comprehensive TypeScript curriculum from absolute beginner to advanced.
 * Each section contains 20 exercises with progressive difficulty.
 */

import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-basic-types';
import { section as s03 } from './s03-type-annotations';
import { section as s04 } from './s04-operators';
import { section as s05 } from './s05-conditionals';
import { section as s06 } from './s06-loops';
import { section as s07 } from './s07-functions-basic';
import { section as s08 } from './s08-arrow-functions';
import { section as s09 } from './s09-function-types';
import { section as s10 } from './s10-arrays-basic';
import { section as s11 } from './s11-array-methods';
import { section as s12 } from './s12-objects-basic';
import { section as s13 } from './s13-interfaces';
import { section as s14 } from './s14-type-aliases';
import { section as s15 } from './s15-union-intersection';
import { section as s16 } from './s16-literal-types';
import { section as s17 } from './s17-enums';
import { section as s18 } from './s18-tuples';
import { section as s19 } from './s19-type-narrowing';
import { section as s20 } from './s20-classes-basic';
import { section as s21 } from './s21-inheritance';
import { section as s22 } from './s22-access-modifiers';
import { section as s23 } from './s23-abstract-classes';
import { section as s24 } from './s24-generics-intro';
import { section as s25 } from './s25-generic-constraints';
import { section as s26 } from './s26-generic-utilities';
import { section as s27 } from './s27-mapped-types';
import { section as s28 } from './s28-conditional-types';
import { section as s29 } from './s29-template-literals';
import { section as s30 } from './s30-promises';
import { section as s31 } from './s31-async-await';
import { section as s32 } from './s32-error-handling';
import { section as s33 } from './s33-modules';
import { section as s34 } from './s34-namespaces';
import { section as s35 } from './s35-decorators';
import { section as s36 } from './s36-iterators-generators';
import { section as s37 } from './s37-symbols';
import { section as s38 } from './s38-proxy-reflect';
import { section as s39 } from './s39-type-guards';
import { section as s40 } from './s40-discriminated-unions';
import { section as s41 } from './s41-index-signatures';
import { section as s42 } from './s42-declaration-merging';
import { section as s43 } from './s43-utility-types';
import { section as s44 } from './s44-infer-keyword';
import { section as s45 } from './s45-recursive-types';
import { section as s46 } from './s46-variance';
import { section as s47 } from './s47-patterns-builder';
import { section as s48 } from './s48-patterns-state';
import { section as s49 } from './s49-patterns-observer';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
  s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
  s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
  s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
  s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
  s41, s42, s43, s44, s45, s46, s47, s48, s49, s50,
];

export const track: Track = {
  id: 'typescript',
  name: 'TypeScript',
  language: 'typescript',
  monacoLang: 'typescript',
  icon: '🔷',
  description: 'Variables, functions, types, objects, arrays, async -- the language of the modern web. 1000 exercises from beginner to advanced.',
  sections,
};
