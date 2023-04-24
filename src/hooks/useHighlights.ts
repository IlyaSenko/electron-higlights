import { useCallback, useState } from "react";

export interface IHighlight {
  id: string;
  url: string;
  title: string;
  highlight: string;
}

const getDefaultHighlightsValue = (): IHighlight[] => {
  const highlightsLocalstorage = window.localStorage.getItem("highlights");

  return highlightsLocalstorage ? JSON.parse(highlightsLocalstorage) : [];
};

export default function useHighlights(): [
  IHighlight[],
  (newHighlights: IHighlight[]) => void
] {
  const [highlights, setHighlights] = useState<IHighlight[]>(
    getDefaultHighlightsValue()
  );

  const handleSetHighlights = useCallback(
    (newHighlights: IHighlight[]) => {
      setHighlights(newHighlights);

      window.localStorage.setItem("highlights", JSON.stringify(newHighlights));
    },
    [setHighlights]
  );

  return [highlights, handleSetHighlights];
}
