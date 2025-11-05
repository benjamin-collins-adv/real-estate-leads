import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'email',
  },
  auth: {
    tokenExpiration: 7200, // 2 hours
    verify: false, // Disable email verification (optional)
    forgotPassword: {
      generateEmailSubject: () => 'Reset your password',
      generateEmailHTML: (args?: { token?: string; user?: any }) => {
        const token = args?.token || '';
        return `
          <h1>Reset your password</h1>
          <p>Click the link below to reset your password:</p>
          <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/reset-password?token=${token}">Reset Password</a>
        `
      },
    },
  },
  access: {
    create: ({ req: { user } }) => {
      // Only the default admin user can create other users
      if (user && user.email === "prashantrayamajhi85@gmail.com") {
        return true;
      }
      return false;
    },
    read: () => true, // Allow reading user data
    update: ({ req: { user } }) => {
      // Users can update their own data, admins can update anyone
      if (user) {
        if (user.role === "admin") {
          return true; // Admins can update anyone
        }
        return {
          id: {
            equals: user.id,
          },
        };
      }
      return false;
    },
    delete: ({ req: { user } }) => {
      // Only the default admin user can delete users
      if (user && user.email === "prashantrayamajhi85@gmail.com") {
        return true;
      }
      return false;
    },
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      admin: {
        description: 'Full name of the user',
      },
    },
  ],
}
