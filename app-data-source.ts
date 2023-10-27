import { DataSource } from "typeorm"

export const dataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "password",
    database: "octailstor",
    entities: ["src/**/**/*.entity{.ts,.js}"],
    migrations: ["src/database/migrations/*{.ts,.js}"],
    synchronize: true,
})