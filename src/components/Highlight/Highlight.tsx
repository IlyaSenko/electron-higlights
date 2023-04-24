import { IHighlight } from "../../hooks/useHighlights";
import styles from "./Highlight.module.scss";

interface IHighlightProps extends IHighlight {
  deleteHighlight: (id: string) => void;
}

export default function Highlight({
  title,
  url,
  highlight,
  id,
  deleteHighlight,
}: IHighlightProps): JSX.Element {
  return (
    <div className={styles.highlightWrapper}>
      <h5>{title}</h5>
      <a href={url}>{url}</a>
      <p>{highlight}</p>
      <button type="button" onClick={() => deleteHighlight(id)}>
        Delete Highlight
      </button>
    </div>
  );
}
