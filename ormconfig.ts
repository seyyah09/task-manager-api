import { stringify } from "querystring";
import { Task } from "src/entities/task.entity";
import { User } from "src/entities/user.entity";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: "postgres",
    database: 'taskManagerDB',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'grespost',
    entities: [User, Task],
    synchronize: true,
};

export default config;