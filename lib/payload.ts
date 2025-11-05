import type { BlogPost } from "@/types/blog";
import type { Property } from "@/types/property";

// Payload CMS API response types
// When using S3 storage, Payload stores full S3 URLs in the url field
interface PayloadMedia {
  id: string;
  url?: string | null; // Full S3 URL when using S3 storage (e.g., https://bucket.s3.region.amazonaws.com/media/file.jpg)
  sizes?: {
    medium?: {
      url?: string | null; // Full S3 URL for resized images
    };
    thumbnail?: {
      url?: string | null;
    };
    large?: {
      url?: string | null;
    };
  };
}

interface PayloadCategory {
  id: string;
  name: string;
  slug: string;
}

interface PayloadUser {
  id: string;
  email: string;
  name?: string | null;
  avatar?: PayloadMedia | null;
}

interface PayloadTag {
  tag: string;
}

interface PayloadBlogResponse {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string | PayloadMedia; // Full S3 URL when using S3 storage
  category: string | PayloadCategory;
  author: string | PayloadUser;
  tags?: PayloadTag[];
  content: string | LexicalContent;
  publishedAt?: string | null;
  createdAt: string;
  readTime?: number | null;
  featured?: boolean;
  published?: boolean;
}

interface PayloadApiResponse<T> {
  docs: T[];
  totalDocs?: number;
  limit?: number;
  totalPages?: number;
  page?: number;
  pagingCounter?: number;
  hasPrevPage?: boolean;
  hasNextPage?: boolean;
  prevPage?: number | null;
  nextPage?: number | null;
}

interface PayloadPropertyResponse {
  id: string;
  title: string;
  slug: string;
  featuredImage: string | PayloadMedia; // Full S3 URL when using S3 storage
  gallery?: Array<{ image: string | PayloadMedia }>; // Full S3 URLs when using S3 storage
  address: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country?: string | null;
  };
  price: number;
  type: "house" | "apartment" | "condo" | "townhouse" | "land" | "commercial";
  status: "for-sale" | "for-rent" | "sold" | "rented" | "pending";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  lotSize?: number | null;
  yearBuilt?: number | null;
  parking?: number | null;
  description?: string | LexicalContent | null;
  features?: Array<{ feature: string }>;
  amenities?: Array<{ amenity: string }>;
  featured?: boolean;
  published?: boolean;
  createdAt: string;
  updatedAt: string;
  seo?: {
    title?: string | null;
    description?: string | null;
  };
}

// Lexical editor types
interface LexicalTextNode {
  type: "text";
  text: string;
  format?: number;
  style?: string;
}

interface LexicalLinkNode {
  type: "link";
  url: string;
  children?: LexicalNode[];
}

interface LexicalParagraphNode {
  type: "paragraph";
  children?: LexicalNode[];
}

interface LexicalHeadingNode {
  type: "heading";
  tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  children?: LexicalNode[];
}

interface LexicalListItemNode {
  type: "listitem";
  children?: LexicalNode[];
}

interface LexicalListNode {
  type: "list";
  listType: "bullet" | "number";
  children?: LexicalListItemNode[];
}

type LexicalNode =
  | LexicalTextNode
  | LexicalLinkNode
  | LexicalParagraphNode
  | LexicalHeadingNode
  | LexicalListNode
  | LexicalListItemNode;

interface LexicalContent {
  root: {
    children: LexicalNode[];
    direction: "ltr" | "rtl";
    format: string;
    indent: number;
    type: string;
    version: number;
  };
}

// Simple helper to get the base URL for API calls
function getBaseUrl(): string {
  if (typeof window === "undefined") {
    // Server-side: need absolute URL
    return (
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : "http://localhost:3000")
    );
  }
  // Client-side: relative URLs work fine
  return "";
}

// Simple helper to get API URL
function getApiUrl(): string {
  const base = getBaseUrl();
  return base ? `${base}/api` : "/api";
}

