import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Post not found</h1>
      <p className="text-gray-600 mb-6">We couldn't find the blog post you're looking for.</p>
      <Link href="/log" className="inline-block bg-black text-white px-4 py-2 rounded">
        Go to Blog
      </Link>
    </div>
  );
}
