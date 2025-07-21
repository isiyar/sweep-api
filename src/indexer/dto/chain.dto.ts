import { TokenDto } from "./token.dto";

export class ChainDto {
  chain_name: string;
  chain_logo_url: string;
  tokens: TokenDto[];
}
