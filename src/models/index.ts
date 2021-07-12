import { connect } from "mongoose";
import env from "../env";

export default () =>
    connect(env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true });
