import { Asset } from './asset.model';

export class User {
  constructor(
    public username: string,
    public password: string,
    public activeTabs: Asset[]
  ) {}
}
