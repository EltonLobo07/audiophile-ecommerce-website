import { 
    useState,
    useEffect,
    useRef 
} from "react";

type BaseSerializable = 
    | string 
    | number 
    | boolean 
    | null 
    | Array<unknown>;

type Serializable = 
    | BaseSerializable 
    | Record<string, BaseSerializable>; 

type Args<TState> = {
    initialState: TState | (() => TState),
    isState: (possibleState: unknown) => possibleState is TState,
    lsKey: string
};

const INTERNAL_PREFIX = "_useLocalStorageState-";

function concatPrefix(arg: string): string {
    return INTERNAL_PREFIX + arg;
}

export function useSSRSafeLocalStorageState<TState extends Serializable>(args: Args<TState>) {
    const {
        initialState: clientInitialState,
        isState,
        lsKey
    } = args;
    
    const [state, setState] = useState<TState | undefined>(undefined);
    const lsKeyRef = useRef(lsKey);

    useEffect(() => {
        if (lsKeyRef.current !== lsKey) {
            // This block won't run during the initial render
            window.localStorage.removeItem(lsKeyRef.current);
            lsKeyRef.current = lsKey;
        }
        if (state === undefined) {
            // Right after initial client side run of the component
            let initialState: TState | undefined = undefined;
            const stateInLs = window.localStorage.getItem(concatPrefix(lsKey));
            if (stateInLs !== null) {
                try {
                    const possibleState = JSON.parse(stateInLs);
                    if (isState(possibleState)) {
                        initialState = possibleState;
                    }
                }
                catch(error) {
                    console.log(error);
                }
            }
            if (initialState === undefined) {
                initialState = typeof clientInitialState === "function" ? clientInitialState() : clientInitialState;
            }
            setState(initialState);
        }
        else {
            window.localStorage.setItem(concatPrefix(lsKeyRef.current), JSON.stringify(state));
        }
    }, [state, lsKey, clientInitialState, isState]);

    return [state, setState] as const;
}
