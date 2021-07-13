import { Router } from "express";
import db from "../../utils/db/index.js";
const router = Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const query = "SELECT * FROM tutors ORDER BY created_at DESC";
      const data = await db.query(query);
      res.send(data.rows);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const { name, lastname, expertise } = req.body;
      const query = `INSERT INTO tutors (name, lastname, expertise) VALUES('${name}', '${lastname}', '${expertise}') RETURNING *`;
      const data = await db.query(query);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router.route("/modules").get(async (req, res, next) => {
  try {
    const query = `select t.name, t.lastname, t.expertise , COALESCE (tutor_module.module, '[]') as module from tutors as t
   left join lateral (
                       select  json_agg(json_build_object(
                                                   'module_id', tm.module_id,
                                                   'name', m.name
                                                   )) as module
                       from tutor_modules as tm 
                       join modules as m
                       on m.module_id=tm.module_id
                       where tm.tutor_id=t.tutor_id
                       )  as tutor_module  on true 
                       `;
    const data = await db.query(query);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const query = `SELECT * FROM tutors WHERE tutor_id=${req.params.id}`;
      const data = await db.query(query);
      res.send(data.rows[0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const query = `DELETE FROM tutors WHERE tutor_id=${req.params.id}`;
      const data = await db.query(query);
      if (data.rowCount > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const { name, lastname, expertise } = req.body;
      const fields = Object.keys(req.body) // get arr of properties in the body -> ['name', 'lastname', 'expertise']
        .map((key) => `${key}='${req.body[key]}'`) // ->  name='${name}'
        .join(", "); // name='${name}', lastname='${lastname}', expertise='${expertise}'

      const query = `UPDATE tutors SET ${fields} WHERE tutor_id=${req.params.id} RETURNING * `;
      console.log(query);
      const data = await db.query(query);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;
