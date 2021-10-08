import { v4 as uuidV4 } from "uuid";
import { Cell } from "../types/Cell";
import { Element } from "../types/Element";
import { OccupiedCell } from "../types/OccupiedCell";
import { Position } from "../types/Position";
import { Size } from "../types/Size";
import { TopicMapItem } from "../types/TopicMapItem";
import { arraysHaveSomeOverlap } from "./array.utils";

export const resizeItem = (
  item: TopicMapItem,
  scaleFactor: number,
): TopicMapItem => {
  const resizedItem = {
    ...item,
    heightPercentage: item.heightPercentage * scaleFactor,
    widthPercentage: item.widthPercentage * scaleFactor,
    xPercentagePosition: item.xPercentagePosition * scaleFactor,
    yPercentagePosition: item.yPercentagePosition * scaleFactor,
  };

  return resizedItem;
};

export const resizeItems = (
  items: Array<TopicMapItem>,
  scaleFactor: number,
): Array<TopicMapItem> => items.map(item => resizeItem(item, scaleFactor));

export const calculateXPercentage = (xPx: number, width: number): number => {
  return (xPx / width) * 100;
};

export const calculateYPercentage = (yPx: number, height: number): number => {
  return (yPx / height) * 100;
};

export const updateItem = (
  items: Array<TopicMapItem>,
  updatedItem: TopicMapItem,
  width: number,
  height: number,
  { newPosition, newSize }: { newPosition?: Position; newSize?: Size },
): Array<TopicMapItem> => {
  const newItems = items.map((item: TopicMapItem) => {
    const isCorrectItem = item.id === updatedItem.id;

    if (!isCorrectItem) {
      return item;
    }

    const newItem: TopicMapItem = {
      ...item,
    };

    if (newPosition) {
      newItem.xPercentagePosition = calculateXPercentage(newPosition.x, width);
      newItem.yPercentagePosition = calculateYPercentage(newPosition.y, height);
    }

    if (newSize) {
      newItem.widthPercentage = calculateXPercentage(newSize.width, width);
      newItem.heightPercentage = calculateYPercentage(newSize.height, height);
    }

    return newItem;
  });

  return newItems;
};

