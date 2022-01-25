import * as React from "react";
import { ArrowItemType } from "../../types/ArrowItemType";
import { H5PFieldGroup } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { TopicMapItemType } from "../../types/TopicMapItemType";
import { getBackgroundImageField } from "../../utils/H5P/form.utils";
import { Dialog } from "../Dialog/Dialog";
import { Grid } from "../Grid/Grid";
import { Toolbar, ToolbarButtonType } from "../Toolbar/Toolbar";
import { TopicMapItemForm } from "../TopicMapItemForm/TopicMapItemForm";
import styles from "./MapEditorView.module.scss";

export type MapEditorViewProps = {
  gapSize?: number;
  numberOfColumns?: number;
  numberOfRows?: number;
  params: Params;
  parent: H5PForm;
  semantics: H5PFieldGroup;
  setParams: (updatedParams: Partial<Params>) => void;
};

export const MapEditorView: React.FC<MapEditorViewProps> = ({
  gapSize,
  numberOfColumns,
  numberOfRows,
  params,
  parent,
  semantics,
  setParams,
}) => {
  const columns = numberOfColumns ?? 20;
  const rows = numberOfRows ?? 12;
  const defaultGapSize = 8;

  // prettier-ignore
  const [activeTool, setActiveTool] = React.useState<ToolbarButtonType | null>(null);
  const [gridItems, setGridItems] = React.useState(params.topicMapItems ?? []);
  const [arrowItems, setArrowItems] = React.useState(params.arrowItems ?? []);
  const [editedItem, setEditedItem] = React.useState<string | null>();

  const setActive = (newValue: ToolbarButtonType | null): void => {
    setActiveTool(newValue);
  };

  const updateItems = React.useCallback(
    (items: Array<TopicMapItemType>) => {
      setParams({ topicMapItems: items });
      setGridItems(items);
    },
    [setParams],
  );

  const updateArrows = React.useCallback(
    (items: Array<ArrowItemType>) => {
      setParams({ arrowItems: items });
      setArrowItems(items);
    },
    [setParams],
  );

  const backgroundImageField = React.useMemo(() => {
    const bgImgField = getBackgroundImageField(semantics);

    if (!bgImgField) {
      throw new Error(
        "Background image field not found. Was it removed from semantics, or did its name change?",
      );
    }

    return bgImgField;
  }, [semantics]);

  return (
    <div className={styles.mapEditorView}>
      <Toolbar
        setActiveTool={setActive}
        activeTool={activeTool}
        isArrowButtonDisabled={gridItems.length < 2}
        setParams={setParams}
        params={params}
        parent={parent}
        backgroundImageField={backgroundImageField}
      />
      <div className={styles.gridBorder}>
        <Grid
          numberOfColumns={columns}
          numberOfRows={rows}
          initialItems={gridItems}
          updateItems={updateItems}
          initialArrowItems={arrowItems}
          updateArrowItems={updateArrows}
          gapSize={gapSize ?? defaultGapSize}
          setActiveTool={setActive}
          activeTool={activeTool}
          setEditedItem={setEditedItem}
        />
        <Dialog
          isOpen={Boolean(semantics && editedItem)}
          titleKey="map-editor-view_item-dialog-title"
          onOpenChange={isOpen => {
            if (!isOpen) {
              setEditedItem(null);
            }
          }}
        >
          {editedItem && (
            <TopicMapItemForm
              itemId={editedItem}
              semantics={semantics}
              params={params}
              parent={parent}
              onSave={newParams => {
                updateItems(newParams.topicMapItems ?? []);
                setEditedItem(null);
              }}
            />
          )}
        </Dialog>
      </div>
    </div>
  );
};
