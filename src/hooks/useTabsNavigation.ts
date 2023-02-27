import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

interface Tab {
  label: string;
  to: string;
  id: number;
}

export const useTabsNavigation = (tabs: Tab[]) => {
  const [activeTab, setActiveTab] = useState<number | false>(0);
  const { pathname } = useLocation();

  useEffect(() => {
    const isTabExist = tabs.find((tab) => tab.to === pathname);
    if (!isTabExist) {
      setActiveTab(false);
      return;
    }
    setActiveTab(isTabExist.id);
  }, [pathname]);

  return activeTab;
};
