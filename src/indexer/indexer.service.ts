import { HttpException, HttpStatus, Injectable, Logger } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { lastValueFrom } from "rxjs";
import { ConfigService } from "@nestjs/config";
import { getChainsAndBalances } from "./indexer.utils";
import { BalancesDto } from "./dto/balances.dto";
import { isAxiosError } from "axios";

@Injectable()
export class IndexerService {
  private readonly logger = new Logger(IndexerService.name);

  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async getAllChainsData(address: string): Promise<BalancesDto> {
    const headers = {
      Authorization: `Bearer ${this.configService.get<string>("GOLD_RUSH_API_KEY")}`,
    };

    try {
      const response$ = this.httpService.get(
        `${this.configService.get<string>("GOLD_RUSH_API_URL")}/allchains/address/${address}/balances/`,
        { headers, timeout: 10000 },
      );
      const response = await lastValueFrom(response$);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return getChainsAndBalances(response.data);
    } catch (error) {
      this.logger.error(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        `Error fetching chains data: ${error.message}`,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        error.stack,
      );
      if (isAxiosError(error)) {
        throw new HttpException(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
          error.response?.data.error_message ||
            error.message ||
            "Unknown error.",
          error.response?.status || HttpStatus.BAD_GATEWAY,
        );
      } else {
        throw new HttpException(
          "Server error.",
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }
  }
}
