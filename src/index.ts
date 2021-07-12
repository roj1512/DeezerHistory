import bot from "./bot";
import connect from "./models";

(async () => {
    await connect();
    await bot();
})();
