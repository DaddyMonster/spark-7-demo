import { ChatTagUnion, tagMap } from '@hessed/client-module/chat-tag';
import { SelectableTag } from '@hessed/ui/web/atom';
import { Button, Container } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

interface PickInterestsProps {
  picked: Set<ChatTagUnion>;
  onPick: (picked: ChatTagUnion) => void;
  onSubmit: () => void;
}

export const PickInterests = ({
  picked,
  onPick,
  onSubmit,
}: PickInterestsProps) => {
  const { t } = useTranslation('more-info');
  return (
    <Container maxWidth="md">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-wrap justify-center">
          {tagMap.map((x) => (
            <SelectableTag
              selected={picked.has(x.id)}
              key={x.id}
              onClick={() => onPick(x.id)}
            >
              {x.id}
            </SelectableTag>
          ))}
        </div>
        <div className="p-3">
          <Button className="px-5" variant="contained" onClick={onSubmit}>
            {t('submit-interest')}
          </Button>
        </div>
      </div>
    </Container>
  );
};
