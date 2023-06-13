import { Databases, Client } from "node-appwrite";

export function getEnvs() {
  let endPoint = process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_ENDPOINT;
  let projectId = process.env.NEXT_PUBLIC_APPWRITE_PUBLIC_PROJECT_ID;
  let apiKey = process.env.APPWRITE_API_KEY;

  if (!endPoint && endPoint === "")
    throw new Error("APPWRITE_PUBLIC_ENDPOINT is not available");
  if (!projectId && projectId === "")
    throw new Error("APPWRITE_PUBLIC_PROJECT_ID is not available");

  if (!apiKey && apiKey === "")
    throw new Error("APPWRITE_API_KEY is not present");
  return {
    endPoint: endPoint || "",
    projectId: projectId || "",
    apiKey: apiKey || "",
  };
}

const client = new Client()
  .setEndpoint(getEnvs().endPoint) // Your Appwrite Endpoint
  .setProject(getEnvs().projectId) // Your project ID
  .setKey(getEnvs().apiKey); // Your secret API key

export const database = new Databases(client);
export const storage = new Databases(client);
