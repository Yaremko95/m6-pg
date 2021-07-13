import dotenv from "dotenv";

dotenv.config();

import fs from "fs";

import { join, dirname } from "path";

import * as db from "../../utils/db/index.js";

import { fileURLToPath } from "url";

import { promisify } from "util";

const read = promisify(fs.readFile);

const currentWorkingFile = fileURLToPath(import.meta.url);

const currentWorkingDirectory = dirname(currentWorkingFile);

const sqlFilePath = join(currentWorkingDirectory, "import.sql");

const createTable = async () => {
  try {
    const data = await read(sqlFilePath);
    const sqlQueryString = data.toString();
    await db.query(sqlQueryString);
    console.info(`✅ All tables are  successfully created.`);
  } catch (e) {
    console.error(`❌ Tables are  not created.`);
    console.error(e);
  }
  db.pool.end();
};

createTable();
