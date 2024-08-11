import { Pinecone } from "@pinecone-database/pinecone";

if (!process.env.PINECONE_OPEN_API_KEY) {
  throw new Error("Pine code api key is not set");
}

const pc = new Pinecone({ apiKey: process.env.PINECONE_OPEN_API_KEY });

export default pc;
