import { Injectable } from '@nestjs/common';
import { Todo } from './interfaces/app.todo.interface';
import { HttpStatus, HttpException } from '@nestjs/common';

@Injectable()
export class AppService {
  private todos: Todo[] = [];

  private throwError(errorMsg) {
    throw new HttpException({
      status: HttpStatus.FORBIDDEN,
      error: errorMsg,
    }, 403);
  }

  async getAllTodos(type): Promise<Todo[]> {
    if (type !== 'all' && type !== 'active' && type !== 'done') {
      this.throwError('Please provide a valid todo type: all, active, done');
    }
    if (type === 'all') {
      return this.todos;
    }
    return this.todos.filter(todo => type === 'active' ? todo.done === false : todo.done === true);
  }

  async createTodo(todo: Todo) {
    const todoSameid = this.todos.filter(t => todo.id === t.id);
    if (todoSameid && todoSameid.length > 0) {
      this.throwError('A todo item with id: ' + todo.id + ' already exists');
    }
    this.todos.push(todo);
  }

  async updateTodo(todo: Todo, todoid: string) {
    const todoindex = this.todos.map(t => t.id).indexOf(todoid);
    if (todoindex < 0) {
      this.throwError('A todo item with id: ' + todoid + ' can not be found');
    }
    this.todos[todoindex] = todo;
  }

  async deleteTodo(todoid: string) {
    const todoindex = this.todos.map(t => t.id).indexOf(todoid);
    if (todoindex < 0) {
      this.throwError('A todo item with id: ' + todoid + ' can not be found');
    }
    this.todos = this.todos.filter(t => t.id !== todoid);
  }

  validateTodo(todo) {
    if (!todo || !todo.id || todo.id === '' || !todo.todo || todo.todo === '' || todo.done === null) {
      this.throwError('Please provide a valid todo item');
    }
  }
}
