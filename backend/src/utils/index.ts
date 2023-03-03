import TraineeCollection from "../db/models/trainee";
import { Trainee } from "../types/trainee";

export const generateId = async (collection: typeof TraineeCollection) => {
  const lastId = (await collection
    .find({})
    .sort({ _id: -1 })
    .limit(1)) as Trainee[];

  //! Sample ID: YYMM0001

  const currentMonth = ("0" + (new Date().getMonth() + 1)).slice(-2);
  const currentYear = new Date().getFullYear().toString().slice(-2);

  if (
    lastId[0] &&
    currentYear + currentMonth ===
      lastId[0].traineeId.toString().substring(0, 4)
  ) {
    return Number(
      `${currentYear}${currentMonth}${(
        "0" +
        (Number(lastId[0].traineeId) + 1)
      ).slice(-4)}`
    );
  } else {
    return Number(`${currentYear}${currentMonth}0001`);
  }
};
