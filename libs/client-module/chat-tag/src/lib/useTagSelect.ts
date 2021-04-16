import React, { useCallback, useMemo, useState } from 'react';
import { produce } from 'immer';
import { tagMap, TagChatSelection, ChatTagUnion } from './chat-tag-list';

interface TagSelectionStates {
  selectionTag: TagChatSelection[];
  tags: ChatTagUnion[];
}

interface TagSelectionActions {
  selectTag: (idx: number) => void;
}

type UseTagSelect = [TagSelectionStates, TagSelectionActions];

export function useTagSelect(): UseTagSelect {
  const [selectionTag, setselectionTag] = useState(tagMap);
  const tags = useMemo(
    () => selectionTag.filter((x) => x.selected).map((x) => x.id),
    [selectionTag]
  );
  const selectTag = useCallback(
    (idx: number) => {
      setselectionTag(
        produce(
          (prev: typeof selectionTag) =>
            void (prev[idx].selected = !prev[idx].selected)
        )
      );
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectionTag]
  );

  return [{ selectionTag, tags }, { selectTag }];
}
