export interface User {
  login: string;
  password: string;
  id: number;
  name: string;
  age?: number;
  hobbies?: string[];
  city?: string;
}
