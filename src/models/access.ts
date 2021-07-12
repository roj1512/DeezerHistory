import { model } from "mongoose";
import { Schema } from "mongoose";

interface IAccess {
    userId: number;
    access: string;
}

const schema = new Schema<IAccess>({
    userId: {
        type: Number,
        unique: true,
    },
    access: {
        type: String,
        required: true,
    },
});

const Access = model("access", schema);

export const setAccess = (userId: number, access: string) =>
    new Access({ userId, access }).save();

export const getAccess = async (userId: number) => {
    const r = await Access.findOne({ userId }).exec();
    return r;
};
