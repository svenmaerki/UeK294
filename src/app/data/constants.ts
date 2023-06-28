export class Constants {
  static baseServerUrl = 'http://localhost:3010';
  static routes = {
    home: '',
    login: 'auth/login',
    unauthorized: 'unauthorized',
    todoList: 'todo',
    todoNew: 'todo/new',
    todoEdit: 'todo/edit/:id',
  };
}
