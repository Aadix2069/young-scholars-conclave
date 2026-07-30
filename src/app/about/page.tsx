import { redirect } from "next/navigation";

// The single About page was split into /about/conclave, /about/fas, and
// /about/christ - this keeps old links/bookmarks to plain /about working.
export default function AboutPage() {
  redirect("/about/conclave");
}
