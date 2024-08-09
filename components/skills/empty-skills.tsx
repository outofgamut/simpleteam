import { FilePlusIcon, PlusIcon, PocketKnifeIcon } from "lucide-react";

import { Button } from "../ui/button";
import { AddSkillModal } from "./add-skill-modal";

export function EmptySkills() {
  return (
    <div className="text-center">
      <PocketKnifeIcon
        className="mx-auto h-12 w-12 text-muted-foreground"
        strokeWidth={1}
      />
      <h3 className="mt-2 text-sm font-medium text-foreground">
        No skills here
      </h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Get started by adding a new skill.
      </p>
      {/* <div className="mt-6">
        <AddDocumentModal>
          <Button
            className="w-full flex gap-x-2 items-center justify-center px-2"
            title="Add New Document"
          >
            <PlusIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Add Document</span>
          </Button>
        </AddDocumentModal>
      </div> */}
    </div>
  );
}
