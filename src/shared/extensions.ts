export function first<T>(set: Set<T>): T | undefined {
	for (const value of set) {
		return value;
	}

	return undefined;
}
