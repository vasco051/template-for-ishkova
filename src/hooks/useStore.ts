import { useContext } from "react";

import { Context } from "components/logic/store-provider";

export const useStore = () => {
  const context = useContext(Context);
  return context.store;
}