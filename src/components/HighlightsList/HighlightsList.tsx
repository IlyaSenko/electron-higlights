import { IHighlight } from "../../hooks/useHighlights";
import Highlight from "../Highlight";
import styles from "./HighlightsList.module.scss";

export default function HighlightsList({
  highlights,
  deleteHighlight,
}: {
  highlights: IHighlight[];
  deleteHighlight: (id: string) => void;
}): JSX.Element {
  return (
    <div className={styles.highlightsList}>
      <h4>Your Highlights</h4>
      <hr />
      {highlights.length ? (
        highlights.map((highlight) => (
          <Highlight
            {...highlight}
            key={highlight.id}
            deleteHighlight={deleteHighlight}
          />
        ))
      ) : (
        <h1>No highlights yet!</h1>
      )}
    </div>
  );
}
