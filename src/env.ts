import { config } from "dotenv";
import { cleanEnv, str, num } from "envalid";

config();

export default cleanEnv(process.env, {
    TOKEN: str(),
    CACHE: num(),
    CONNECT: str(),
    MONGO: str({ default: "mongodb://localhost:27017/deezer" }),
});
