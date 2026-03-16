/**
 * JavaScript Track -- 1000 exercises across 50 sections
 */

import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-variables';
import { section as s02 } from './s02-types-coercion';
import { section as s03 } from './s03-strings';
import { section as s04 } from './s04-numbers-math';
import { section as s05 } from './s05-conditionals';
import { section as s06 } from './s06-loops';
import { section as s07 } from './s07-functions';
import { section as s08 } from './s08-arrow-functions';
import { section as s09 } from './s09-scope-closures';
import { section as s10 } from './s10-arrays';
import { section as s11 } from './s11-array-methods';
import { section as s12 } from './s12-objects';
import { section as s13 } from './s13-destructuring';
import { section as s14 } from './s14-spread-rest';
import { section as s15 } from './s15-classes';
import { section as s16 } from './s16-inheritance';
import { section as s17 } from './s17-prototypes';
import { section as s18 } from './s18-this-binding';
import { section as s19 } from './s19-symbols-iterators';
import { section as s20 } from './s20-generators';
import { section as s21 } from './s21-promises';
import { section as s22 } from './s22-async-await';
import { section as s23 } from './s23-error-handling';
import { section as s24 } from './s24-modules';
import { section as s25 } from './s25-regex';
import { section as s26 } from './s26-maps-sets';
import { section as s27 } from './s27-weakref-finalization';
import { section as s28 } from './s28-proxy-reflect';
import { section as s29 } from './s29-template-literals';
import { section as s30 } from './s30-dom-basics';
import { section as s31 } from './s31-dom-events';
import { section as s32 } from './s32-dom-manipulation';
import { section as s33 } from './s33-fetch-api';
import { section as s34 } from './s34-web-storage';
import { section as s35 } from './s35-web-workers';
import { section as s36 } from './s36-json';
import { section as s37 } from './s37-date-intl';
import { section as s38 } from './s38-structured-clone';
import { section as s39 } from './s39-abortcontroller';
import { section as s40 } from './s40-performance';
import { section as s41 } from './s41-event-loop';
import { section as s42 } from './s42-memory-management';
import { section as s43 } from './s43-functional-patterns';
import { section as s44 } from './s44-design-patterns';
import { section as s45 } from './s45-testing';
import { section as s46 } from './s46-security';
import { section as s47 } from './s47-node-basics';
import { section as s48 } from './s48-streams';
import { section as s49 } from './s49-advanced-patterns';
import { section as s50 } from './s50-capstone';

const sections: LessonSection[] = [
  s01, s02, s03, s04, s05, s06, s07, s08, s09, s10,
  s11, s12, s13, s14, s15, s16, s17, s18, s19, s20,
  s21, s22, s23, s24, s25, s26, s27, s28, s29, s30,
  s31, s32, s33, s34, s35, s36, s37, s38, s39, s40,
  s41, s42, s43, s44, s45, s46, s47, s48, s49, s50,
];

export const track: Track = {
  id: 'javascript',
  name: 'JavaScript',
  language: 'javascript',
  monacoLang: 'javascript',
  icon: '🟨',
  description: 'The language of the web. Dynamic, versatile, everywhere. 1000 exercises from beginner to advanced.',
  sections,
};
