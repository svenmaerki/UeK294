import { CreateTodoDto } from './create-todo.dto';

export interface UpdateTodoDto extends CreateTodoDto {
  id: number;
  closed: boolean;
}
