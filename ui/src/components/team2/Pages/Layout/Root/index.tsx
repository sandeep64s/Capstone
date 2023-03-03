import React, { useState } from "react";

interface ActiveState {
  activeTab: number,
  setActiveTab: (tabId: number) => void
}

export const ActiveContext = React.createContext<ActiveState>({
  activeTab: 0,
  setActiveTab: () => { }
});

type ChildrenProp = {
  children: JSX.Element
}

const Root = ({ children }: ChildrenProp) => {
  const [activeTab, setActiveTab] = useState(1);

  // Genereate desired Layout state here.
  const state: ActiveState = {
    activeTab: activeTab,
    setActiveTab: setActiveTab
  };

  return (
    <ActiveContext.Provider value={state}>
      {children}
    </ActiveContext.Provider>
  );
};

export default Root;
