import { Controller, Get, Post, Body, Param, Delete, Patch, Query } from '@nestjs/common';
import { TasksService } from './tasks.service'
import { Task , TaskStatus} from './task.model'
import { CreateTaskDto } from './dto/create-task-dto'
import { GetTasksFilterDto } from './dto/get-tasks-filter-dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {

    }
    @Get()
    getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
        console.log(filterDto)
        if(Object.keys(filterDto).length) {
            return this.tasksService.getTasksWithFilters(filterDto)
        } else {
            return this.tasksService.getAllTasks()
        }
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id)
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto)
    }

    @Patch('/:id/status')
    updateTaskStatus(@Param('id') id: string, @Body('status') status: TaskStatus): Task {
        console.log(id, status)
        return this.tasksService.updateTaskStatus(id, status)
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        console.log(id)
        // this.tasksService.deleteTask(id)
    }

}
