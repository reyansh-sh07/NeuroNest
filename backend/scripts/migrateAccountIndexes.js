import "dotenv/config";
import mongoose from "mongoose";
import { User } from "../models/User.js";

// One-time fix for existing databases. Run once:  npm run migrate:accounts
// 1) removes the stored `patientConnectionCode: null` from doctors
// 2) drops the old single-field unique indexes (email_1, patientConnectionCode_1)
// 3) builds the new ones declared in models/User.js
const run = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  const unset = await User.collection.updateMany(
    { patientConnectionCode: null },
    { $unset: { patientConnectionCode: "" } },
  );
  console.log(`Cleared null connection codes on ${unset.modifiedCount} account(s)`);

  for (const name of ["email_1", "patientConnectionCode_1"]) {
    try {
      await User.collection.dropIndex(name);
      console.log(`Dropped old index ${name}`);
    } catch (error) {
      console.log(`Index ${name} not present (${error.codeName || error.message})`);
    }
  }

  await User.syncIndexes();
  console.log("Indexes now:", (await User.collection.indexes()).map((i) => i.name).join(", "));
  await mongoose.disconnect();
};

run().catch((error) => {
  console.error("Migration failed:", error.message);
  process.exit(1);
});
