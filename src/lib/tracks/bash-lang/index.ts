import type { Track, LessonSection } from '../../../stores/app.svelte.ts';

import { section as s01 } from './s01-hello-world';
import { section as s02 } from './s02-variables';
import { section as s03 } from './s03-quoting';
import { section as s04 } from './s04-expansion';
import { section as s05 } from './s05-conditionals';
import { section as s06 } from './s06-loops';
import { section as s07 } from './s07-functions';
import { section as s08 } from './s08-arrays';
import { section as s09 } from './s09-strings';
import { section as s10 } from './s10-arithmetic';
import { section as s11 } from './s11-io-redirection';
import { section as s12 } from './s12-pipes';
import { section as s13 } from './s13-process-substitution';
import { section as s14 } from './s14-subshells';
import { section as s15 } from './s15-exit-codes';
import { section as s16 } from './s16-traps';
import { section as s17 } from './s17-getopts';
import { section as s18 } from './s18-regex';
import { section as s19 } from './s19-sed';
import { section as s20 } from './s20-awk';
import { section as s21 } from './s21-find-xargs';
import { section as s22 } from './s22-file-operations';
import { section as s23 } from './s23-permissions';
import { section as s24 } from './s24-process-management';
import { section as s25 } from './s25-job-control';
import { section as s26 } from './s26-signals';
import { section as s27 } from './s27-here-documents';
import { section as s28 } from './s28-parameter-expansion';
import { section as s29 } from './s29-brace-expansion';
import { section as s30 } from './s30-globbing';
import { section as s31 } from './s31-debugging';
import { section as s32 } from './s32-error-handling';
import { section as s33 } from './s33-logging';
import { section as s34 } from './s34-temp-files';
import { section as s35 } from './s35-locking';
import { section as s36 } from './s36-configuration';
import { section as s37 } from './s37-argument-parsing';
import { section as s38 } from './s38-interactive';
import { section as s39 } from './s39-coproc';
import { section as s40 } from './s40-networking';
import { section as s41 } from './s41-system-admin';
import { section as s42 } from './s42-monitoring';
import { section as s43 } from './s43-automation';
import { section as s44 } from './s44-packaging';
import { section as s45 } from './s45-testing-bats';
import { section as s46 } from './s46-portability';
import { section as s47 } from './s47-performance';
import { section as s48 } from './s48-security';
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
	id: 'bash',
	name: 'Bash',
	language: 'bash',
	monacoLang: 'shell',
	icon: '🐚',
	description: 'Shell scripting for automation, system administration, and command-line mastery.',
	sections
};
