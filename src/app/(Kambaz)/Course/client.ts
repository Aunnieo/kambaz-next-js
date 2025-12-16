import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;

const axiosWithCredentials = axios.create({
  withCredentials: true,
});

export const fetchAllCourses = async () => {
  const { data } = await axiosWithCredentials.get(COURSES_API);
  return data.map((course: any) => ({
    ...course,
    cid: course._id,
  }));
};

export const findMyCourses = async () => {
  const response = await axiosWithCredentials.get(COURSES_API);
  return response.data.map((course: any) => ({
    ...course,
    cid: course._id,
  }));
};

export const createCourse = async (course: any) => {
  const response = await axiosWithCredentials.post(
    COURSES_API,
    course
  );
  return {
    ...response.data,
    cid: response.data._id,
  };
};

export const deleteCourse = async (courseId: string) => {
  await axiosWithCredentials.delete(
    `${COURSES_API}/${courseId}`
  );
};

export const updateCourse = async (course: any) => {
  const response = await axiosWithCredentials.put(
    `${COURSES_API}/${course.cid}`,
    course
  );
  return {
    ...response.data,
    cid: response.data._id,
  };
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(
    `${COURSES_API}/${courseId}/modules`
  );
  return response.data;
};

export const createModuleForCourse = async (
  courseId: string,
  module: any
) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};
/* ================================
   MODULE-SCOPED ROUTES
   ================================ */

const MODULES_API = `${HTTP_SERVER}/api/modules`;

export const deleteModule = async (moduleId: string) => {
  await axiosWithCredentials.delete(
    `${MODULES_API}/${moduleId}`
  );
};

export const updateModule = async (module: any) => {
  const response = await axiosWithCredentials.put(
    `${MODULES_API}/${module._id}`,
    module
  );
  return response.data;
};
