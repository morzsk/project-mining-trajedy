export enum MarchingSquaresVertexType {
	TopLeft = "topLeft",
	TopRight = "topRight",
	BottomRight = "bottomRight",
	BottomLeft = "bottomLeft",
}

// Grid origin is at the bottom left
const cornerVectors: Record<MarchingSquaresVertexType, Vector2> = {
	[MarchingSquaresVertexType.TopLeft]: new Vector2(0, 1),
	[MarchingSquaresVertexType.TopRight]: new Vector2(1, 1),
	[MarchingSquaresVertexType.BottomRight]: new Vector2(1, 0),
	[MarchingSquaresVertexType.BottomLeft]: new Vector2(0, 0),
};

export class MarchingSquaresVertex {
	origin: Vector2;
	direction: Vector2;
	scale: number;
	source: MarchingSquaresVertexType;
	destination: MarchingSquaresVertexType;

	constructor(source: MarchingSquaresVertexType, destination?: MarchingSquaresVertexType) {
		this.origin = cornerVectors[source];
		this.direction = destination ? cornerVectors[destination].sub(this.origin) : new Vector2(0, 0);
		this.scale = destination ? 0.5 : 0;
		this.source = source;
		this.destination = destination ?? source;
	}

	getPosition(): Vector2 {
		return this.origin.add(this.direction.mul(this.scale));
	}
}

// Clockwise order
export type MarchingSquaresPolygon = MarchingSquaresVertex[];

// Values are between -1 and 1 inclusive and threshold is 0
export type MarchingSquaresCell = Record<MarchingSquaresVertexType, number>;

// Same as MarchingSquaresCell but values are either 0 or 1
export type MarchingSquaresDiscreteCell = Record<MarchingSquaresVertexType, 0 | 1>;
