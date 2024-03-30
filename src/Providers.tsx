import { ReactNode } from "react";
import { Provider as ReduxProvider } from "react-redux";
import { AppStore } from "~/lib/redux/store";

export interface ProviderWrapperProps {
  children: ReactNode;
  store: AppStore;
}

export function ProviderWrapper({ children, store }: ProviderWrapperProps) {
  return <ReduxProvider store={store}>{children}</ReduxProvider>;
}
