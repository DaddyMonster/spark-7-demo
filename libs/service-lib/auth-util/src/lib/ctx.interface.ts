export interface IBaseUser<R extends string> {
  role: R;
}

export interface CustomCtx<
  R extends string,
  T extends IBaseUser<R> = IBaseUser<R>
> {
  user: T;
}