export const getAllCells = (
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<Cell> => {
  const cells: Array<Cell> = [];

  const stepSize = gapSize + gridIndicatorSize;
  let currentIndex = 0;

  for (let y = 0; y < gridHeight; y += stepSize) {
    for (let x = 0; x < gridWidth; x += stepSize) {
      cells.push({
        x,
        y,
        index: currentIndex,
      });

      currentIndex += 1;
    }
  }

  return cells;
};

export const cellIsOccupiedByElement = (
  elementPosition: Position,
  elementSize: Size,
  cellPosition: Position,
): boolean =>
  cellPosition.x >= elementPosition.x &&
  cellPosition.x <= elementPosition.x + elementSize.width &&
  cellPosition.y >= elementPosition.y &&
  cellPosition.y <= elementPosition.y + elementSize.height;

export const findCellsElementOccupies = (
  { id, type, position, size }: Element,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<OccupiedCell> => {
  const allCells = getAllCells(
    gridWidth,
    gridHeight,
    gapSize,
    gridIndicatorSize,
  );

  const occupiedCells = allCells
    .filter(cell => cellIsOccupiedByElement(position, size, cell))
    .map(({ x, y, index }) => ({
      occupiedById: id,
      occupiedByType: type,
      x,
      y,
      index,
    }));

  return occupiedCells;
};

export const findOccupiedCells = (
  elements: Array<Element>,
  gridWidth: number,
  gridHeight: number,
  gapSize: number,
  gridIndicatorSize: number,
): Array<OccupiedCell> => {
  const occupiedCells: Array<OccupiedCell> = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const element of elements) {
    occupiedCells.push(
      ...findCellsElementOccupies(
        element,
        gridWidth,
        gridHeight,
        gapSize,
        gridIndicatorSize,
      ),
    );
  }

  return occupiedCells;
};

export const scaleX = (xPercentage: number, gridWidth: number): number =>
  (gridWidth * xPercentage) / 100;

export const scaleY = (yPercentage: number, height: number): number =>
  (height * yPercentage) / 100;

export const mapTopicMapItemToElement = (
  item: TopicMapItem,
  gridSize: Size,
): Element => ({
  id: item.id,
  type: "item",
  position: {
    x: scaleX(item.xPercentagePosition, gridSize.width),
    y: scaleY(item.yPercentagePosition, gridSize.height),
  },
  size: {
    width: scaleX(item.widthPercentage, gridSize.width),
    height: scaleY(item.heightPercentage, gridSize.height),
  },
});

export const positionIsFree = (
  newPosition: Position,
  elementId: string,
  elementSize: Size,
  gridSize: Size,
  gapSize: number,
  gridIndicatorSize: number,
  occupiedCells: Array<OccupiedCell>,
): boolean => {
  const cellsThisElementWillOccupy = findCellsElementOccupies(
    {
      id: elementId,
      type: "item",
      position: newPosition,
      size: elementSize,
    },
    gridSize.width,
    gridSize.height,
    gapSize,
    gridIndicatorSize,
  );

  const cellsOccupiedByOtherElements = occupiedCells.filter(
    cell => cell.occupiedById !== elementId,
  );

  const posIsFree = !arraysHaveSomeOverlap(
    cellsOccupiedByOtherElements,
    cellsThisElementWillOccupy,
  );

  return posIsFree;
};

export const coordinatePosToPx = (
  coordinate: number,
  gapSize: number,
  gridIndicatorSize: number,
): number => {
  const stepSize = gapSize + gridIndicatorSize;

  return coordinate * stepSize;
};

export const coordinateSizeToPx = (
  coordinate: number,
  gapSize: number,
  gridIndicatorSize: number,
): number => {
  return coordinate * gridIndicatorSize + (coordinate - 1) * gapSize;
};

export const isDraggingLeft = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
): boolean =>
  boxStartPosition % numberOfColumns >= indicatorIndex % numberOfColumns;

export const isDraggingRight = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
): boolean => 
  boxStartPosition % numberOfColumns <= indicatorIndex % numberOfColumns;

export const isDraggingUp = (
  indicatorIndex: number,
  boxStartPosition: number,
  numberOfColumns: number,
  numberOfRows: number,
): boolean =>
  (Math.floor(boxStartPosition / numberOfColumns) / numberOfRows) * 100 >=
  (Math.floor(indicatorIndex / numberOfColumns) / numberOfRows) * 100;

  export const findWidthPercentage = (
    onlyScaleHorizontally: boolean,
    onlyScaleVertically: boolean,
    leftHandle: boolean,
    dragLeft: boolean,
    dragRight: boolean,
    existingItem: TopicMapItem,
    xPercentagePosition: number,
    xEndPercentagePosition: number,
  ): number => {
    if (onlyScaleVertically) {
      return existingItem.widthPercentage;
    }
    if (onlyScaleHorizontally && leftHandle && dragRight) {
      return existingItem.widthPercentage - (xPercentagePosition - existingItem.xPercentagePosition);
    }
    if (onlyScaleHorizontally && leftHandle && dragLeft) {
      return existingItem.widthPercentage + (existingItem.xPercentagePosition - xPercentagePosition);
    }
    return xEndPercentagePosition - xPercentagePosition;
};

export const createTopicMapItem = (): TopicMapItem => {
  const id = uuidV4();

  const item: TopicMapItem = {
    id,
    xPercentagePosition: 0,
    yPercentagePosition: 0,
    widthPercentage: 0,
    heightPercentage: 0,
    backgroundImage: { path: "", alt: "" },
    label: "",
    links: [],
  };

  return item;
};

export const findItem = (
  id: string,
  items: Array<TopicMapItem>,
): TopicMapItem | null => {
  if (!id) {
    return null;
  }

  return items.find(item => item.id === id) ?? null;
};
