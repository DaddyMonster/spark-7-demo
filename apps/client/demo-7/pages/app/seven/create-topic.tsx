import {
  Button,
  Container,
  Hidden,
  InputBase,
  Paper,
  Typography,
} from '@material-ui/core';
import { grey, red } from '@material-ui/core/colors';
import { useField } from 'formik';
import React, { useState } from 'react';
import styled from 'styled-components';
import Crumb from '../../../components/atoms/crumb/Crumb';
import { NationFlag } from '../../../components/flag/NationFlag';
import { MagicForm } from '../../../components/form/MagicForm';
import FormTextArea from '../../../components/form/text-fields/FormTextArea';
import FormTextField, {
  FormErrorWrap,
  FormFieldRoot,
} from '../../../components/form/text-fields/FormTextField';
import { FormTypoLabel } from '../../../components/form/text-fields/FormTypoLabel';
import { TOP_NAV_HEIGHT } from '../../../constants/layout-sizes';
import {
  initialValue,
  useCreateChatMeta,
  validationSchema,
} from '../../../hooks/create-chat-meta';
import { CustomPageType } from '../../../types/custom-page';

const CreateTopic: CustomPageType = () => {
  const [timeMode, settimeMode] = useState<'left' | 'time'>('left');
  const [minAfter, setminAfter] = useState(5);
  const { onSubmit } = useCreateChatMeta();
  return (
    <Root>
      <Hidden smDown>
        <Crumb
          appName="Seven Talk"
          subTitle="Schedule your talk session"
          title="Throw a topic"
        />
      </Hidden>
      <div className="flex justify-center items-center md:pt-3">
        {/* <Container maxWidth="sm"> */}
        <RootPaper>
          <NewTopic>New Topic</NewTopic>
          <div className="py-9" />
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
              <FormTypoLabel fontSize="1rem" className="mb-1" color={grey[500]}>
                When Should We Start?
              </FormTypoLabel>
              <div className="w-full flex justify-center items-center">
                <Button
                  variant={timeMode === 'left' ? 'contained' : 'outlined'}
                  className="text-sm mr-2"
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
              <div className="flex justify-center items-center py-2">
                <NumberInput name="startTime" />
              </div>
              <div className="flex justify-center items-center">
                <LangInput />
              </div>
              <div className="flex w-full justify-center mt-3">
                <Button className="px-2 py-2" type="submit" variant="contained">
                  Create
                </Button>
              </div>
            </FormFieldRoot>
          </MagicForm>
        </RootPaper>
        {/* </Container> */}
      </div>
    </Root>
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
      <NumInput {...props} onChange={onChange} />

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
      <Typography className="mx-2">Minutes from now</Typography>
    </div>
  );
};

const LangInput = () => {
  const [{ onChange, ...props }, meta, { setError, setValue }] = useField(
    'lang'
  );
  return (
    <div className="flex justify-center">
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
  minHeight: `calc(100% - ${TOP_NAV_HEIGHT}px)`,
  padding: theme.spacing(0, 4),
  [theme.breakpoints.down('md')]: {
    padding: 0,
    margin: 0,
  },
}));

const RootPaper = styled(Paper)(({ theme }) => ({
  width: 'auto',
  minHeight: 400,
  borderRadius: 5,
  boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.8)',
  position: 'relative',
  padding: theme.spacing(0, 2),
  [theme.breakpoints.down('md')]: {
    width: '100%',
    margin: theme.spacing(0, 4),
  },
  [theme.breakpoints.down('sm')]: {
    height: `calc(100vh - ${TOP_NAV_HEIGHT}px)`,
    padding: theme.spacing(0),
    overflowY: 'scroll',
    marginTop: theme.spacing(1.5),
  },
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
  [theme.breakpoints.down('md')]: {
    top: 0,
    left: 0,
    transform: 'none',
  },
}));

const NumInput = styled(InputBase).attrs({
  type: 'number',
  classes: { input: 'num-input' },
})(({ theme }) => ({
  width: 50,
  '& .num-input': {
    textAlign: 'right',
    marginRight: 2,
  },
}));
