/**
 * Python Track -- 1000 exercises across 50 sections
 */

import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-strings';
import { section as s03 } from './s03-numbers';
import { section as s04 } from './s04-booleans-conditions';
import { section as s05 } from './s05-lists';
import { section as s06 } from './s06-tuples';
import { section as s07 } from './s07-dictionaries';
import { section as s08 } from './s08-sets';
import { section as s09 } from './s09-loops';
import { section as s10 } from './s10-functions';
import { section as s11 } from './s11-scope-closures';
import { section as s12 } from './s12-lambda-higher-order';
import { section as s13 } from './s13-comprehensions';
import { section as s14 } from './s14-generators';
import { section as s15 } from './s15-decorators';
import { section as s16 } from './s16-classes-basic';
import { section as s17 } from './s17-inheritance';
import { section as s18 } from './s18-magic-methods';
import { section as s19 } from './s19-properties-descriptors';
import { section as s20 } from './s20-abstract-classes';
import { section as s21 } from './s21-exceptions';
import { section as s22 } from './s22-context-managers';
import { section as s23 } from './s23-iterators';
import { section as s24 } from './s24-modules-packages';
import { section as s25 } from './s25-file-io';
import { section as s26 } from './s26-string-formatting';
import { section as s27 } from './s27-regex';
import { section as s28 } from './s28-typing-basic';
import { section as s29 } from './s29-typing-advanced';
import { section as s30 } from './s30-dataclasses';
import { section as s31 } from './s31-enums';
import { section as s32 } from './s32-functools';
import { section as s33 } from './s33-itertools';
import { section as s34 } from './s34-collections';
import { section as s35 } from './s35-pathlib-os';
import { section as s36 } from './s36-json-serialization';
import { section as s37 } from './s37-datetime';
import { section as s38 } from './s38-async-await';
import { section as s39 } from './s39-concurrency';
import { section as s40 } from './s40-testing';
import { section as s41 } from './s41-protocols';
import { section as s42 } from './s42-metaclasses';
import { section as s43 } from './s43-slots-memory';
import { section as s44 } from './s44-walrus-match';
import { section as s45 } from './s45-networking';
import { section as s46 } from './s46-databases';
import { section as s47 } from './s47-patterns-factory';
import { section as s48 } from './s48-patterns-strategy';
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
  id: 'python',
  name: 'Python',
  language: 'python',
  monacoLang: 'python',
  icon: '🐍',
  description: 'Clean, readable, powerful. From scripts to AI -- Python does it all. 1000 exercises from beginner to advanced.',
  sections,
};
