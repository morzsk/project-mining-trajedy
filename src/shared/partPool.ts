import { first } from "./extensions";

const POOL_SOFT_LIMIT = 1000;
const FREE_PART_CFRAME = new CFrame(1_000_000, 1_000_000, 1_000_000);

class PartPool<T extends BasePart> {
	readonly template: T;
	freeParts: Set<T>;
	busyParts: Set<T>;

	constructor(template: T) {
		this.template = template;
		this.freeParts = new Set<T>();
		this.busyParts = new Set<T>();
	}

	get(): T {
		let part: T;

		if (this.freeParts.size() > 0) {
			part = first(this.freeParts) as T;
			this.freeParts.delete(part);
		} else {
			part = this.template.Clone() as T;
		}

		this.busyParts.add(part);

		return part;
	}

	free(part: T) {
		if (this.busyParts.delete(part)) {
			if (this.size() > POOL_SOFT_LIMIT) {
				part.Destroy();
			} else {
				this.freeParts.add(part);
				part.Anchored = true;
				part.CFrame = FREE_PART_CFRAME;
			}
		}
	}

	size(): number {
		return this.freeParts.size() + this.busyParts.size();
	}
}

export const BasicPartPool = new PartPool<Part>(new Instance("Part") as Part);
export const WedgePartPool = new PartPool<WedgePart>(new Instance("WedgePart") as WedgePart);
