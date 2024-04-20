"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDataSource = void 0;
const Post_1 = require("../entities/Post");
const User_1 = require("../entities/User");
const typeorm_1 = require("typeorm");
exports.appDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "macdoos",
    password: "macdoos",
    database: "reddit",
    entities: [Post_1.Post, User_1.User],
    synchronize: true,
    logging: true,
});
//# sourceMappingURL=appDataSource.js.map