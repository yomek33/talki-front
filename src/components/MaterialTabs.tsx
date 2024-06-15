import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import PhraseList from "./Phrase/PhraseList";
import { Phrase } from "../types";

interface MaterialTabsProps {
  responsePhraseText: Phrase[];
}

const MaterialTabs: React.FC<MaterialTabsProps> = ({ responsePhraseText }) => {
  const variant = "underlined";

  return (
    <div className="flex w-full flex-col">
      <Tabs key={variant} variant={variant} aria-label="Tabs variants">
        <Tab key="Phrases" title="Phrases">
          {responsePhraseText.length > 0 && (
            <div>
              <PhraseList phrases={responsePhraseText} />
            </div>
          )}
        </Tab>
        <Tab key="Chats" title="Chats">
          <div>
            <h1>ss</h1>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default MaterialTabs;
