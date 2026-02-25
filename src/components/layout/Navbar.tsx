import { getAllPublishedCourses } from "@/lib/db";
import NavbarClient from "./NavbarClient";

export default async function Navbar() {
  const courses = await getAllPublishedCourses();
  const featuredCourses = courses;
  return <NavbarClient featuredCourses={featuredCourses} />;
}
