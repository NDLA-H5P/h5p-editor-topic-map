import * as React from "react";
import { ColorTheme } from "../../types/ColorTheme";
import { H5PFieldImage } from "../../types/h5p/H5PField";
import { H5PForm } from "../../types/h5p/H5PForm";
import { Params } from "../../types/h5p/Params";
import { defaultTheme } from "../../utils/theme.utils";
import { Dialog } from "../Dialog/Dialog";
import { SemanticsForm } from "../SemanticsForm/SemanticsForm";
import { ThemePicker } from "../ThemePicker/ThemePicker";
import styles from "./AppearanceDialog.module.scss";

export type AppearanceDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  backgroundImageField: H5PFieldImage;
  params: Params;
  parent: H5PForm;
  onSave: (params: Params) => void;
};

export const AppearanceDialog: React.FC<AppearanceDialogProps> = ({
  backgroundImageField,
  isOpen,
  onSave,
  params,
  parent,
  setIsOpen,
}) => {
  const setTheme = (colorTheme: ColorTheme): void => {
    onSave({
      ...params,
      appearance: {
        ...params.appearance,
        colorTheme,
      },
    });
  };

  return (
    <Dialog
      titleKey="appearance-dialog_title"
      isOpen={isOpen}
      onOpenChange={setIsOpen}
    >
      <div className={styles.dialogContent}>
        <div className={styles.themePicker}>
          <ThemePicker
            setTheme={setTheme}
            activeTheme={params.appearance?.colorTheme ?? defaultTheme}
          />
        </div>

        <div className={styles.backgroundImageForm}>
          <SemanticsForm
            fields={[backgroundImageField]}
            params={params}
            parent={parent}
            onSave={newParams => {
              onSave(newParams);
              setIsOpen(false);
            }}
          />
        </div>
      </div>
    </Dialog>
  );
};
