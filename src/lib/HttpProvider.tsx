import { useContext, useEffect } from "react";
import { ConfigStateContext } from "./CoreProvider";

function HttpProvider({ children }: React.PropsWithChildren) {
    const { configState } = useContext(ConfigStateContext);

    useEffect(() => {
        if (configState?.configProvider === 'ready') {
            console.log(configState);
        }
    }, [configState]);

    return <>{children}</>
}

export default HttpProvider;