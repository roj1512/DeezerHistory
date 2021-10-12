import {
  Database,
  SQLite3Connector,
  Model,
  DataTypes,
} from "https://deno.land/x/denodb/mod.ts";
import env from "./env.ts";

const connector = new SQLite3Connector({
  filepath: env.DATABASE_FILE,
});

const db = new Database(connector);

class AccessToken extends Model {
  static table = "access_tokens";

  static timestamps = true;

  static fields = {
    userId: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    accessToken: DataTypes.STRING,
  };
}

db.link([AccessToken]);

await db.sync();

export async function getAccessToken(userId: number) {
  const result = await AccessToken.where("userId", userId).all();

  if (result.length != 0) {
    return result[0].accessToken as string;
  }

  return null;
}

export async function setAccessToken(userId: number, accessToken: string) {
  if ((await getAccessToken(userId)) != null) {
    await AccessToken.where("userId", userId).update({ accessToken });
    return;
  }

  await AccessToken.create([{ userId, accessToken }]);
}
