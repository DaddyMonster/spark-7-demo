import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';

export enum AuthErrorReason {
  No_User = 'No_User',
  Wrong_Pass = 'Wrong_Pass',
  Black_Listed = 'Black_Listed',
  Email_Exist = 'Email_Exist',
  Not_Auth = 'Not_Auth',
}
registerEnumType(AuthErrorReason, { name: 'AuthErrorReason' });

@ObjectType()
export class AuthError {
  @Field()
  message: string;

  @Field(() => AuthErrorReason)
  reason: AuthErrorReason;
}
