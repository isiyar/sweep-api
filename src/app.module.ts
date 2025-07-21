import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { IndexerModule } from "./indexer/indexer.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [IndexerModule, ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
