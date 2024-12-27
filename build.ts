import { write } from "bun";
import { copyFile } from "fs/promises";
import { unlink } from "fs/promises";
import path from "path";

// changes the extension of a path to `newExt`
function withExtension(filePath: string, newExt: string): string {
	const dir = path.dirname(filePath);
	const base = path.basename(filePath, path.extname(filePath));

	const newFilePath = path.join(dir, `${base}.${newExt}`);
	return newFilePath;
}

// extracts the Luau exports section from a given file path
async function extractLuauExports(file: string): Promise<string | null> {
	const input = await Bun.file(file).text();
	const regex = /\/\/ @@@@@@@@@ LUAU_START @@@@@@@@@([\s\S]*?)\/\/ @@@@@@@@@ LUAU_END @@@@@@@@@/;
	const match = input.match(regex);
	if (match) {
		// remove leading comment specifier from each line from each line
		return match[1]
			.split("\n")
			.map((line) => line.replace(/\/\/\s?/, ""))
			.join("\n")
			.trim();
	}

	return null;
}

const OUT_DIR = "./out";
const EXPORTS_TS_FILE = "./src/exports.ts";
const EXPORTS_LUAU_FILE = path.join(OUT_DIR, "init.luau");

await extractLuauExports(EXPORTS_TS_FILE)
	.then(async (exports) => {
		console.log("extract and export luau type thunk");
		await write(EXPORTS_LUAU_FILE, exports!);
	})
	.finally(async () => {
		console.log("export ts definition files");

		const luauExportsFile = path.join(OUT_DIR, path.basename(withExtension(EXPORTS_TS_FILE, "d.ts")));
		await write(path.join(OUT_DIR, "index.d.ts"), Bun.file(luauExportsFile));
	});

export {}; // treat as esmodule
