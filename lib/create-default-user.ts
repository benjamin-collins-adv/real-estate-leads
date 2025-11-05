import type { Payload } from "payload";

const DEFAULT_ADMIN_EMAIL = "prashantrayamajhi85@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "Dxd@g.payload85";

/**
 * Ensures enum values exist in the database
 * This runs automatically on startup BEFORE schema sync to prevent errors
 */
export async function ensureEnumValues(payload: Payload): Promise<void> {
  try {
    const enumValues = ['for-sale', 'for-rent', 'sold', 'rented', 'pending'];
    const enumTypes = ['enum_properties_status', 'enum__properties_v_version_status'];

    // Get the database pool from Payload
    const pool = (payload.db as any).pool;
    if (!pool) {
      return; // Pool not available, skip
    }

    // Execute SQL for each enum type and value
    for (const enumType of enumTypes) {
      for (const enumValue of enumValues) {
        try {
          await pool.query(`
            DO $$ 
            BEGIN 
              IF EXISTS (SELECT 1 FROM pg_type WHERE typname = $1)
              AND NOT EXISTS (
                SELECT 1 FROM pg_enum 
                WHERE enumlabel = $2 
                AND enumtypid = (SELECT oid FROM pg_type WHERE typname = $1)
              ) THEN
                EXECUTE format('ALTER TYPE %I ADD VALUE %L', $1, $2);
              END IF;
            END $$;
          `, [enumType, enumValue]);
        } catch (error) {
          // Ignore errors - enum might not exist yet or value might already exist
        }
      }
    }
  } catch (error) {
    // Silently fail - enum migration is not critical for startup
  }
}

/**
 * Function to automatically create default admin user in production
 * Only runs if the user doesn't already exist
 */
export async function createDefaultUser(payload: Payload): Promise<void> {
  try {
    // Only create default user in production
    if (process.env.NODE_ENV !== "production") {
      return;
    }

    // Check if user already exists
    const existingUsers = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: DEFAULT_ADMIN_EMAIL,
        },
      },
      limit: 1,
    });

    // If user doesn't exist, create it
    if (existingUsers.docs.length === 0) {
      await payload.create({
        collection: "users",
        data: {
          email: DEFAULT_ADMIN_EMAIL,
          password: DEFAULT_ADMIN_PASSWORD,
          name: "Prashant Rayamajhi",
        },
        overrideAccess: true, // Bypass access controls for initial user creation
      });
      console.log(`✅ Default admin user created: ${DEFAULT_ADMIN_EMAIL}`);
    } else {
      console.log(`ℹ️  Default admin user already exists: ${DEFAULT_ADMIN_EMAIL}`);
    }
  } catch (error) {
    console.error("❌ Error in createDefaultUser:", error);
    // Don't throw - we don't want to break the app if this fails
  }
}

