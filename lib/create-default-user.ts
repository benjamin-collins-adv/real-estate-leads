import type { Payload } from "payload";

const DEFAULT_ADMIN_EMAIL = "prashantrayamajhi85@gmail.com";
const DEFAULT_ADMIN_PASSWORD = "Dxd@g.payload85";

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
      console.log(
        `ℹ️  Default admin user already exists: ${DEFAULT_ADMIN_EMAIL}`
      );
    }
  } catch (error) {
    console.error("❌ Error in createDefaultUser:", error);
    // Don't throw - we don't want to break the app if this fails
  }
}
