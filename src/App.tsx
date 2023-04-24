import React, { useCallback } from "react";
import Browser from "./components/Browser";
import HighlightsList from "./components/HighlightsList";
import useHighlights, { IHighlight } from "./hooks/useHighlights";

function App(): JSX.Element {
  const [highlights, setHighlights] = useHighlights();

  const handleAddHighlight = useCallback(
    (newHighlight: IHighlight) => {
      setHighlights([...highlights, newHighlight]);
    },
    [highlights, setHighlights]
  );

  const handleDeleteHighlight = useCallback(
    (id: string) => {
      const newHighlights = highlights.filter(
        (highlight) => highlight.id !== id
      );

      setHighlights(newHighlights);
    },
    [highlights, setHighlights]
  );

  return (
    <>
      <HighlightsList
        highlights={highlights}
        deleteHighlight={handleDeleteHighlight}
      />
      <Browser addHighlight={handleAddHighlight} />
    </>
  );
}

export default App;
