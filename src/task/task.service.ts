import { Injectable } from '@nestjs/common';

@Injectable()
export class TaskService {
    findTasksForUser(id: string){
        return({
            message: `here are the tasks of the user with id: \'${id}\'`
        })
    }
}