// Simple helper to normalize media URLs from Payload
// When using S3 storage, Payload stores full S3 URLs directly
function normalizeMediaUrl(url: string | undefined | null): string {
  if (!url) return "";

  // If it's already a full URL (S3 or any other), return as-is
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // If it's a relative path starting with /api/media/, add base URL if needed
  if (url.startsWith("/api/media/")) {
    const base = getBaseUrl();
    return base ? `${base}${url}` : url;
  }

  // If it's a relative path starting with /media/, convert to API path
  if (url.startsWith("/media/")) {
    const base = getBaseUrl();
    const apiPath = url.replace("/media/", "/api/media/");
    return base ? `${base}${apiPath}` : apiPath;
  }

  // If it's just a filename or ID, construct /api/media/ path (fallback for local storage)
  const base = getBaseUrl();
  const apiPath = url.startsWith("/") ? `/api${url}` : `/api/media/${url}`;
  return base ? `${base}${apiPath}` : apiPath;
}

// Transform Payload blog data to BlogPost format
function transformBlog(blog: PayloadBlogResponse): BlogPost {
  // Get image URL - with S3 storage, Payload returns full S3 URLs
  let imageUrl = "";
  if (blog.featuredImage) {
    if (typeof blog.featuredImage === "string") {
      // If it's a string, it could be an ID (local) or S3 URL
      imageUrl = normalizeMediaUrl(blog.featuredImage);
    } else {
      // Media object - with S3, url contains full S3 URL
      // Prefer medium size if available, otherwise use full size
      const url =
        blog.featuredImage.sizes?.medium?.url ||
        blog.featuredImage.url ||
        "";
      imageUrl = normalizeMediaUrl(url);
    }
  }

  // Get category
  const categoryName: string =
    typeof blog.category === "object" && blog.category?.name
      ? blog.category.name
      : typeof blog.category === "string"
      ? blog.category
      : "";

  // Get author
  let authorName = "";
  if (typeof blog.author === "object") {
    authorName = blog.author.name || blog.author.email || "";
  } else {
    authorName = blog.author || "";
  }

  // Get tags
  const tags = blog.tags?.map((tag: PayloadTag) => tag.tag) || [];

  // Convert Lexical content to HTML
  let contentHtml = "";
  if (blog.content) {
    if (typeof blog.content === "string") {
      contentHtml = blog.content;
    } else if (blog.content.root?.children) {
      contentHtml = convertLexicalToHTML(blog.content);
    }
  }

  return {
    id: blog.id,
    title: blog.title,
    slug: blog.slug,
    excerpt: blog.excerpt || "",
    content: contentHtml,
    author: {
      name: authorName,
      avatar:
        typeof blog.author === "object" && blog.author.avatar?.url
          ? normalizeMediaUrl(blog.author.avatar.url)
          : undefined,
    },
    publishedAt: blog.publishedAt ?? blog.createdAt ?? new Date().toISOString(),
    image: imageUrl,
    category: categoryName,
    tags: tags,
    readTime: blog.readTime ?? undefined,
  };
}

// Fetch all published blogs
export async function getBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(
      `${apiUrl}/blogs?where[published][equals]=true&limit=100&sort=-publishedAt&depth=2`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blogs");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadBlogResponse>;
    return data.docs?.map(transformBlog) || [];
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Fetch a single blog by slug
export async function getBlogBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(
      `${apiUrl}/blogs?where[slug][equals]=${slug}&where[published][equals]=true&limit=1&depth=2`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch blog");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadBlogResponse>;
    if (!data.docs || data.docs.length === 0) {
      return null;
    }

    return transformBlog(data.docs[0]);
  } catch (error) {
    console.error("Error fetching blog:", error);
    return null;
  }
}

