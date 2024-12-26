"use strict";

import { Uint8Array } from "../utils/buffs";

// (C) 1995-2013 Jean-loup Gailly and Mark Adler
// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
//
// This software is provided 'as-is', without any express or implied
// warranty. In no event will the authors be held liable for any damages
// arising from the use of this software.
//
// Permission is granted to anyone to use this software for any purpose,
// including commercial applications, and to alter it and redistribute it
// freely, subject to the following restrictions:
//
// 1. The origin of this software must not be misrepresented; you must not
//   claim that you wrote the original software. If you use this software
//   in a product, an acknowledgment in the product documentation would be
//   appreciated but is not required.
// 2. Altered source versions must be plainly marked as such, and must not be
//   misrepresented as being the original software.
// 3. This notice may not be removed or altered from any source distribution.

export class GZheader {
	/* true if compressed data believed to be text */
	public text = 0;
	/* modification time */
	public time = 0;
	/* extra flags (not used when writing a gzip file) */
	public xflags = 0;
	/* operating system */
	public os = 0;
	/* pointer to extra field or Z_NULL if none */
	public extra?: Uint8Array;
	/* extra field length (valid if extra != Z_NULL) */
	public extra_len = 0; // Actually, we don't need it in JS,
	// but leave for few code modifications

	//
	// Setup limits is not necessary because in js we should not preallocate memory
	// for inflate use constant limit in 65536 bytes
	//

	/* space at extra (only when reading header) */
	// public extra_max  = 0;
	/* pointer to zero-terminated file name or Z_NULL */
	public name = "";
	/* space at name (only when reading header) */
	// public name_max   = 0;
	/* pointer to zero-terminated comment or Z_NULL */
	public comment = "";
	/* space at comment (only when reading header) */
	// public comm_max   = 0;
	/* true if there was or will be a header crc */
	public hcrc = 0;
	/* true when done reading gzip header (not used when writing a gzip file) */
	public done = false;
}
