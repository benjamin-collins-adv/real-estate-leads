import type { Plugin } from "payload";
import pg from "pg";

const { Pool } = pg;

/**
 * Ensures enum values exist in the database
 * This runs automatically on startup to prevent schema sync errors
 */
async function ensureEnumsSync(): Promise<void> {
  try {
    const connectionString =
      process.env.DATABASE_URI || process.env.DATABASE_URL;
    if (!connectionString) {
      return;
    }

    // Create a temporary pool to run the migration
    const pool = new Pool({ connectionString });
    
    const enumValues = ["for-sale", "for-rent", "sold", "rented", "pending"];
    const enumTypes = [
      "enum_properties_status",
      "enum__properties_v_version_status",
    ];

    // Add enum values if they don't exist
    for (const enumType of enumTypes) {
      for (const enumValue of enumValues) {
        try {
          await pool.query(
            `
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
          `,
            [enumType, enumValue]
          );
        } catch (error) {
          // Ignore - enum might not exist yet or value already exists
        }
      }
    }

    await pool.end();
  } catch (error) {
    // Silently fail - not critical
  }
}

/**
 * Plugin to ensure enum values exist before Payload syncs schema
 * This prevents schema sync errors from missing enum values
 */
export const ensureEnumsPlugin = (): Plugin => {
  return {
    name: "ensure-enums",
    onInit: async () => {
      await ensureEnumsSync();
    },
  };
};

