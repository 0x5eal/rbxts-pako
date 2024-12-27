# pako-roblox-ts

Fork of [pako](https://github.com/nodeca/pako) for Roblox-TS.

## Installation

Supported as a pesde (Luau) package and npm (roblox-ts) package:

```sh
# pesde
pesde add 0x5eal/pako

# roblox-ts
npm add @rbxts/pako
```

## Usage

### Luau

```luau
local serde = require("@lune/serde")
local pako = require("./luau_packages/pako")

local test = { my = "super", puper = { 456, 567 }, awesome = "pako" }
local compressed = pako.deflate(serde.encode("json", test))
local restored = serde.decode(pako.inflate(compressed, { to = "string" }))
```

### roblox-ts

```ts
import pako from "@rbxts/pako";

const test = { my: "super", puper: [456, 567], awesome: "pako" };
const compressed = pako.deflate(JSON.stringify(test));
const restored = JSON.parse(pako.inflate(compressed, { to: "string" }));
```