// Fetch featured blogs
export async function getFeaturedBlogs(limit: number = 3): Promise<BlogPost[]> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(
      `${apiUrl}/blogs?where[featured][equals]=true&where[published][equals]=true&limit=${limit}&sort=-publishedAt&depth=2`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch featured blogs");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadBlogResponse>;
    return data.docs?.map(transformBlog) || [];
  } catch (error) {
    console.error("Error fetching featured blogs:", error);
    return [];
  }
}

// Type guards for Lexical nodes
function isTextNode(node: LexicalNode): node is LexicalTextNode {
  return node.type === "text";
}

function isLinkNode(node: LexicalNode): node is LexicalLinkNode {
  return node.type === "link";
}

function isParagraphNode(node: LexicalNode): node is LexicalParagraphNode {
  return node.type === "paragraph";
}

function isHeadingNode(node: LexicalNode): node is LexicalHeadingNode {
  return node.type === "heading";
}

function isListNode(node: LexicalNode): node is LexicalListNode {
  return node.type === "list";
}

function isListItemNode(node: LexicalNode): node is LexicalListItemNode {
  return node.type === "listitem";
}

// Convert Lexical editor content to HTML
function convertLexicalToHTML(lexical: LexicalContent): string {
  if (!lexical?.root?.children) return "";

  let html = "";
  for (const node of lexical.root.children) {
    if (isParagraphNode(node)) {
      html += "<p>";
      if (node.children) {
        for (const child of node.children) {
          if (isTextNode(child)) {
            html += escapeHtml(child.text);
          } else if (isLinkNode(child)) {
            html += `<a href="${child.url}">`;
            if (child.children) {
              for (const linkChild of child.children) {
                if (isTextNode(linkChild)) {
                  html += escapeHtml(linkChild.text);
                }
              }
            }
            html += "</a>";
          }
        }
      }
      html += "</p>";
    } else if (isHeadingNode(node)) {
      const tag = `h${node.tag}`;
      html += `<${tag}>`;
      if (node.children) {
        for (const child of node.children) {
          if (isTextNode(child)) {
            html += escapeHtml(child.text);
          }
        }
      }
      html += `</${tag}>`;
    } else if (isListNode(node)) {
      const listTag = node.listType === "bullet" ? "ul" : "ol";
      html += `<${listTag}>`;
      if (node.children) {
        for (const listItem of node.children) {
          if (isListItemNode(listItem)) {
            html += "<li>";
            if (listItem.children) {
              for (const child of listItem.children) {
                if (isTextNode(child)) {
                  html += escapeHtml(child.text);
                } else if (isParagraphNode(child)) {
                  if (child.children) {
                    for (const pChild of child.children) {
                      if (isTextNode(pChild)) {
                        html += escapeHtml(pChild.text);
                      }
                    }
                  }
                }
              }
            }
            html += "</li>";
          }
        }
      }
      html += `</${listTag}>`;
    }
  }
  return html;
}

function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

// Transform Payload property data to Property format
function transformProperty(property: PayloadPropertyResponse): Property {
  // Get image URL - with S3 storage, Payload returns full S3 URLs
  let imageUrl = "";
  if (property.featuredImage) {
    if (typeof property.featuredImage === "string") {
      // If it's a string, it could be an ID (local) or S3 URL
      imageUrl = normalizeMediaUrl(property.featuredImage);
    } else {
      // Media object - with S3, url contains full S3 URL
      // Prefer medium size if available, otherwise use full size
      const url =
        property.featuredImage.sizes?.medium?.url ||
        property.featuredImage.url ||
        "";
      imageUrl = normalizeMediaUrl(url);
    }
  }

  // Format address
  const addressParts = [
    property.address.street,
    property.address.city,
    property.address.state,
    property.address.zipCode,
  ];
  const address = addressParts.filter(Boolean).join(", ");

  // Convert description
  let description = "";
  if (property.description) {
    if (typeof property.description === "string") {
      description = property.description;
    } else if (property.description.root?.children) {
      description = convertLexicalToHTML(property.description);
    }
  }

  // Get features
  const features = property.features?.map((f) => f.feature) || [];

  return {
    id: property.id,
    title: property.title,
    slug: property.slug,
    address: address,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    sqft: property.sqft,
    type: property.type,
    status: property.status,
    image: imageUrl,
    description: description || undefined,
    features: features.length > 0 ? features : undefined,
    yearBuilt: property.yearBuilt ?? undefined,
    parking: property.parking ?? undefined,
  };
}

