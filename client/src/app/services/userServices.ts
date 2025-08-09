import axios from 'axios';
import { UserBase, UserWithID, UserCreateUpdate } from '../types/user';

const API_BASE = 'http://127.0.0.1:8000/api';

export async function signIn(email: string, password: string) {
  return axios.post(`${API_BASE}/auth/login`, { email, password });
}

export async function signUp(email: string, password: string, username: string) {
  return axios.post(`${API_BASE}/users`, { email, password, username });
}