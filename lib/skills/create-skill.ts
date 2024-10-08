import { DocumentStorageType } from "@prisma/client";

export type DocumentData = {
    name: string;
    key: string;
    storageType: DocumentStorageType;
    contentType: string; // papermark types: "pdf", "sheet"
};

export const createSkill = async ({
    documentData,
    teamId,
    numPages,
    folderPathName,
}: {
    documentData: DocumentData;
    teamId: string;
    numPages?: number;
    folderPathName?: string;
}) => {
    // create a document in the database with the blob url
    const response = await fetch(`/api/teams/${teamId}/skills`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: documentData.name,
            url: documentData.key,
            storageType: documentData.storageType,
            numPages: numPages,
            folderPathName: folderPathName,
            type: documentData.contentType,
        }),
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response;
};