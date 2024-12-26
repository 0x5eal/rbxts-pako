type StaticMembers<D> = {
	length: number;
	buf: buffer;
	set(this: TypedArray<D>, array: TypedArray<D>, offset?: number): void;
	subarray(this: TypedArray<D>, start: number, end?: number): TypedArray<D>;
	zeroize(this: TypedArray<D>): void;
	_startOffset?: number;
};

export type TypedArray<D> = {
	[index: number]: number;
} & StaticMembers<D> & {
		__nominal_TypedArray: D;
	};

interface TypedArrayConstructor<D> {
	new (len: number): TypedArray<D>;
	new (nums: number[]): TypedArray<D>;
	from(buf: buffer): TypedArray<D>;
	BYTES_PER_ELEMENT: number;
}

const makeTypedArray = <D extends number>({
	bytesPerElement,
	read,
	write,
}: {
	bytesPerElement: 1 | 2 | 4;
	read: (buf: buffer, offset: number) => number;
	write: (buf: buffer, offset: number, value: number) => void;
}) => {
	const metatable: LuaMetatable<StaticMembers<D>> = {
		__index: (me, index) => {
			assert(typeIs(index, "number"), "index must be a number");
			read(me.buf, index * bytesPerElement);
		},

		__newindex: (me, index, value) => {
			assert(typeIs(index, "number"), "index must be a number");
			assert(typeIs(value, "number"), "value must be a number");
			write(me.buf, index * bytesPerElement, value);
		},

		__tostring: (me) => {
			return buffer.tostring(me.buf);
		},
	};

	function _make(buf: buffer): TypedArray<D> {
		return setmetatable(
			{
				buf,
				length: buffer.len(buf) / bytesPerElement,

				set(this: TypedArray<D>, array: TypedArray<D>, offset = 0) {
					buffer.copy(this.buf, offset * bytesPerElement, array.buf);
				},

				subarray(this: TypedArray<D>, start: number, finish: number = this.length) {
					const len = finish - start;
					const newBuf = buffer.create(len * bytesPerElement);
					buffer.copy(newBuf, 0, this.buf, start * bytesPerElement, len);
					return _make(newBuf);
				},

				zeroize(this: TypedArray<D>) {
					buffer.fill(this.buf, 0, 0);
				},
			} satisfies StaticMembers<D>,
			metatable,
		) as unknown as TypedArray<D>;
	}

	return class TypedArray {
		constructor(nums: number | number[]) {
			if (typeIs(nums, "number")) {
				return _make(buffer.create(nums * bytesPerElement));
			}

			const buf = buffer.create(nums.size() * bytesPerElement);
			let offset = 0;
			for (const n of nums) {
				write(buf, offset, n);
				offset += bytesPerElement;
			}
			return _make(buf);
		}

		static from(buf: buffer) {
			return _make(buf);
		}

		static BYTES_PER_ELEMENT = bytesPerElement;
	} as unknown as TypedArrayConstructor<D>;
};

export const Uint8Array = makeTypedArray<-1>({
	bytesPerElement: 1,
	read: buffer.readu8,
	write: buffer.writeu8,
});
export type Uint8Array = InstanceType<typeof Uint8Array>;
export const Uint16Array = makeTypedArray<-2>({
	bytesPerElement: 2,
	read: buffer.readu16,
	write: buffer.writeu16,
});
export type Uint16Array = InstanceType<typeof Uint16Array>;
export const Uint32Array = makeTypedArray<-4>({
	bytesPerElement: 4,
	read: buffer.readu32,
	write: buffer.writeu32,
});
export type Uint32Array = InstanceType<typeof Uint32Array>;

export const Int8Array = makeTypedArray<1>({
	bytesPerElement: 1,
	read: buffer.readi8,
	write: buffer.writei8,
});
export type Int8Array = InstanceType<typeof Int8Array>;
export const Int16Array = makeTypedArray<2>({
	bytesPerElement: 2,
	read: buffer.readi16,
	write: buffer.writei16,
});
export type Int16Array = InstanceType<typeof Int16Array>;
export const Int32Array = makeTypedArray<4>({
	bytesPerElement: 4,
	read: buffer.readi32,
	write: buffer.writei32,
});
export type Int32Array = InstanceType<typeof Int32Array>;

export type NumericArrayLike = {
	[index: number]: number;
};
