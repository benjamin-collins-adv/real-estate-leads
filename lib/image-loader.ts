// Custom image loader for Next.js Image component
// Handles S3 URLs and local images differently

export default function imageLoader({
  src,
  width = 200,
  quality,
}: {
  src: string;
  width: number;
  quality?: number;
}): string {
  // If it's an S3 URL (starts with https:// and contains S3 indicators), return as-is
  if (
    src.startsWith("https://") &&
    (src.includes(".s3.") ||
      src.includes("amazonaws.com") ||
      src.includes("s3") ||
      src.includes("cloudfront.net"))
  ) {
    return src;
  }

  // If it's already a full URL (but not S3), return as-is
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // For local images, use Next.js default optimization
  // This will use the Next.js Image Optimization API
  const params = new URLSearchParams();
  params.set("url", src);
  params.set("w", width.toString());
  if (quality) {
    params.set("q", quality.toString());
  }

  return `/_next/image?${params.toString()}`;
}
