export class Asset {
  constructor(
    public asset_id: string,
    public price_usd: number,
    public name: string,
    public type_is_crypto: number
  ) {}
}
