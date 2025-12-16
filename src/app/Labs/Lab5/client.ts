import axios from "axios";

const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;


export const fetchWelcomeMessage = async () => {
  const response = await axios.get(`${HTTP_SERVER}/lab5/welcome`);
  return response.data; // string
};


const ASSIGNMENT_API = `${HTTP_SERVER}/lab5/assignment`;

export const fetchAssignment = async () => {
  const response = await axios.get(ASSIGNMENT_API);
  return response.data; // object
};

export const updateTitle = async (title: string) => {
  const response = await axios.get(`${ASSIGNMENT_API}/title/${title}`);
  return response.data; // updated assignment object
};

const TODOS_API = `${HTTP_SERVER}/lab5/todos`;


export const fetchTodos = async () => {
  const response = await axios.get(TODOS_API);
  return response.data; // array
};


export const createNewTodo = async () => {
  const response = await axios.get(`${TODOS_API}/create`);
  return response.data; // array
};


export const postNewTodo = async (todo: any) => {
  const response = await axios.post(TODOS_API, todo);
  return response.data; // single todo object
};


export const removeTodo = async (todo: any) => {
  const response = await axios.get(`${TODOS_API}/${todo.id}/delete`);
  return response.data; // array
};


export const deleteTodo = async (todo: any) => {
  await axios.delete(`${TODOS_API}/${todo.id}`);
};


export const updateTodo = async (todo: any) => {
  await axios.put(`${TODOS_API}/${todo.id}`, todo);
};
