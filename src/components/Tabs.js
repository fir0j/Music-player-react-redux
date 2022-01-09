import styled from "styled-components";
import { Tabs, TabList, Tab, TabPanel } from "react-tabs";

const STabs = styled(Tabs)`
  font-family: BlinkMacSystemFont, "Segoe UI", sans-serif;
  font-size: 18px;
  @media screen and (max-width: 480px) {
    font-size: 14px;
  }
`;

const STabList = styled(TabList)`
  list-style-type: none;
  margin-top: 16px;
  padding: 0px;
  display: flex;
  justify-content: center;
`;
STabList.tabsRole = "TabList";

const STab = styled(Tab)`
  border: 1px solid rgb(252, 228, 148);
  user-select: none;
  cursor: pointer;
  padding: 8px;
  min-width: 100px;
  margin-bottom: -1px;
  color: white;

  &.is-selected {
    // z-index: 10;
    background: rgba(0, 0, 0, 0.4);
  }

  @media screen and (max-width: 480px) {
    min-width: 80px;
  }
`;
STab.tabsRole = "Tab";

const STabPanel = styled(TabPanel)`
  display: none;
  min-height: 200px;
  position: relative;
  margin-left: 8px;
  margin-right: 8px;
  padding: 4px;
  &.is-selected {
    display: flex;
  }
`;
STabPanel.tabsRole = "TabPanel";

export { STabs, STabList, STab, STabPanel };
