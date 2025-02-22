const WEDGE = new Instance("WedgePart");
WEDGE.Anchored = true;
WEDGE.TopSurface = Enum.SurfaceType.Smooth;
WEDGE.BottomSurface = Enum.SurfaceType.Smooth;

// https://github.com/EgoMoose/Articles/blob/master/3d%20triangles/3D%20triangles.md
export function drawTriangle(
	a: Vector3,
	b: Vector3,
	c: Vector3,
	parent: Instance,
	wedge1: WedgePart | undefined = undefined,
	wedge2: WedgePart | undefined = undefined,
) {
	const edges = [
		{ longest: b.sub(a), other: c.sub(a), origin: a },
		{ longest: c.sub(b), other: a.sub(b), origin: b },
		{ longest: a.sub(c), other: b.sub(c), origin: c },
	];

	const edge = edges.reduce((a, b) => (a.longest.Magnitude > b.longest.Magnitude ? a : b));

	const theta = math.acos(edge.longest.Unit.Dot(edge.other.Unit));
	const height = edge.other.Magnitude * math.sin(theta);
	const width1 = edge.other.Magnitude * math.cos(theta);
	const width2 = edge.longest.Magnitude - width1;

	const position1 = edge.origin.add(edge.other.mul(0.5));
	const position2 = edge.origin.add(edge.longest).add(edge.other.sub(edge.longest).mul(0.5));
	const right = edge.longest.Cross(edge.other).Unit;
	const up = right.Cross(edge.longest).Unit;
	const back = edge.longest.Unit;

	const cframe1 = new CFrame(
		position1.X,
		position1.Y,
		position1.Z,
		-right.X,
		up.X,
		back.X,
		-right.Y,
		up.Y,
		back.Y,
		-right.Z,
		up.Z,
		back.Z,
	);
	const cframe2 = new CFrame(
		position2.X,
		position2.Y,
		position2.Z,
		right.X,
		up.X,
		-back.X,
		right.Y,
		up.Y,
		-back.Y,
		right.Z,
		up.Z,
		-back.Z,
	);

	wedge1 = wedge1 || WEDGE.Clone();
	wedge1.Size = new Vector3(0.1, height, width1);
	wedge1.CFrame = cframe1;
	wedge1.Parent = parent;

	wedge2 = wedge2 || WEDGE.Clone();
	wedge2.Size = new Vector3(0.1, height, width2);
	wedge2.CFrame = cframe2;
	wedge2.Parent = parent;
}
