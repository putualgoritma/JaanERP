import { options } from "./options";
import nextauth from "next-auth";

const handler = nextauth(options);
export { handler as GET, handler as POST };
