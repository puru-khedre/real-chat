import { Client, Account, Databases } from "appwrite";

function getEnvs() {
  let endPoint = process.env.APPWRITE_PUBLIC_ENDPOINT;
  let projectId = process.env.APPWRITE_PUBLIC_PROJECT_ID;

  if (!endPoint && endPoint === "")
    throw new Error("APPWRITE_PUBLIC_ENDPOINT is not available");
  if (!projectId && projectId === "")
    throw new Error("APPWRITE_PUBLIC_PROJECT_ID is not available");

  console.log(endPoint, projectId);
  return { endPoint: endPoint || "", projectId: projectId || "" };
}

const client = new Client()
  .setEndpoint(getEnvs().endPoint)
  .setProject(getEnvs().projectId);

export const account = new Account(client);
export const databases = new Databases(client);
