import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpCode, HttpStatus, HttpException } from '@nestjs/common';
import { AppService } from './app.service';
import { AppUtil } from './app.util';
import { Todo } from './interfaces/app.todo.interface';
import { TodoDto } from './dto/app.todo.dto';

@Controller('/roamcodetest/api/v1/todo')
export class AppController {
  constructor(private readonly appService: AppService, private readonly appUtil: AppUtil) {}

  /*
  * @oas [get] /roamcodetest/api/v1/todo/type
  * description: Get todos based on the filtering type
  * parameters:
  * - (path) type {String} Todo type: all, active, done
  */
  @Get(':type')
  async getAllTodos(@Param('type') type): Promise<Todo[]> {
    this.appUtil.validateParam(type);
    return await this.appService.getAllTodos(type);
  }

  /*
  * @oas [post] /roamcodetest/api/v1/todo
  * description: Insert todo
  * parameters:
  *   - (body) req.body {object} Insert Object
  */
  @Post()
  async createTodo(@Body() todoDto: TodoDto) {
    this.appService.validateTodo(todoDto);
    await this.appService.createTodo(todoDto);
  }

  /*
  * @oas [put] /roamcodetest/api/v1/todo/:id
  * description: Update todo by id, this can be used to set the todo as done/undone
  * parameters:
  *   - (path) id {String} Todo id
  *   - (body) req.body {object} Insert Object
  */
  @Put(':id')
  async updateTodo(@Param('id') id, @Body() todoDto: TodoDto) {
    this.appUtil.validateParam(id);
    this.appService.validateTodo(todoDto);
    await this.appService.updateTodo(todoDto, id);
  }

  /*
  * @oas [delete] /roamcodetest/api/v1/todo/:id
  * description: Removing todo of id
  * parameters:
  *   - (path) id {String} Todo id
  */
  @Delete(':id')
  async deleteTodo(@Param('id') id) {
    this.appUtil.validateParam(id);
    await this.appService.deleteTodo(id);
  }

}
