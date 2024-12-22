import { Hono } from 'hono';
import { handle } from 'hono/vercel';

import tenant from './tenant';
import building from './building';
import buildingOwner from './buildingOwner';
import houses from './houses';
import unit from './unit';
import invoice from './invoice';
import payments from './payments';

export const runtime = 'edge';

const app = new Hono().basePath('/api');
export const  route = app
.route('/tenants', tenant)
.route('/building', building)
.route('/buildingOwner', buildingOwner)
.route('/houses', houses)
.route('/invoice', invoice)
.route('/payments', payments)
.route('/unit', unit);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

// Use `app` directly for type inference
export type AppType = typeof route;



// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';

// // Importing individual route modules
// import tenant from './tenant';
// import building from './building';
// import buildingOwner from './buildingOwner';
// import houses from './houses';
// import unit from './unit';

// // Runtime definition
// export const runtime = 'edge' as const;

// // Initialize Hono instance and set the base path
// const app = new Hono().basePath('/api');

// // Define routes
// app.route('/tenants', tenant);
// app.route('/building', building);
// app.route('/buildingOwner', buildingOwner);
// app.route('/houses', houses);
// app.route('/unit', unit);

// // Export the unified handler
// const handler = handle(app);
// export default handler;







// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';
// import tenant from './tenant';
// import building from './building';
// import buildingOwner from './buildingOwner';
// import  houses from './houses';
// import  unit from './unit';

// export const runtime = 'edge';
// export const app = new Hono().basePath('/api');

// export const  route = app
// .route("/tenants", tenant )
// .route("/building", building )
// .route("/buildingOwner", buildingOwner )
// .route("/houses",houses )
// .route("/unit", unit)


// const handler = handle(app);
// export const GET = handler;
// export const POST = handler;
// export const PATCH = handler;
// export const DELETE = handler;

// export type AppType = typeof route;


// import { Hono } from 'hono';
// import { handle } from 'hono/vercel';
// import tenant from './tenant';

// export const runtime = 'edge';  // Define runtime for Vercel's Edge functions

// // Create a Hono instance with base path
// export const app = new Hono().basePath('/api');

// // Define the routes by mounting the 'tenant' module at the '/tenants' path
// const routes = app
// .route("/tenants", tenant);

// // Export handlers for GET and POST requests using the handle function
// export const GET = handle(app);
// export const POST = handle(app);

// // Export the type for the entire app, not just routes
// export type AppType = typeof app;




