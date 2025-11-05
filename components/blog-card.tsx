import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { BlogPost } from "@/types/blog";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg h-full flex flex-col pt-0">
      <Link href={`/blog/${post.slug}`}>
        <div
          className={`relative w-full overflow-hidden ${
            featured ? "h-48 sm:h-56 md:h-64" : "h-40 sm:h-48"
          }`}
        >
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
          />
          <Badge
            className="absolute top-3 left-3 sm:top-4 sm:left-4 text-xs"
            variant="secondary"
          >
            {post.category}
          </Badge>
        </div>
      </Link>

      <CardHeader className="flex-1">
        <Link href={`/blog/${post.slug}`}>
          <h3
            className={`font-semibold group-hover:text-primary transition-colors mb-2 line-clamp-2 ${
              featured ? "text-lg sm:text-xl" : "text-base sm:text-lg"
            }`}
          >
            {post.title}
          </h3>
        </Link>
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span className="whitespace-nowrap">
              {formatDate(post.publishedAt)}
            </span>
          </div>
          {post.readTime && (
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{post.readTime} min read</span>
            </div>
          )}
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Link
          href={`/blog/${post.slug}`}
          className="flex items-center gap-2 text-xs sm:text-sm font-medium text-primary hover:gap-3 transition-all"
        >
          Read More
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </Link>
      </CardFooter>
    </Card>
  );
}
