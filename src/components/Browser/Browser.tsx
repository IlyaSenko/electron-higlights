import { FormEvent, useCallback, useEffect, useRef } from "react";
import { BrowserView } from "electron";
import styles from "./Browser.module.scss";
import uniqid from "uniqid";
import { IHighlight } from "../../hooks/useHighlights";

const remote = require("@electron/remote");
const { Menu, MenuItem } = remote;

const handleSetBrowserViewBounds = (browserView: BrowserView) => {
  const mainWindow = remote.getCurrentWindow();
  const mainWindowBounds = mainWindow.getBounds();

  browserView.setBounds({
    x: mainWindowBounds.width - 390,
    y: 102,
    width: 350,
    height: 450,
  });
};

function createBrowserView(url: string) {
  const mainWindow = remote.getCurrentWindow();
  const browserView = new remote.BrowserView();

  mainWindow.setBrowserView(browserView);

  handleSetBrowserViewBounds(browserView);
  browserView.webContents.loadURL(url);

  const menu = new Menu();

  menu.append(
    new MenuItem({
      label: "Get selected text",
      click: async () => {
        const selectedText = await browserView.webContents.executeJavaScript(
          "window.getSelection().toString()"
        );
        console.log(selectedText);
      },
    })
  );

  window.addEventListener("contextmenu", (event) => {
    event.preventDefault();
    menu.popup({ window: remote.getCurrentWindow() });
  });

  return browserView;
}

export default function BrowserForm({
  addHighlight,
}: {
  addHighlight: (newHighlight: IHighlight) => void;
}): JSX.Element {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const browserViewRef = useRef<BrowserView | null>(null);
  const saveButtonRef = useRef<HTMLButtonElement | null>(null);

  const handleSubmit = useCallback((e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { current: inputInstance } = inputRef;
    const { current: saveButtonInstance } = saveButtonRef;

    if (!inputInstance || !saveButtonInstance) return;

    saveButtonInstance.classList.add(styles.shown);

    if (!browserViewRef.current) {
      const browserView = createBrowserView(inputInstance.value);

      browserViewRef.current = browserView;

      return;
    }

    browserViewRef.current.webContents.loadURL(inputInstance.value);
  }, []);

  useEffect(() => {
    window.addEventListener("resize", () => {
      const { current } = browserViewRef;

      if (!current) return;

      handleSetBrowserViewBounds(current);
    });
  }, [browserViewRef]);

  const handleSaveHighlight = useCallback(async () => {
    const { current } = browserViewRef;

    if (!current) return;

    const highlight = await current.webContents.executeJavaScript(
      "window.getSelection().toString()"
    );

    addHighlight({
      id: uniqid(),
      url: current.webContents.getURL(),
      title: current.webContents.getTitle(),
      highlight,
    });
  }, [addHighlight]);

  return (
    <>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" ref={inputRef} />
        <button type="submit">Go</button>
      </form>
      <button
        type="button"
        ref={saveButtonRef}
        onClick={handleSaveHighlight}
        className={styles.saveButton}
      >
        Save Highlight
      </button>
    </>
  );
}
