import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {

    findTasksForUser(id: number){
        return `here are the tasks of the user with id: \'${id}\'`
    }
}
