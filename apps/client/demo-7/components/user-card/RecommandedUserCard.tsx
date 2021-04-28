import React from 'react';
import { SevenUserInfo } from '@hessed/client-module/seven-auth';
import { UserListCardCustom } from '@hessed/ui/web/list';
import { Typography } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';

interface RecommandedUserCard extends SevenUserInfo {
  onFollow: (id: string, idx: number) => void;
}

export const RecommandedUserCard = ({
  uid,
  followers,
  displayName,
  createdAt,
  email,
  hostedCount,
  interests,
  learningLang,
  localLang,
  photoURL,
  registered,
  reputation,
  onFollow,
}: RecommandedUserCard) => {
  const { t } = useTranslation('recommanded-user-card');
  return (
    <UserListCardCustom displayName={displayName} uid={uid} photoURL={photoURL}>
      <div className="px-1">
        <Typography>{reputation}</Typography>
        <Typography>{reputation}</Typography>
        <Typography>{reputation}</Typography>
      </div>
    </UserListCardCustom>
  );
};
