import { BalancesDto } from "./dto/balances.dto";
import { MultichainBalancesResponse } from "./dto/multichainBalancesResponse.dto";

export function getChainsAndBalances(
  responseData: MultichainBalancesResponse,
): BalancesDto {
  const result: BalancesDto = {
    data: {},
  };

  for (const item of responseData.data.items) {
    if (!(item.chain_name in result.data)) {
      result.data[item.chain_name] = {
        chain_name: item.chain_display_name,
        chain_logo_url: item.logo_urls.chain_logo_url,
        tokens: [],
      };
    }

    const tokenRate: number =
      Number(item.balance) / 10 ** item.contract_decimals;
    if (tokenRate > 1) {
      result.data[item.chain_name].tokens.push({
        contract_address: item.contract_address,
        decimals: item.contract_decimals,
        name: item.contract_display_name,
        symbol: item.contract_ticker_symbol,
        balance: tokenRate,
        rate: item.quote,
        token_logo_url: item.logo_urls.token_logo_url,
      });
    }
  }

  return result;
}
