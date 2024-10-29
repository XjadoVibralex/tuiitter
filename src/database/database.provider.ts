import { DynamicModule } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Environment } from "src/common/enum";
import { ConnectionOptions } from "typeorm/driver/mongodb/typings";

export const DatabaseProvider:DynamicModule =TypeOrmModule.forRootAsync({
    inject:[ConfigService],
    async useFactory(config: ConfigService){
        const isDevelopmentEnv= config.get("NODE_ENV") !== Environment.Production;
    
        const dbConfig:TypeOrmModuleOptions ={
            type: 'postgres',
            host: config.get('DB_HOST'),
            port: +config.get('DB_PORT'),
            username: config.get('DB_USER'),  
            password: config.get('DB_PASSWORD'),
            database: config.get('DB_NAME'),
            autoLoadEntities: true,
            synchronize: true

        } as TypeOrmModuleOptions;

        return dbConfig;

    }
})