"use client";
import { store } from "./store";
import { Provider } from "react-redux";

export type ChildrenProps = {
  children: React.ReactNode;
};

export const ReduxProvider = ({ children }: ChildrenProps) => {
  return <Provider store={store}>{children}</Provider>;
};
