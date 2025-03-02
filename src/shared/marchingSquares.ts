import { getMarchingSquaresPolygons } from "./marchingSquaresCases";
import { MarchingSquaresCell, MarchingSquaresDiscreteCell, MarchingSquaresPolygon } from "./marchingSquaresDefs";

export function getMarchingSquaresPolygon(cell: MarchingSquaresCell): MarchingSquaresPolygon[] {
	const discreteCell = getMarchingSquaresDiscreteCell(cell);
	const polygons = getMarchingSquaresPolygons(discreteCell, getMarchingSquaresCellAverage(cell));
	return polygons;
}

function getMarchingSquaresCellAverage(cell: MarchingSquaresCell): number {
	return (cell.topLeft + cell.topRight + cell.bottomRight + cell.bottomLeft) / 4;
}

function getMarchingSquaresDiscreteCell(cell: MarchingSquaresCell): MarchingSquaresDiscreteCell {
	return {
		topLeft: cell.topLeft > 0 ? 1 : 0,
		topRight: cell.topRight > 0 ? 1 : 0,
		bottomRight: cell.bottomRight > 0 ? 1 : 0,
		bottomLeft: cell.bottomLeft > 0 ? 1 : 0,
	};
}
