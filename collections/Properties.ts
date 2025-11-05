import type { CollectionConfig } from "payload";

export const Properties: CollectionConfig = {
  slug: "properties",
  admin: {
    useAsTitle: "title",
    defaultColumns: [
      "title",
      "address",
      "price",
      "type",
      "status",
      "updatedAt",
    ],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
      admin: {
        description: "URL-friendly version of the title",
      },
      hooks: {
        beforeValidate: [
          ({ value, data }) => {
            if (data?.title && !value) {
              return data.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/(^-|-$)/g, "");
            }
            return value;
          },
        ],
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
      required: true,
    },
    {
      name: "gallery",
      type: "array",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
          required: true,
        },
      ],
    },
    {
      name: "address",
      type: "group",
      fields: [
        {
          name: "street",
          type: "text",
          required: true,
        },
        {
          name: "city",
          type: "text",
          required: true,
        },
        {
          name: "state",
          type: "text",
          required: true,
        },
        {
          name: "zipCode",
          type: "text",
          required: true,
        },
        {
          name: "country",
          type: "text",
          defaultValue: "Australia",
        },
      ],
    },
    {
      name: "price",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "type",
      type: "select",
      required: true,
      options: [
        { label: "House", value: "house" },
        { label: "Apartment", value: "apartment" },
        { label: "Condo", value: "condo" },
        { label: "Townhouse", value: "townhouse" },
        { label: "Land", value: "land" },
        { label: "Commercial", value: "commercial" },
      ],
    },
    {
      name: "status",
      type: "select",
      required: true,
      options: [
        { label: "For Sale", value: "for-sale" },
        { label: "For Rent", value: "for-rent" },
        { label: "Sold", value: "sold" },
        { label: "Rented", value: "rented" },
        { label: "Pending", value: "pending" },
      ],
    },
    {
      name: "bedrooms",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "bathrooms",
      type: "number",
      required: true,
      min: 0,
    },
    {
      name: "sqft",
      type: "number",
      required: true,
      min: 0,
      admin: {
        description: "Square footage",
      },
    },
    {
      name: "lotSize",
      type: "number",
      min: 0,
      admin: {
        description: "Lot size in square feet",
      },
    },
    {
      name: "yearBuilt",
      type: "number",
      admin: {
        description: "Year the property was built",
      },
      validate: (value: number | undefined | null) => {
        if (value === undefined || value === null) return true; // Optional field
        const currentYear = new Date().getFullYear();
        if (value < 1800 || value > currentYear + 1) {
          return `Year Built must be between 1800 and ${currentYear + 1}`;
        }
        return true;
      },
    },
    {
      name: "parking",
      type: "number",
      min: 0,
      admin: {
        description: "Number of parking spaces",
      },
    },
    {
      name: "description",
      type: "richText",
    },
    {
      name: "features",
      type: "array",
      fields: [
        {
          name: "feature",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "amenities",
      type: "array",
      fields: [
        {
          name: "amenity",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Feature this property on the homepage",
      },
    },
    {
      name: "published",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description: "Publish this property",
      },
    },
    {
      name: "seo",
      type: "group",
      fields: [
        {
          name: "title",
          type: "text",
          admin: {
            description: "SEO title (leave empty to use property title)",
          },
        },
        {
          name: "description",
          type: "textarea",
          admin: {
            description: "SEO meta description",
          },
        },
      ],
    },
  ],
  versions: {
    drafts: true,
  },
};
