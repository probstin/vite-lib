import { createContext, useState } from "react";
import ConfigProvider from "./ConfigProvider";
import HttpProvider from "./HttpProvider";

export const ConfigStateContext = createContext<any>({ configState: undefined, setConfigState: () => { } });
const { Provider } = ConfigStateContext;

function CoreProvider({ children }: React.PropsWithChildren): React.ReactElement {
    const [configState, setConfigState] = useState(undefined);

    return (
        <Provider value={{ configState, setConfigState }}>
            <ConfigProvider>
                <HttpProvider>
                    {children}
                </HttpProvider>
            </ConfigProvider>
        </Provider>
    )
}

export default CoreProvider;