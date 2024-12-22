import { relations } from 'drizzle-orm';
import { pgTable, text, varchar, numeric, timestamp, serial } from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
// Define the table with correct schema and column names
export const tenant = pgTable(
  'tenant',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),        // Ensure proper casing: 'Name' should be 'name'
    userId: text('user_id').notNull(),   // Correct 'user_od' to 'user_id'
    unitName: text('unit_name'),
    phoneNo: text('phone_no').notNull(),
    buildingName: text("building_name").notNull(),
    unitType: text('unit_type').notNull(),
    rentalAmount: text('rentalamount').notNull(),
  });
export const insertTenantSchema = createInsertSchema(tenant)

export const tenantRelations = relations(tenant, ({ one }) => ({
	building: one(building, {
		fields: [tenant.buildingName],
		references: [building.name],
	}),
}));

export const building = pgTable(
  'building',
  {
    id: text('id').primaryKey(),         // Primary key column 'id'
    name: text("name").notNull().unique(),        // Name of the building, cannot be null
    userId: text('user_id').notNull(),   // User ID, cannot be null

    // New fields
    floors: text('floors').notNull(),                // Number of floors, integer type, cannot be null
    ownersName: text('owners_name').notNull().default('Unknown'),          // Owner's name, text type, cannot be null
    ownersPhoneNo: text('owners_phone_no').notNull(),   // Owner's phone number, text type, cannot be null
    location: text('location').notNull().default('Unknown'),               // Location of the building, text type, cannot be null
    buildingUnits: text('building_units').notNull(), // Number of building units, integer type, cannot be null
  }
);

export const insertBuildingSchema = createInsertSchema(building);

export const buildingRelations = relations(building, ({ many }) => ({
  tenants: many(tenant),
}));

export const buildingOwner = pgTable(
  'buildingOwner',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),        // Ensure proper casing: 'Name' should be 'name'
    userId: text('user_id').notNull(),
    phoneNo: text('phone_no').notNull(),
    buildingName: text('building_name').notNull(),
  });
export const insertbuildingOwnerSchema = createInsertSchema(buildingOwner)


export const houses = pgTable(
  'houses',
  {
    id: text('id').primaryKey(),
    userId: text('user_id').notNull(),   // Correct 'user_od' to 'user_id'
    houseName: text('unit_name'),
    phoneNo: text('phone_no').notNull(),
    buildingName: text('building_name'),
    unitType: text('unit_type').notNull(),
    rentalAmount: text('rentalamount').notNull(),
  });
export const insertHousesSchema = createInsertSchema(houses)

export const unit = pgTable(
  'unit',
  {
    id: text('id').primaryKey(),
    name: text('name').notNull(),        // Ensure proper casing: 'Name' should be 'name'
    userId: text('user_id').notNull(),
    phoneNo: text('phone_no').notNull(),
    buildingName: text('building_name').notNull(),
  });
export const inserUnitrSchema = createInsertSchema(unit)

export const invoice = pgTable("invoice", {
  id: varchar("id", { length: 255 }).primaryKey(),
  userId: varchar("user_id", { length: 255 }).notNull(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  amount: numeric("amount").notNull(),
  dueDate: timestamp("due_date").notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
});

export const insertInvoiceSchema = z.object({
  customerName: z.string(),
  amount: z.string(), // Since 'numeric' is stored as a string in PostgreSQL
  dueDate: z.string(), // Dates as ISO strings
  status: z.string().optional(),
});

export const inserInvoiceSchema = createInsertSchema(invoice)

export const payments = pgTable('payments', {
  id: serial('id').primaryKey(),
  phoneNumber: varchar('phone_number', { length: 15 }).notNull(),
  amount: numeric('amount').notNull(),
  tillNumber: varchar('till_number', { length: 15 }).notNull(),
  status: varchar('status', { length: 50 }).default('pending'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
});


export const inserpaymentsSchema = createInsertSchema(payments)


// import { pgTable, text, integer, foreignKey, serial } from 'drizzle-orm/pg-core';

// // BuildingOwner table
// export const buildingOwner = pgTable('building_owner', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   phoneNo: text('phone_no').notNull(),
//   email: text('email').notNull(),
// });

// // Building table
// export const building = pgTable('building', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull().unique(),         // Building name, unique to avoid duplicates
//   location: text('location').notNull(),
//   ownerId: integer('owner_id').notNull(),         // Foreign key to buildingOwner
// }, (table) => ({
//   ownerFk: foreignKey({
//     name: "building_owner_fk",
//     columns: [table.ownerId],
//     foreignColumns: [buildingOwner.id],
//   })
//     .onDelete('cascade')
//     .onUpdate('cascade')
// }));

// // Houses table
// export const house = pgTable('house', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   buildingId: integer('building_id').notNull(),  // Foreign key to building
// }, (table) => ({
//   buildingFk: foreignKey({
//     name: "building_house_fk",
//     columns: [table.buildingId],
//     foreignColumns: [building.id],
//   })
//     .onDelete('cascade')
//     .onUpdate('cascade')
// }));

// // Units table
// export const unit = pgTable('unit', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   unitType: text('unit_type').notNull(),
//   houseId: integer('house_id').notNull(),        // Foreign key to house
// }, (table) => ({
//   houseFk: foreignKey({
//     name: "house_unit_fk",
//     columns: [table.houseId],
//     foreignColumns: [house.id],
//   })
//     .onDelete('cascade')
//     .onUpdate('cascade')
// }));

// // Tenant table
// export const tenant = pgTable('tenant', {
//   id: serial('id').primaryKey(),
//   name: text('name').notNull(),
//   phoneNo: text('phone_no').notNull(),
//   buildingName: text('building_name').notNull(), // Linked to building.name
//   rentalAmount: integer('rental_amount').notNull(),
//   unitName: text('unit_name').notNull(),         // Linked to unit.name
//   unitType: text('unit_type').notNull(),
// }, (table) => ({
//   buildingFk: foreignKey({
//     name: "tenant_building_fk",
//     columns: [table.buildingName],
//     foreignColumns: [building.name],
//   })
//     .onDelete('cascade')
//     .onUpdate('cascade'),
//   unitFk: foreignKey({
//     name: "tenant_unit_fk",
//     columns: [table.unitName],
//     foreignColumns: [unit.name],
//   })
//     .onDelete('cascade')
//     .onUpdate('cascade')
// }));

