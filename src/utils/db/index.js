import pg from "pg";

export const pool = new pg.Pool();

export async function query(text, params) {
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  console.info("🕒 Query  executed in ", duration, " ms.");
  return res;
}
