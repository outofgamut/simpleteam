import { useRouter } from "next/router";

import { FormEvent, useState } from "react";

import { useTeam } from "@/context/team-context";
import { usePlausible } from "next-plausible";
import { parsePageId } from "notion-utils";
import { toast } from "sonner";
import { mutate } from "swr";

import DocumentUpload from "@/components/document-upload";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { useAnalytics } from "@/lib/analytics";
import {
  DocumentData,
  createDocument,
  createNewDocumentVersion,
} from "@/lib/documents/create-document";
import { putFile } from "@/lib/files/put-file";
import { copyToClipboard } from "@/lib/utils";
import { getSupportedContentType } from "@/lib/utils/get-content-type";

export function AddSkillModal({
  newVersion,
  children,
  isDataroom,
  dataroomId,
}: {
  newVersion?: boolean;
  children: React.ReactNode;
  isDataroom?: boolean;
  dataroomId?: string;
}) {
  const router = useRouter();
  const plausible = usePlausible();
  const analytics = useAnalytics();
  const [uploading, setUploading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean | undefined>(undefined);
  const [currentFile, setCurrentFile] = useState<File | null>(null);
  const [skillName, setSkillName] = useState<string | null>(null);
  const [skillDescription, setSkillDescription] = useState<string | null>(null);
  const teamInfo = useTeam();

  const teamId = teamInfo?.currentTeam?.id as string;

  /** current folder name */
  const currentFolderPath = router.query.name as string[] | undefined;

  const handleFileUpload = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Check if the file is chosen
    if (!currentFile) {
      toast.error("Please select a file to upload.");
      return; // prevent form from submitting
    }

    try {
      setUploading(true);

      const contentType = getSupportedContentType(currentFile.type);

      if (!contentType) {
        setUploading(false);
        toast.error(
          "Unsupported file format. Please upload a PDF or Excel file.",
        );
        return;
      }

      const { type, data, numPages } = await putFile({
        file: currentFile,
        teamId,
      });

      const documentData: DocumentData = {
        name: currentFile.name,
        key: data!,
        storageType: type!,
        contentType: contentType,
      };
      let response: Response | undefined;
      // create a document or new version in the database
      if (!newVersion) {
        // create a document in the database
        response = await createDocument({
          documentData,
          teamId,
          numPages,
          folderPathName: currentFolderPath?.join("/"),
        });
      } else {
        // create a new version for existing document in the database
        const documentId = router.query.id as string;
        response = await createNewDocumentVersion({
          documentData,
          documentId,
          numPages,
          teamId,
        });
      }

      if (response) {
        const document = await response.json();

        // if (isDataroom && dataroomId) {
        //   await addDocumentToDataroom({
        //     documentId: document.id,
        //     folderPathName: currentFolderPath?.join("/"),
        //   });

        //   plausible("documentUploaded");
        //   analytics.capture("Document Added", {
        //     documentId: document.id,
        //     name: document.name,
        //     numPages: document.numPages,
        //     path: router.asPath,
        //     type: document.type,
        //     teamId: teamId,
        //     dataroomId: dataroomId,
        //   });

        //   return;
        // }

        if (!newVersion) {
          // copy the link to the clipboard
          copyToClipboard(
            `${process.env.NEXT_PUBLIC_BASE_URL}/view/${document.links[0].id}`,
            "Document uploaded and link copied to clipboard. Redirecting to document page...",
          );

          // track the event
          plausible("documentUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: document.type,
            teamId: teamId,
          });
          analytics.capture("Link Added", {
            linkId: document.links[0].id,
            documentId: document.id,
            customDomain: null,
            teamId: teamId,
          });

          // redirect to the document page
          router.push("/documents/" + document.id);
        } else {
          // track the event
          plausible("documentVersionUploaded");
          analytics.capture("Document Added", {
            documentId: document.id,
            name: document.name,
            numPages: document.numPages,
            path: router.asPath,
            type: document.type,
            newVersion: true,
            teamId: teamId,
          });
          toast.success("New document version uploaded.");

          // reload to the document page
          router.reload();
        }
      }
    } catch (error) {
      setUploading(false);
      toast.error("An error occurred while uploading the file.");
      console.error("An error occurred while uploading the file: ", error);
    } finally {
      setUploading(false);
      setIsOpen(false);
    }
  };

  const handleSkillAdd = async (
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    event.preventDefault();

    // Check if the field is empty or not
    if (!skillName) {
      toast.error("Please enter a valid skill name to proceed.");
      return; // prevent form from submitting
    }

    try {
      setUploading(true);

      const response = await fetch(
        `/api/teams/${teamInfo?.currentTeam?.id}/skills`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: skillName,
            description: skillDescription,
          }),
        },
      );

      if (response) {
        const skill = await response.json();

        if (!newVersion) {
          toast.success("Skill added! Redirecting to skill page...");


          // track the event
          plausible("documentUploaded");
          plausible("notionDocumentUploaded");
          analytics.capture("Skill Added", {
            documentId: skill.id,
            name: skill.name,
            fileSize: null,
            path: router.asPath,
            type: "notion",
            teamId: teamId,
          });

          // redirect to the document page
          router.push("/skills/" + skill.id);
        }
      }
    } catch (error) {
      setUploading(false);
      toast.error(
        "Oops! Can't access the Skill page. Please double-check it's set to 'Public'.",
      );
      console.error(
        "An error occurred while processing the Notion link: ",
        error,
      );
    } finally {
      setUploading(false);
      setIsOpen(false);
    }
  };

  const clearModelStates = () => {
    currentFile !== null && setCurrentFile(null);
    skillName !== null && setSkillName(null);
    setIsOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={clearModelStates}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="border-none bg-transparent text-foreground shadow-none"
        isDocumentDialog
      >
        <Tabs defaultValue="single">
          {!newVersion ? (
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="single">Single</TabsTrigger>
              <TabsTrigger value="bulk">Bulk</TabsTrigger>
            </TabsList>
          ) : (
            <TabsList className="grid w-full grid-cols-1">
              <TabsTrigger value="single">Manual</TabsTrigger>
            </TabsList>
          )}
          <TabsContent value="bulk">
            <Card>
              <CardHeader className="space-y-3">
                <CardTitle>
                  {newVersion ? `Upload a new version` : `Add a new skill`}
                </CardTitle>
                <CardDescription>
                  {newVersion
                    ? `After you upload a new version, the existing links will remain the unchanged but `
                    : `After you upload the document, a shareable link will be
                generated and copied to your clipboard.`}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <form
                  encType="multipart/form-data"
                  onSubmit={handleFileUpload}
                  className="flex flex-col space-y-4"
                >
                  <div className="space-y-1">
                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                      <DocumentUpload
                        currentFile={currentFile}
                        setCurrentFile={setCurrentFile}
                      />
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      type="button"
                      className="text-sm text-muted-foreground underline-offset-4 transition-all hover:text-gray-800 hover:underline hover:dark:text-muted-foreground/80"
                      onClick={(e) => {
                        e.stopPropagation();
                        document
                          .getElementById("upload-multi-files-zone")
                          ?.click();
                        clearModelStates();
                      }}
                    >
                      Want to upload multiple skills?
                    </button>
                  </div>

                  <div className="flex justify-center">
                    <Button
                      type="submit"
                      className="w-full lg:w-1/2"
                      disabled={uploading || !currentFile}
                      loading={uploading}
                    >
                      {uploading ? "Uploading..." : "Upload Document"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
          {!newVersion && (
            <TabsContent value="single">
              <Card>
                <CardHeader className="space-y-3">
                  <CardTitle>Add a skill</CardTitle>
                  <CardDescription>
                    After you add a skill, it will be available for your
                    team to use.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  <form
                    onSubmit={handleSkillAdd}
                    className="flex flex-col"
                  >
                    <div className="space-y-1 pb-8">
                      <Label htmlFor="skill-name">Skill Name</Label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="skill-name"
                          id="skill-name"
                          placeholder="Skill name..."
                          className="flex w-full rounded-md border-0 bg-background py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                          value={skillName || ""}
                          onChange={(e) => setSkillName(e.target.value)}
                        />
                      </div>
                      <small className="text-xs text-muted-foreground">
                        Skill names must be unique.
                      </small>
                    </div>
                    <div className="space-y-1 pb-8">
                      <Label htmlFor="skill-name">Description</Label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="skill-description"
                          id="skill-description"
                          placeholder="Description"
                          className="flex w-full rounded-md border-0 bg-background py-1.5 text-foreground shadow-sm ring-1 ring-inset ring-input placeholder:text-muted-foreground focus:ring-2 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6"
                          value={skillDescription || ""}
                          onChange={(e) => setSkillDescription(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="flex justify-center">
                      <Button
                        type="submit"
                        className="w-full lg:w-1/2"
                        disabled={uploading || !skillName}
                        loading={uploading}
                      >
                        {uploading ? "Saving..." : "Save Skill"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          )}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
