import * as React from "react";
import * as ReactDOM from "react-dom";
import { IH5PEditorWrapper } from "../../H5P";
import App from "../App";
import { H5P } from "./H5P.util";

export class H5PWrapper extends H5P.EventDispatcher implements IH5PEditorWrapper {
  private wrapper: HTMLElement;

  constructor(
    parent: JQuery<HTMLElement>,
    field: unknown,
    params: unknown,
    setValue: (value: unknown) => void
  ) {
    super();
    this.wrapper = H5PWrapper.createWrapperElement();

    ReactDOM.render(<App adjective="luminous" />, this.wrapper);
  }

  appendTo([containerElement]: JQuery<HTMLElement>): void {
    containerElement.appendChild(this.wrapper);
    containerElement.classList.add("h5p-topic-map");
  }

  validate(): boolean {
    return true;
  }

  remove(): void {}

  private static createWrapperElement(): HTMLDivElement {
    return document.createElement("div");
  }
}
