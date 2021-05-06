import { AuthErrorReason } from '../dao';

export const AuthResponseMsg: { [key in AuthErrorReason]: string } = {
  Black_Listed: '권한이 없습니다.',
  Email_Exist: '동일한 Email의 사용자가 존재합니다.',
  No_User: '일치하는 유저가 없습니다.',
  Wrong_Pass: '비밀번호가 일치하지 않습니다.',
  Not_Auth: '인증이 필요합니다.',
};
