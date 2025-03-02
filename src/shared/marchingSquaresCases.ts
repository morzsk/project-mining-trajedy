import {
	MarchingSquaresDiscreteCell,
	MarchingSquaresPolygon,
	MarchingSquaresVertex,
	MarchingSquaresVertexType,
} from "./marchingSquaresDefs";

export function getMarchingSquaresPolygons(
	cell: MarchingSquaresDiscreteCell,
	cellAverage: number,
): MarchingSquaresPolygon[] {
	const caseNumber = getMarchingSquaresCase(cell);
	if (caseNumber !== 5 && caseNumber !== 10) {
		return [MARCHING_SQUARES.get(caseNumber) as MarchingSquaresPolygon];
	}

	if (cellAverage > 0) {
		return [MARCHING_SQUARES_SADDLE_DOMINANT.get(caseNumber) as MarchingSquaresPolygon];
	}

	return MARCHING_SQUARES_SADDLE_RECESSIVE.get(caseNumber) as MarchingSquaresPolygon[];
}

// Cases are mapped such that numbers form a binary representation of the cell
// top left, top right, bottom right, bottom left
function getMarchingSquaresCase(cell: MarchingSquaresDiscreteCell): number {
	return cell.bottomLeft + cell.bottomRight * 2 + cell.topRight * 4 + cell.topLeft * 8;
}

// Cases: https://en.wikipedia.org/wiki/Marching_squares
// The vertices are ordered in a clockwise direction
const MARCHING_SQUARES: Map<number, MarchingSquaresPolygon> = new Map([
	// CASE 0: 0000
	[0, []],
	// CASE 1: 0001
	[
		1,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.BottomRight),
		],
	],
	// CASE 2: 0010
	[
		2,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.TopRight),
		],
	],
	// CASE 3: 0011
	[
		3,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.TopLeft),
		],
	],
	// CASE 4: 0100
	[
		4,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.TopLeft),
		],
	],
	// CASE 5: 0101 -- *ambiguous diagonal*, drawn top-left to bottom-right
	[5, []],
	// CASE 6: 0110
	[
		6,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.TopLeft),
		],
	],
	// CASE 7: 0111
	[
		7,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.TopLeft),
		],
	],
	// CASE 8: 1000
	[
		8,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 9: 1001
	[
		9,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 10: 1010 -- *ambiguous diagonal*, drawn bottom-left to top-right
	[10, []],
	// CASE 11: 1011
	[
		11,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 12: 1100
	[
		12,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 13: 1101
	[
		13,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 14: 1110
	[
		14,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.BottomLeft),
		],
	],
	// CASE 15: 1111
	[
		15,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
		],
	],
]);

const MARCHING_SQUARES_SADDLE_DOMINANT: Map<number, MarchingSquaresPolygon> = new Map([
	// CASE 5: 0101
	[
		5,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.TopLeft),
		],
	],
	// CASE 10: 1010
	[
		10,
		[
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.TopRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
			new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.BottomLeft),
			new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.BottomLeft),
		],
	],
]);

const MARCHING_SQUARES_SADDLE_RECESSIVE: Map<number, MarchingSquaresPolygon[]> = new Map([
	// CASE 5: 0101
	[
		5,
		[
			[
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft),
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.TopLeft),
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomLeft, MarchingSquaresVertexType.BottomRight),
			],
			[
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight),
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.BottomRight),
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopRight, MarchingSquaresVertexType.TopLeft),
			],
		],
	],
	// CASE 10: 1010
	[
		10,
		[
			[
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft),
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.TopRight),
				new MarchingSquaresVertex(MarchingSquaresVertexType.TopLeft, MarchingSquaresVertexType.BottomLeft),
			],
			[
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight),
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.BottomLeft),
				new MarchingSquaresVertex(MarchingSquaresVertexType.BottomRight, MarchingSquaresVertexType.TopRight),
			],
		],
	],
]);
