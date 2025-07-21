export class LogoUrlsDto {
  token_logo_url: string;
  protocol_logo_url: string;
  chain_logo_url: string;
}

export class MultichainBalanceItemDto {
  contract_decimals: number;
  contract_name: string;
  contract_ticker_symbol: string;
  contract_address: string;
  contract_display_name: string;
  supports_erc: string[];
  logo_urls: LogoUrlsDto;
  last_transferred_at: string;
  is_native_token: boolean;
  type: string;
  is_spam: boolean;
  balance: string;
  balance_24h: string;
  quote_rate: number;
  quote_rate_24h: number;
  quote: number;
  quote_24h: number;
  pretty_quote: string;
  pretty_quote_24h: string;
  chain_id: number;
  chain_name: string;
  chain_display_name: string;
}

export class MultichainBalancesResponse {
  data: {
    updated_at: string;
    cursor_before: string;
    quote_currency: string;
    items: MultichainBalanceItemDto[];
  };
}
