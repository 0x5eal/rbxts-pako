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

const EXPORTS_TS_FILE = "./src/exports.ts";
const EXPORTS_LUAU_FILE = "./out/init.luau";

console.log("extract and export Luau type thunk");
await extractLuauExports(EXPORTS_TS_FILE).then((exports) => Bun.write(EXPORTS_LUAU_FILE, exports!));

export {}; // treat as esmodule
