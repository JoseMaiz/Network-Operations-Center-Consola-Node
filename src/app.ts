import { envs } from "./config/plugins/envs.plugins";
import { MongoDatabase } from "./data/mongo";
import { ServerApp } from "./presentation/server";
import 'dotenv/config';

(async()=>{

    await main();
})()

async function main(){
    await MongoDatabase.connect({
        mongoUrl: envs.MONGO_URL,
        dbName:envs.MONGO_DB_NAME,
    });
    
    ServerApp.start();
}