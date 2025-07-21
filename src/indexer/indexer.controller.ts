import { Controller, Get, Param } from "@nestjs/common";
import { IndexerService } from "./indexer.service";
import { BalancesDto } from "./dto/balances.dto";

@Controller("indexer")
export class IndexerController {
  constructor(private readonly indexerService: IndexerService) {}

  @Get("get_all_chains_data/:address")
  async getAllChainsData(
    @Param("address") address: string,
  ): Promise<BalancesDto> {
    return await this.indexerService.getAllChainsData(address);
  }
}
