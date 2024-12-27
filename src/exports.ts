//
// Luau exports
//

// @@@@@@@@@ LUAU_START @@@@@@@@@
// export type InflateOptions = {
//   chunkSize: number?,
//   windowBits: number?,
//   to: string?,
//   raw: boolean?,
//   dictionary: (string | buffer)?
// }
//
// export type InflateRawOptions = {
//   chunkSize: number?,
//   windowBits: number?,
//   to: string?,
//   dictionary: (string | buffer)?
// }
//
// export type DeflateOptions = {
//   level: number?,
//   method: number?,
//   chunkSize: number?,
//   windowBits: number?,
//   memLevel: number?,
//   strategy: number?,
//   raw: boolean?,
//   gzip: boolean?,
//   header: ({
// 	    done: boolean?,
// 	    time: number?,
// 	    xflags: number?,
// 	    os: number?,
// 	    extra_len: number?,
// 	    comment: string?,
// 	    extra: buffer?,
// 	    name: string?,
// 	    hcrc: number?,
// 	    text: number?,
//   })?,
//   dictionary: (buffer | string)?,
// }
//
// export type DeflateRawOptions = {
//   level: number?,
//   method: number?,
//   chunkSize: number?,
//   windowBits: number?,
//   memLevel: number?,
//   strategy: number?,
//   gzip: boolean?,
//   header: ({
// 	    done: boolean?,
// 	    time: number?,
// 	    xflags: number?,
// 	    os: number?,
// 	    extra_len: number?,
// 	    comment: string?,
// 	    extra: buffer?,
// 	    name: string?,
// 	    hcrc: number?,
// 	    text: number?,
//   })?,
//   dictionary: (buffer | string)?,
// }
//
// return require("./exports") :: {
//    -- Inflate exports --
//    Inflate: any, -- TODO: type Inflate class
//    inflate: (input: string | buffer, options: InflateOptions?) -> (string | buffer)?,
//    inflateRaw: (input: string | buffer, options: InflateRawOptions?) -> (string | buffer)?,
//
//    -- Deflate exports --
//    Deflate: any, -- TODO: type Deflate class
//    deflate: (input: string | buffer, options: DeflateOptions?) -> buffer?,
//    deflateRaw: (input: string | buffer, options: DeflateRawOptions?) -> buffer?,
// }
// @@@@@@@@@ LUAU_END @@@@@@@@@

const { Uint8Array } = require("./utils/typedArrays") as typeof import("./utils/typedArrays");

//
// Type exports
//

import type { Options as InflateOptionsInner } from "./inflate";
import type { Options as DeflateOptionsInner } from "./deflate";
export type InflateOptions = Omit<InflateOptionsInner, "dictionary"> & {
	dictionary?: string | buffer;
};
export type DeflateOptions = Omit<DeflateOptionsInner, "dictionary"> & {
	dictionary?: string | buffer;
};

//
// Inflate exports
//

const {
	Inflate,
	inflate: inflateImpl,
	inflateRaw: inflateRawImpl,
} = require("./inflate") as typeof import("./inflate");

export function inflate(input: string | buffer, options?: Partial<InflateOptions>): string | buffer | undefined {
	const inputArray = Uint8Array.from(typeIs(input, "string") ? buffer.fromstring(input) : input);
	const modifiedOptions = options as Partial<InflateOptionsInner>;
	if (typeIs(options?.dictionary, "buffer")) {
		modifiedOptions.dictionary = Uint8Array.from(options.dictionary);
	}

	return inflateImpl(inputArray, modifiedOptions);
}

export function inflateRaw(
	input: string | buffer,
	options?: Exclude<Partial<InflateOptions>, "raw">,
): string | buffer | undefined {
	const inputArray = Uint8Array.from(typeIs(input, "string") ? buffer.fromstring(input) : input);
	const modifiedOptions = options as Exclude<Partial<InflateOptionsInner>, "raw">;
	if (typeIs(options?.dictionary, "buffer")) {
		modifiedOptions.dictionary = Uint8Array.from(options.dictionary);
	}

	return inflateRawImpl(inputArray, modifiedOptions);
}

export { Inflate };

//
// Deflate exports
//

const {
	Deflate,
	deflate: deflateImpl,
	deflateRaw: deflateRawImpl,
} = require("./deflate") as typeof import("./deflate");

export function deflate(input: string | buffer, options?: Partial<DeflateOptions>): buffer | undefined {
	const inputArray = Uint8Array.from(typeIs(input, "string") ? buffer.fromstring(input) : input);
	const modifiedOptions = options as Partial<DeflateOptionsInner>;
	if (typeIs(modifiedOptions?.dictionary, "buffer")) {
		modifiedOptions.dictionary = Uint8Array.from(modifiedOptions.dictionary);
	}
	if (typeIs(modifiedOptions?.header?.extra, "buffer")) {
		modifiedOptions.header.extra = Uint8Array.from(modifiedOptions.header.extra);
	}

	return deflateImpl(inputArray, modifiedOptions);
}

export function deflateRaw(
	input: string | buffer,
	options?: Exclude<Partial<DeflateOptions>, "raw">,
): buffer | undefined {
	const inputArray = Uint8Array.from(typeIs(input, "string") ? buffer.fromstring(input) : input);
	const modifiedOptions = options as Exclude<Partial<DeflateOptionsInner>, "raw">;
	if (typeIs(modifiedOptions?.dictionary, "buffer")) {
		modifiedOptions.dictionary = Uint8Array.from(modifiedOptions.dictionary);
	}
	if (typeIs(modifiedOptions?.header?.extra, "buffer")) {
		modifiedOptions.header.extra = Uint8Array.from(modifiedOptions.header.extra);
	}

	return deflateRawImpl(inputArray, modifiedOptions);
}

export { Deflate };

//
// Constants exports
//

export const constants = require("./zlib/constants") as typeof import("./zlib/constants");
