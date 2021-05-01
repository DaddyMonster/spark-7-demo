import React from 'react';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { VerticalLgCard } from '@hessed/ui/web/list';
import { Button, IconButton, Typography } from '@material-ui/core';
import styled from 'styled-components';
import useTranslation from 'next-translate/useTranslation';
import { AiOutlineIdcard } from 'react-icons/ai';
import { NationFlag } from '@hessed/ui/web/atom';

type ClickEvent = (e: React.MouseEvent, id: string, idx?: number) => void;

interface RecommandedUserProps extends SevenUserInfo {
  onFollow: ClickEvent;
  onDetail: ClickEvent;
  idx?: number;
  rootStyle?: Record<string, unknown>;
}

export const RecommandedUser = ({
  reputation,
  onFollow,
  localLang,
  hostedCount,
  displayName,
  onDetail,
  photoURL,
  uid,
  followerCount,
  idx,
  rootStyle = {},
}: RecommandedUserProps) => {
  const { t } = useTranslation('recommanded-user');
  return (
    <VerticalLgCard
      $rootStyle={{
        boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.8)',
        ...rootStyle,
      }}
      displayName={displayName}
      subDisplayName={reputation}
      id={uid}
      photoURL={photoURL}
      onClick={onDetail}
      idx={idx}
      PhotoMisc={() => (
        <FlagMiscWrap>
          <NationFlag size={15} type="circular" nation={localLang} />
        </FlagMiscWrap>
      )}
      RootMisc={() => (
        <RootMiscButton onClick={(e) => onDetail(e, uid, idx)}>
          <AiOutlineIdcard />
        </RootMiscButton>
      )}
    >
      <div className="flex w-full my-3 p-1 justify-around  items-center">
        <div className="mr-2">
          <LabelTypo>{t('follower-count-label')}</LabelTypo>
          <NumLabelTypo>{followerCount}</NumLabelTypo>
        </div>
        <div className="mr-2">
          <LabelTypo>{t('hosted-count-label')}</LabelTypo>
          <NumLabelTypo>{hostedCount}</NumLabelTypo>
        </div>
      </div>
      <div className="mx-auto flex">
        <Button
          variant="contained"
          sx={{ mr: 1, px: 5 }}
          onClick={(e) => onFollow(e, uid, idx)}
        >
          {t('follow-user')}
        </Button>
      </div>
    </VerticalLgCard>
  );
};

const LabelTypo = styled(Typography)(({ theme }) => ({
  fontSize: '0.7rem',
  textAlign: 'center',
  color: theme.palette.grey[600],
  marginRight: theme.spacing(1),
}));

const NumLabelTypo = styled(Typography)(({ theme }) => ({
  fontSize: '1.2rem',
  textAlign: 'center',
}));

const RootMiscButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 3,
  right: 3,
}));

const FlagMiscWrap = styled.div(({ theme }) => ({
  position: 'absolute',
  bottom: 2,
  right: -2,
}));
