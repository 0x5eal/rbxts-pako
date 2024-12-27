"use strict";

import type * as TypedArrays from "../utils/typedArrays";

const { Z_UNKNOWN } = require("./constants") as typeof import("./constants");

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

export class ZStream<State> {
	/* next input byte */
	public input!: TypedArrays.Uint8Array; // JS specific, because we have no pointers
	public next_in = 0;
	/* number of bytes available at input */
	public avail_in = 0;
	/* total number of input bytes read so far */
	public total_in = 0;
	/* next output byte should be put there */
	public output!: TypedArrays.Uint8Array; // JS specific, because we have no pointers
	public next_out = 0;
	/* remaining free space at output */
	public avail_out = 0;
	/* total number of bytes output so far */
	public total_out = 0;
	/* last error message, NULL if no error */
	public msg?: string /*Z_NULL*/;
	/* not visible by applications */
	public state!: State;
	/* best guess about the data type: binary or text */
	public data_type = Z_UNKNOWN;
	/* adler32 value of the uncompressed data */
	public adler = 0;
}
