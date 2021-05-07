export interface Data {
  asset_id: string;
  name: string;
  type_is_crypto: number;
  data_start: Date;
  data_end: Date;
  data_quote_start: Data;
  data_quote_end: Data;
  data_orderbook_start: Data;
  data_orderbook_end: Data;
  data_trade_start: Data;
  data_trade_end: Data;
  data_symbols_count: number;
  volume_1hrs_usd: number;
  volume_1day_usd: number;
  volume_1mth_usd: number;
  price_usd: number;
  id_icon: string;
}
