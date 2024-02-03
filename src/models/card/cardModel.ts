import { client } from "@/lib/redis";

export default class BotDataModel {
  async createCardData(args: { key: string; data: CardData }): Promise<any> {
    const { key, data } = args;
    const stringData = JSON.stringify(data);
    await client.connect(); 
    const value = await client.set(key, stringData);
    const expirationTime = Math.floor(new Date().getTime() / 1000) + 60;
    await client.expireAt(key, expirationTime);
    await client.disconnect();
    return {
      value
    };
  }

  async getCardData(args: { token: string }) {
    const { token } = args;
    await client.connect(); 
    const unparsedValue = await client.get(token);
    const value = JSON.parse(unparsedValue);
    await client.disconnect();
    return {
      value
    }
  }
}
