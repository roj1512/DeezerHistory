import mongodb from "mongodb";
import { dbUri } from "./config";

const client = new mongodb.MongoClient(dbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var access: mongodb.Collection;
export const getAccess = async (userId: number): Promise<string> => {
  const find = await access.findOne({ user_id: userId });
  if (!find) return "";
  else return find["access"];
};
export const setAccess = async (
  userId: number,
  _access: string
): Promise<void> => {
  await access.updateOne(
    { user_id: userId },
    { $set: { access: _access } },
    { upsert: true }
  );
};
(async () => {
  await client.connect();
  access = client.db("deezer_history").collection("access");
})();
