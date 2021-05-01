import React, { useState } from 'react';
import { LeastTagProps, TagModalRenderer } from '@hessed/ui/web/atom';
import { useField } from 'formik';
import { ChatTagUnion } from '@hessed/client-module/chat-tag';
import { FormErrorLabel, FormFieldRoot, FormTypoLabel } from '../text-fields';
import { grey } from '@material-ui/core/colors';
interface MultiSelectTagForm<T extends LeastTagProps> {
  name: string;
  tagItems: T[];
  modalHead: string;
  label: string;
  cancelLabel?: string;
  submitLabel?: string;
}

export function MultiSelectTagForm<T extends LeastTagProps>({
  tagItems,
  name,
  modalHead,
  label,
  cancelLabel = 'Cancel',
  submitLabel = 'Submit',
}: MultiSelectTagForm<T>) {
  const [focus, setfocus] = useState(false);
  const [{ onBlur }, { value, ...meta }, { setValue }] = useField<
    Set<ChatTagUnion>
  >(name);

  const onSelect = (tag: ChatTagUnion) => {
    const copy = new Set(value);
    value.has(tag) ? copy.delete(tag) : copy.add(tag);
    setValue(copy);
  };

  return (
    <FormFieldRoot>
      <FormTypoLabel
        fontSize="1rem"
        className="mb-1"
        color={grey[500]}
        isFocused={focus}
      >
        {label}
      </FormTypoLabel>
      <TagModalRenderer
        modalHead={modalHead}
        items={tagItems}
        onSelect={onSelect}
        selectedSet={value}
        onClosed={() => {
          setfocus(false);
          onBlur(name);
        }}
        onOpen={() => setfocus(true)}
        canelBtnLabel={cancelLabel}
        submitBtnLabel={submitLabel}
      />
      <FormErrorLabel
        message={meta.error}
        show={meta.touched && Boolean(meta.error)}
      />
    </FormFieldRoot>
  );
}
