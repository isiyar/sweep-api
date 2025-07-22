import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import { App } from "supertest/types";
import { AppModule } from "../src/app.module";
import * as request from "supertest";

describe("AppController (e2e)", () => {
  jest.setTimeout(10000);
  let app: INestApplication<App>;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it("/indexer/get_all_chains_data/:wallet (GET)", () => {
    return request(app.getHttpServer())
      .get(
        "/indexer/get_all_chains_data/0x3dc4CB21788205775D6302b25e8631b7BFdd66Cb",
      )
      .expect(200);
  });
});
