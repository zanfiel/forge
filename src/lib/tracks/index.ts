/**
 * tracks/index.ts -- Auto-imports all 16 language track modules
 *
 * Each track is a directory with an index.ts that aggregates 50 sections of 20 exercises each.
 */

import type { Track } from '../../stores/app.svelte.ts';

import { track as typescript } from './typescript/index';
import { track as javascript } from './javascript/index';
import { track as python } from './python/index';
import { track as rust } from './rust/index';
import { track as go } from './go/index';
import { track as java } from './java/index';
import { track as c } from './c/index';
import { track as csharp } from './csharp/index';
import { track as cpp } from './cpp/index';
import { track as php } from './php/index';
import { track as ruby } from './ruby/index';
import { track as kotlin } from './kotlin/index';
import { track as swift } from './swift/index';
import { track as lua } from './lua/index';
import { track as zig } from './zig/index';
import { track as bash } from './bash-lang/index';

const allTracks: Track[] = [
  typescript, javascript, python, rust, go, java, c, csharp,
  cpp, php, ruby, kotlin, swift, lua, zig, bash,
];

export const tracks = allTracks;

export function getTrack(id: string): Track | undefined {
  return tracks.find(t => t.id === id);
}
