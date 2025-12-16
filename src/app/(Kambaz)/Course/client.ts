import axios from "axios";

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;

/* ================================
   COURSES
   ================================ */

// GET all courses (faculty)
export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data;
};

// GET current user's courses
export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(
    `${USERS_API}/current/courses`
  );
  return data.map((course: any) => ({
    ...course,
    cid: course._id,
  }));
};

// CREATE course (FACULTY)
export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(
    `${USERS_API}/current/courses`,
    course
  );
  return {
    ...data,
    cid: data._id,
  };
};

// UPDATE course
export const updateCourse = async (course: any) => {
  await axiosWithCredentials.put(
    `${COURSES_API}/${course.cid}`,
    course
  );
  return course;
};

// DELETE course
export const deleteCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`
  );
};

/* ================================
   MODULES
   ================================ */

export const findModulesForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: any
) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return data;
};

const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
  return data;
};

export const updateModule = async (module: any) => {
  const { data } = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return data;
};
