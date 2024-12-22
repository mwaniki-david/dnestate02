import { db } from "@/db/drizzle";
import { tenant, insertTenantSchema } from "@/db/schema";
import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorised" }, 401);
    }
    const data = await db
      .select({
        id: tenant.id,
        name: tenant.name,
        phoneNo: tenant.phoneNo,
        rentalAmount: tenant.rentalAmount,
        unitType: tenant.unitType,
        buildingName: tenant.buildingName,
      })
      .from(tenant)
      .where(eq(tenant.userId, auth.userId));

    return c.json({ data });
  })
  .get(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    clerkMiddleware(),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }
      if (!id) {
        return c.json({ error: "Unauthorised" }, 401);
      }
      const [data] = await db
        .select({
          id: tenant.id,
          name: tenant.name,
          phoneNo: tenant.phoneNo,
          rentalAmount: tenant.rentalAmount,
          unitType: tenant.unitType,
          buildingName: tenant.buildingName,
          unitName: tenant.unitName,
        })
        .from(tenant)
        .where(and(eq(tenant.userId, auth?.userId), eq(tenant.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 401);
      }

      return c.json({ data });
    }
  )
 
  
  .post(
    "/bulk-delete",
    clerkMiddleware(),
    zValidator(
      "json",
      z.object({
        ids: z.array(z.string()),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const data = await db
        .delete(tenant)
        .where(
          and(eq(tenant.userId, auth.userId), inArray(tenant.id, values.ids))
        )
        .returning({
          id: tenant.id,
        });
      return c.json({ data });
    }
  )

  .patch(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      insertTenantSchema.pick({
        name: true,
        phoneNo: true,
        rentalAmount: true,
        unitType: true,
        buildingName: true,
        unitName: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const [data] = await db
        .update(tenant)
        .set(values)
        .where(and(eq(tenant.userId, auth.userId), eq(tenant.id, id)))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  )



  .delete(
    "/:id",
    clerkMiddleware(),
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }

      const [data] = await db
        .delete(tenant)
        .where(and(eq(tenant.userId, auth.userId), eq(tenant.id, id)))
        .returning({
          id: tenant.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;
