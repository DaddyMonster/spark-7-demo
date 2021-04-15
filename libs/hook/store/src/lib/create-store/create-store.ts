import create, { State, StateCreator } from 'zustand';
import produce from 'immer';
import { pipe } from 'ramda';

type FuncSetter<T> = (state: T) => void | T;

type Setter<T> = (setter: FuncSetter<T> | T) => void;

const immer = <T extends State>(
  config: StateCreator<T, Setter<T>>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn as never) as FuncSetter<T>), get, api);

export const createStore = pipe(immer, create);
