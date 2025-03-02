const PART = new Instance("Part");
PART.Anchored = true;

export function subdivide(parentPart: Part): Part[] {
	const childPartOctantSize = parentPart.Size.div(2);
	const childPartSize = parentPart.Size.mul(0.9).div(2);
	if (childPartSize.X <= 1 && childPartSize.Y <= 1 && childPartSize.Z <= 1) {
		return [];
	}

	const childParts: Part[] = [];

	for (const x of childPartSize.X > 1 ? [-1, 1] : [0]) {
		for (const y of childPartSize.Y > 1 ? [-1, 1] : [0]) {
			for (const z of childPartSize.Z > 1 ? [-1, 1] : [0]) {
				const childPartIndex = new Vector3(x, y, z);
				const childPart = PART.Clone();
				childPart.Size = getActualChildPartSize(childPartSize, childPartIndex);
				childPart.CFrame = parentPart.CFrame.mul(
					new CFrame(getChildPartOffset(childPartOctantSize, childPartIndex)),
				);
				childPart.Parent = parentPart.Parent;
				childParts.push(childPart);
			}
		}
	}

	return childParts;
}

function getActualChildPartSize(childPartSize: Vector3, childPartIndex: Vector3): Vector3 {
	return new Vector3(
		childPartIndex.X === 0 ? 1 : childPartSize.X,
		childPartIndex.Y === 0 ? 1 : childPartSize.Y,
		childPartIndex.Z === 0 ? 1 : childPartSize.Z,
	);
}

function getChildPartOffset(childPartOctantSize: Vector3, childPartIndex: Vector3): Vector3 {
	return new Vector3(
		(childPartOctantSize.X / 2) * childPartIndex.X,
		(childPartOctantSize.Y / 2) * childPartIndex.Y,
		(childPartOctantSize.Z / 2) * childPartIndex.Z,
	);
}
