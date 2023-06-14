import { Client, Account, Databases } from "appwrite";

function getEnvs() {
  let endPoint = process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT;
  let projectId = process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_PROJECT_ID;

  if (!endPoint && endPoint === "")
    throw new Error("APPWRITE_PUBLIC_ENDPOINT is not available");
  if (!projectId && projectId === "")
    throw new Error("APPWRITE_PUBLIC_PROJECT_ID is not available");

  console.log(projectId, endPoint);
  return { endPoint: endPoint || "", projectId: projectId || "" };
}

const client = new Client()
  .setEndpoint(getEnvs().endPoint)
  .setProject(getEnvs().projectId);

export const account = new Account(client);

export const databases = new Databases(client);
