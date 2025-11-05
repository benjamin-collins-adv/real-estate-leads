import type { Metadata } from "next";
import { BlogCard } from "@/components/blog-card";
import { getBlogs } from "@/lib/payload";

export const metadata: Metadata = {
  title: "Blog | Real Estate Insights & Tips",
  description:
    "Expert insights, tips, and market trends from our real estate professionals",
  openGraph: {
    title: "Blog | Real Estate Insights & Tips",
    description:
      "Expert insights, tips, and market trends from our real estate professionals",
    type: "website",
  },
};

export default async function BlogPage() {
  const blogPosts = await getBlogs();

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 md:py-12">
      <div className="mb-6 sm:mb-8 max-w-3xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-2">
          Our Blog
        </h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Expert insights, tips, and market trends from our real estate
          professionals
        </p>
      </div>

      {blogPosts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No blog posts available yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
}
