export type DeepReadonly<T> = 
    /* 
        Without the transformation in the true branch, 
            {(): string} or () => string changes to {} - which is incorrect 
    */
    T extends (...args: unknown[]) => unknown
      ? Omit<T, string | number | symbol> & {readonly [K in keyof T]: DeepReadonly<T[K]>}
      : T extends object
        ? {readonly [K in keyof T]: DeepReadonly<T[K]>} 
        : T;

export type StateAndSetter<TState> = [TState, (newState: TState) => void];
