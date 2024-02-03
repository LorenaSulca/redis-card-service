import { card } from "@/models";

export default class cardService {
  async createCard(args: {token:string , data:CardData}): Promise<any> {
    
    const value = await card.createCardData({key:args.token,data:args.data});
    return value;
  }

  async getCard(args: {token:string}): Promise<any> {
    const value = await card.getCardData({token:args.token});
    return value;
  }
}
