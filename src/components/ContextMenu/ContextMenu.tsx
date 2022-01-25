import * as React from "react";
import styles from "./ContextMenu.module.scss";
import { ContextMenuButton } from "../ContextMenuButton/ContextMenuButton";
import { ContextMenuAction } from "../../types/ContextMenuAction";

/*
  Name of svg icon should be similar to this,
  specify the svg icon in icons.tsx
*/
export enum ContextMenuButtonType {
  Edit = "edit",
  Delete = "delete",
  ArrowDirectional = "directional",
  ArrowBiDirectional = "biDirectional",
  ArrowNonDirectional = "nonDirectional",
}

export type ContextMenuProps = {
  show: boolean;
  turnLeft: boolean;
  actions: Array<ContextMenuAction>;
};

export const ContextMenu: React.FC<ContextMenuProps> = ({
  show,
  turnLeft,
  actions,
}) => {
  const className = turnLeft ? styles.left : styles.right;

  return (
    <div
      className={`${styles.contextMenu} ${className} ${show && styles.show}`}
    >
      {actions.map(({ icon, labelKey, onClick }) => (
        <ContextMenuButton
          key={labelKey}
          icon={icon}
          labelKey={labelKey}
          onClick={onClick}
        />
      ))}
    </div>
  );
};
