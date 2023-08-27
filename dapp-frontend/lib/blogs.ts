import "server-only";

//Dynamic rendering with no cache
export async function getBlogs() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs`, {
      cache: "no-store",  // force-cache option for static rendering
    });
    return res.json();
  } catch (error: any) {
    console.warn(error.toString());
  }
}

//ISR
export async function getBlog(blogId: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_ENDPOINT}/blogs/${blogId}`,
      { next: { revalidate: 5 } }
    );
    return res.json();
  } catch (error: any) {
    console.warn(error.toString());
  }
}
