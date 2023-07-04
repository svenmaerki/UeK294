export class Constants {
  static baseServerUrl = 'http://localhost:3010';
  static routes = {
    home: '',
    login: 'auth/login',
    unauthorized: 'unauthorized',
    todo: 'todo',
    todoList: 'todo/list',
    todoNew: 'todo/new',
    todoEdit: 'todo/edit/:id',
    todoEditId: (id: number) => `todo/edit/${id}`,
  };
  static auth = {
    adminRole: 'admin',
  };
  static todo = {
    displayedColumns: ['id', 'title', 'description', 'closed', 'functions'],
  };
}
