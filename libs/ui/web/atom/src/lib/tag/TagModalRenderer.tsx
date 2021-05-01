import { Button, Dialog, Typography, useTheme } from '@material-ui/core';
import React, { useState } from 'react';
import { TextFieldLikeWrap } from '../text-fields';
import { TagBaseWithLabel } from './TagBase';
import { SelectableTag } from './SelectableTag';
import styled from 'styled-components';

export interface LeastTagProps {
  id: string;
}

interface TagModalRendererProps<T extends LeastTagProps> {
  items: T[];
  selectedSet: Set<string>;
  onSelect: (id: string) => void;
  onOpen?: () => void;
  onClosed?: () => void;
  TagRenderer?: React.ComponentType<LeastTagProps>;
  modalHead?: string;
  submitBtnLabel: string;
  canelBtnLabel: string;
  limit?: number;
}

export function TagModalRenderer<T extends LeastTagProps>({
  items,
  onOpen,
  onSelect,
  selectedSet,
  onClosed,
  TagRenderer = TagBaseWithLabel,
  modalHead,
  submitBtnLabel,
  canelBtnLabel,
  limit = 1000,
}: TagModalRendererProps<T>) {
  const [open, setopen] = useState(false);
  const handleToggle = (_open: boolean) => {
    if (_open) {
      onOpen && onOpen();
    } else {
      onClosed && onClosed();
    }
    setopen(_open);
  };

  const selectHandler = (id: string) => {
    if (selectedSet.size > limit) {
      alert('Max item reached...');
      return;
    }
    onSelect(id);
  };

  const theme = useTheme();
  return (
    <>
      <TextFieldLikeWrap active={open} onClick={() => handleToggle(true)}>
        {[...selectedSet].map((id) => (
          <TagRenderer id={id} key={id} />
        ))}
      </TextFieldLikeWrap>
      <Dialog open={open} onClose={() => handleToggle(false)} maxWidth="sm">
        <div className="pt-4 px-6">
          {modalHead && <ModalHeadWrap>{modalHead}</ModalHeadWrap>}
          <div className="p-2 flex flex-wrap">
            {items.map((x) => (
              <SelectableTag
                {...x}
                key={x.id}
                selected={selectedSet.has(x.id)}
                onClick={() => selectHandler(x.id)}
              >
                {x.id}
              </SelectableTag>
            ))}
          </div>
          <ActionBox>
            <Button
              onClick={() => handleToggle(false)}
              sx={{ color: theme.palette.danger.main }}
              className="px-3 mr-3"
              variant="text"
            >
              {canelBtnLabel}
            </Button>
            <Button
              variant="contained"
              className="px-3"
              onClick={() => handleToggle(false)}
            >
              {submitBtnLabel}
            </Button>
          </ActionBox>
        </div>
      </Dialog>
    </>
  );
}

const ModalHeadWrap = styled(Typography)(({ theme }) => ({
  height: 50,
  padding: theme.spacing(3, 4),
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const ActionBox = styled.div(({ theme }) => ({
  width: '100%',
  padding: theme.spacing(3),
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));
