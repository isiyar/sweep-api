import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ConfigService } from "@nestjs/config";
import { Logger, ValidationPipe } from "@nestjs/common";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import * as compression from "compression";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "log"],
  });
  const logger = new Logger("Bootstrap");
  const configService = app.get(ConfigService);

  app.use(helmet());

  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 100,
      standardHeaders: true,
      legacyHeaders: false,
    }),
  );

  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  app.use(compression());

  app.enableCors({
    origin: configService.get<string>("CORS_ORIGIN")?.split(","),
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.setGlobalPrefix("/api/v1");
  await app.listen(configService.get<number>("PORT") ?? 3000);

  logger.log(`🚀 Application is running on: ${await app.getUrl()}`);
}

bootstrap();
