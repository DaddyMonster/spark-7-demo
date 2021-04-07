import React, { useState } from 'react';
import { CustomPageType } from '../../../types/custom-page';
import styled from 'styled-components';
import { TOP_NAV_HEIGHT } from '../../../constants/layout-sizes';
import {
  Box,
  Button,
  Container,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import Crumb from '../../../components/atoms/crumb/Crumb';
import { MagicForm } from '../../../components/form/MagicForm';
import {
  initialValue,
  useCreateChatMeta,
  validationSchema,
  CreateChatMetaInput,
} from '../../../hooks/create-chat-meta';
import FormTextField, {
  FormErrorWrap,
  FormFieldRoot,
} from '../../../components/form/text-fields/FormTextField';
import { grey, red } from '@material-ui/core/colors';
import FormTextArea from '../../../components/form/text-fields/FormTextArea';
import { useField } from 'formik';
import { NationFlag } from '../../../components/flag/NationFlag';

const CreateTopic: CustomPageType = () => {
  const [timeMode, settimeMode] = useState<'left' | 'time'>('left');
  const [minAfter, setminAfter] = useState(5);
  const { onSubmit } = useCreateChatMeta();
  return (
    <Container maxWidth="lg">
      <Root>
        <Crumb
          appName="Seven Talk"
          subTitle="Schedule your talk session"
          title="Throw a topic"
        />
        <div className="flex justify-center items-center py-10">
          <Container maxWidth="sm">
            <RootPaper>
              <NewTopic>New Topic</NewTopic>
              <div className="py-7" />
              <MagicForm
                initialValues={initialValue}
                validationSchema={validationSchema}
                onSubmit={onSubmit}
              >
                <FormTextField name="topic" label="Enter Topic to talk" />
                <FormTextArea
                  name="description"
                  label="Give us more description about your topic"
                />
                <FormFieldRoot>
                  <Typography
                    fontSize="1rem"
                    className="mb-1"
                    color={grey[500]}
                  >
                    When Should We Start?
                  </Typography>
                  <div className="w-full flex justify-center items-center">
                    <Button
                      variant={timeMode === 'left' ? 'contained' : 'outlined'}
                      className="text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        settimeMode('left');
                      }}
                    >
                      From now
                    </Button>
                    <Button
                      variant={timeMode === 'time' ? 'contained' : 'outlined'}
                      className="text-sm"
                      onClick={(e) => {
                        e.preventDefault();
                        settimeMode('time');
                      }}
                      disabled
                    >
                      Pick time
                    </Button>
                  </div>
                  <div className="flex justify-center items-center py-4">
                    <NumberInput name="startTime" />
                  </div>
                  <div className="flex justify-center items-center">
                    <LangInput />
                  </div>
                  <div className="flex justify-center py-4">
                    <Button
                      className="px-5 py-2"
                      type="submit"
                      variant="contained"
                    >
                      Create
                    </Button>
                  </div>
                </FormFieldRoot>
              </MagicForm>
            </RootPaper>
          </Container>
        </div>
      </Root>
    </Container>
  );
};
CreateTopic.layout = 'SEVEN_LAYOUT';
export default CreateTopic;

interface NumberInputProps {
  name: string;
}

const NumberInput = ({ name }: NumberInputProps) => {
  const [{ onChange, ...props }, meta, { setError }] = useField(name);
  return (
    <div className="relative w-full flex justify-center items-center">
      <InputBase
        {...props}
        onChange={onChange}
        type="number"
        style={{
          width: 50,
        }}
      />

      <FormErrorWrap>
        {meta.touched && meta.error && (
          <Typography
            fontSize="0.7rem"
            className="font-pretty"
            color={red[400]}
          >
            {meta.error}
          </Typography>
        )}
      </FormErrorWrap>
      <Typography className="mx-2">Minutes later</Typography>
    </div>
  );
};

const LangInput = () => {
  const [{ onChange, ...props }, meta, { setError, setValue }] = useField(
    'lang'
  );
  return (
    <div className="flex justify-center p-5">
      <div className="mr-5">
        <NationFlag
          nation="en"
          disabled={props.value !== 'en'}
          sizes={40}
          onClick={setValue}
        />
      </div>
      <NationFlag
        nation="ko"
        disabled={props.value !== 'ko'}
        sizes={40}
        onClick={setValue}
      />
    </div>
  );
};

const Root = styled.div(({ theme }) => ({
  width: '100%',
  height: `calc(100% - ${TOP_NAV_HEIGHT}px)`,
  padding: theme.spacing(0, 4),
}));

const RootPaper = styled(Paper)(({ theme }) => ({
  width: '100%',
  minHeight: 400,
  borderRadius: 5,
  boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.8)',
  position: 'relative',
}));

const NewTopic = styled.h6(({ theme }) => ({
  padding: theme.spacing(1, 3),
  display: 'inline-block',
  fontSize: '1.5rem',
  background: theme.palette.primary.main,
  color: '#fff',
  textAlign: 'center',
  transform: 'rotate(-2deg)',
  boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
  position: 'absolute',
  top: -5,
  left: -10,
}));