// Fetch all published properties with filters
export async function getProperties(filters?: {
  type?: string;
  status?: string;
  minPrice?: number;
  maxPrice?: number;
  bedrooms?: number;
  bathrooms?: number;
  search?: string;
  city?: string;
  state?: string;
  featured?: boolean;
}): Promise<Property[]> {
  try {
    const apiUrl = getApiUrl();
    let queryParams =
      "status=published&where[published][equals]=true&limit=100&sort=-updatedAt&depth=2";

    // Add filters
    if (filters?.type && filters.type !== "all") {
      queryParams += `&where[type][equals]=${filters.type}`;
    }
    if (filters?.status && filters.status !== "all") {
      queryParams += `&where[status][equals]=${filters.status}`;
    }
    if (filters?.featured) {
      queryParams += `&where[featured][equals]=true`;
    }
    if (filters?.minPrice !== undefined) {
      queryParams += `&where[price][greater_than_equal]=${filters.minPrice}`;
    }
    if (filters?.maxPrice !== undefined) {
      queryParams += `&where[price][less_than_equal]=${filters.maxPrice}`;
    }
    if (filters?.bedrooms !== undefined) {
      queryParams += `&where[bedrooms][equals]=${filters.bedrooms}`;
    }
    if (filters?.bathrooms !== undefined) {
      queryParams += `&where[bathrooms][equals]=${filters.bathrooms}`;
    }
    if (filters?.city) {
      queryParams += `&where[address.city][contains]=${encodeURIComponent(
        filters.city
      )}`;
    }
    if (filters?.state) {
      queryParams += `&where[address.state][contains]=${encodeURIComponent(
        filters.state
      )}`;
    }
    if (filters?.search) {
      queryParams += `&where[or][0][title][contains]=${encodeURIComponent(
        filters.search
      )}`;
      queryParams += `&where[or][1][address.street][contains]=${encodeURIComponent(
        filters.search
      )}`;
      queryParams += `&where[or][2][address.city][contains]=${encodeURIComponent(
        filters.search
      )}`;
    }

    const response = await fetch(`${apiUrl}/properties?${queryParams}`, {
      next: { revalidate: 60 },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch properties");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadPropertyResponse>;
    return data.docs?.map(transformProperty) || [];
  } catch (error) {
    console.error("Error fetching properties:", error);
    return [];
  }
}

// Fetch a single property by slug
export async function getPropertyBySlug(
  slug: string
): Promise<Property | null> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(
      `${apiUrl}/properties?status=published&where[slug][equals]=${slug}&where[published][equals]=true&limit=1&depth=2`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch property");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadPropertyResponse>;
    if (!data.docs || data.docs.length === 0) {
      return null;
    }

    return transformProperty(data.docs[0]);
  } catch (error) {
    console.error("Error fetching property:", error);
    return null;
  }
}

// Fetch featured properties
export async function getFeaturedProperties(
  limit: number = 3
): Promise<Property[]> {
  try {
    const apiUrl = getApiUrl();
    const response = await fetch(
      `${apiUrl}/properties?status=published&where[featured][equals]=true&where[published][equals]=true&limit=${limit}&sort=-updatedAt&depth=2`,
      {
        next: { revalidate: 60 },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch featured properties");
    }

    const data =
      (await response.json()) as PayloadApiResponse<PayloadPropertyResponse>;
    return data.docs?.map(transformProperty) || [];
  } catch (error) {
    console.error("Error fetching featured properties:", error);
    return [];
  }
}
