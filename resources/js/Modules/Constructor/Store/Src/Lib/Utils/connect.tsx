import { Provider } from "react-redux";
import { store } from "../store";

export const connect = <TProps extends object>(
    Component: React.ComponentType<TProps>
): React.ComponentType<TProps> => {
    const HighOrderedComponent = (props: TProps) => {
        return (
            <Provider store={store}>
                <Component {...props} />
            </Provider>
        );
    };

    return HighOrderedComponent;
};
