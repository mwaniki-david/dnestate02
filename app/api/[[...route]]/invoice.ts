import { db } from "@/db/drizzle";
import { createId } from "@paralleldrive/cuid2";
import { getAuth, clerkMiddleware } from "@hono/clerk-auth";
import { zValidator } from "@hono/zod-validator";
import { and, eq, inArray } from "drizzle-orm";
import { Hono } from "hono";
import { z } from "zod";
import { insertInvoiceSchema, invoice } from "@/db/schema";

const app = new Hono()
  .get("/", clerkMiddleware(), async (c) => {
    const auth = getAuth(c);

    if (!auth?.userId) {
      return c.json({ error: "Unauthorised" }, 401);
    }
    const data = await db
      .select({
          id:invoice.id,
          userId:invoice.userId,
          customerName:invoice.customerName,
          amount: invoice.amount,
          dueDate:invoice.dueDate,
          status:invoice.status,
      })
      .from(invoice)
      .where(eq(invoice.userId, auth.userId));

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
          
          customerName:invoice.customerName,
          amount: invoice.amount,
          dueDate:invoice.dueDate,
          status:invoice.status,
        })
        .from(invoice)
        .where(and(eq(invoice.userId, auth?.userId), eq(invoice.id, id)));

      if (!data) {
        return c.json({ error: "Not found" }, 401);
      }

      return c.json({ data });
    }
  )

  .post(
    "/",
    clerkMiddleware(),
    zValidator(
      "json",
      insertInvoiceSchema.pick({
        customerName: true,
        amount: true,
        dueDate: true,
        status: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const values = c.req.valid("json");
  
      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }
  
      // Convert dueDate string to Date before insertion
      const dueDate = new Date(values.dueDate);
  
      const [data] = await db
        .insert(invoice)
        .values({
          id: createId(), // Auto-generate the ID
          userId: auth.userId,
          ...values,
          dueDate, // Override the dueDate with the Date object
        })
        .returning();
  
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
        .delete(invoice)
        .where(
          and(
            eq(invoice.userId, auth.userId),
            inArray(invoice.id, values.ids)
          )
        )
        .returning({
          id: invoice.id,
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
        id: z.string(), // Ensure id is required
      })
    ),
    zValidator(
      "json",
      insertInvoiceSchema.pick({
        customerName: true,
        amount: true,
        dueDate: true,
        status: true,
      })
    ),
    async (c) => {
      const auth = getAuth(c);
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");
  
      if (!auth?.userId) {
        return c.json({ error: "Unauthorised" }, 401);
      }
  
      // Convert dueDate to Date for the database
      const dueDate = new Date(values.dueDate);
  
      const [data] = await db
        .update(invoice)
        .set({
          ...values,
          dueDate, // Use the Date object
        })
        .where(and(eq(invoice.userId, auth.userId), eq(invoice.id, id)))
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
        .delete(invoice)
        .where(and(eq(invoice.userId, auth.userId), eq(invoice.id, id)))
        .returning({
          id: invoice.id,
        });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ data });
    }
  );

export default app;