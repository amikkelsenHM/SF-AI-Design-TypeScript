'use client';

import { useSyncedTabState } from 'hooks/useSyncedTabState';
import { IBaseTabsProps } from 'models/interfaces/v2/tab-panel/IBaseTabs';
import { memo, useMemo } from 'react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '../components/ui/tabs';
import SfTooltip from '../v2/tooltip/sf-tooltip';

const TabContent = memo(({ content }: { content: React.ReactNode }) => {
  return <>{content}</>;
});

TabContent.displayName = 'TabContent';

export function BaseTabs({
  tabs,
  initialTabIndex = 0,
  tabPanelClassName,
  onTabChange,
  tabKey,
}: IBaseTabsProps) {
  const [currentTab, setCurrentTab] = useSyncedTabState(
    tabs,
    initialTabIndex,
    onTabChange,
    tabKey
  );

  const tabTriggers = useMemo(
    () =>
      tabs.map(({ label, disabled, tooltip }, index) => (
        <TabsTrigger
          key={`tab-${index}`}
          value={label}
          disabled={disabled}
          aria-controls={`tabpanel-${index}`}
          className="w-43"
        >
          {label}
          {tooltip && (
            <SfTooltip
              header={tooltip.header}
              text={tooltip.text}
              triggerAriaLabel={tooltip.triggerAriaLabel}
            />
          )}
        </TabsTrigger>
      )),
    [tabs]
  );

  const tabContents = useMemo(
    () =>
      tabs.map(({ label, content }, index) => (
        <TabsContent
          key={`panel-${label}-${index}`}
          id={`tabpanel-${index}`}
          role="tabpanel"
          value={label}
          aria-labelledby={`tab-${index}`}
          className={tabPanelClassName}
        >
          <TabContent content={content} />
        </TabsContent>
      )),
    [tabs]
  );

  return (
    <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
      <TabsList className="flex-wrap">{tabTriggers}</TabsList>
      {tabContents}
    </Tabs>
  );
}

export default memo(BaseTabs);
