import create, { State, StateCreator } from 'zustand';
import produce from 'immer';
import { pipe } from 'ramda';

const immer = <T extends State>(
  config: StateCreator<T, (fn: (state: T) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn as never) as (state: T) => T), get, api);

export const createStore = pipe(immer, create);
