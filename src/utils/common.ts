export function assign<T extends Record<keyof any, any>>(obj: T, ...sources: Partial<T>[]): T {
	for (const source of sources) {
		if (!typeIs(source, "table")) {
			error(source + "must be non-object");
		}

		for (const [k, v] of pairs(source)) {
			obj[k as keyof typeof obj] = v as T[keyof T];
		}
	}

	return obj;
}

export function flattenChunks(chunks: buffer[]): buffer {
	// calculate data length
	const len = chunks.reduce((acc, chunk) => acc + buffer.len(chunk), 0);

	// join chunks
	const result = buffer.create(len);
	let offset = 0;

	for (const chunk of chunks) {
		buffer.copy(result, offset, chunk);
		offset += buffer.len(chunk);
	}

	return result;
}
