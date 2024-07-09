import React from "react";
import { Tabs, Tab } from "@nextui-org/react";
import PhraseList from "../Phrase/PhraseList";
import { Material } from "../../types";
import Chat from "../Chat/Chat";

interface MaterialTabsProps {
  material: Material;
}

const MaterialTabs: React.FC<MaterialTabsProps> = ({ material }) => {
  const variant = "underlined";
  const responsePhraseText = material.Phrases;
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
          <Chat materialId={material.ID} chats={material.Chat} />
        </Tab>
      </Tabs>
    </div>
  );
};

export default MaterialTabs;
