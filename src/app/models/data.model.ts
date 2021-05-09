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

export interface WebsocketInfo {
  period_id: string;
  price_close: number;
  price_high: number;
  price_low: number;
  price_open: number;
  sequence: number;
  symbol_id: string;
  time_close: string;
  time_open: string;
  time_period_end: string;
  time_period_start: string;
  trades_count: number;
  type: string;
  volume_traded: number;
}
