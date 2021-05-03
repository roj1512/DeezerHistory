import { Composer } from "telegraf";

export default Composer.catch(async (err, ctx) => {
  console.log(err);
});
