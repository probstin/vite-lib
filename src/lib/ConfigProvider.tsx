import { useContext, useEffect } from "react";
import { ConfigStateContext } from "./CoreProvider";

function ConfigProvider({ children }: React.PropsWithChildren): React.ReactElement {
    const { setConfigState } = useContext(ConfigStateContext);

    useEffect(() => {
        setTimeout(() => setConfigState({ configProvider: 'ready' }), 5000)
    }, [])

    return <>{children}</>;
}

export default ConfigProvider;