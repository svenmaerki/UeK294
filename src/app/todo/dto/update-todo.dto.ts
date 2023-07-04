import { CreateTodoDto } from './create-todo.dto';

export interface UpdateTodoDto extends Partial<CreateTodoDto> {
  id: number;
  closed: boolean;
}
