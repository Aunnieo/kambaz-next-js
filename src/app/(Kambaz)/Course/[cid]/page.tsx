import { redirect } from "next/navigation";
export default async function Course({
  params,
}: {
  params: Promise<{ cid: string }>;
}) {
  const { cid } = await params;
  redirect(`/Courses/${cid}/Home`);
}