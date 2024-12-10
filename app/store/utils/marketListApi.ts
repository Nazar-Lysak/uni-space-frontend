import { MARKETS_LIST_API } from "../../variables/api";

export const fetchMarketList = async () => {
    try {
      const response = await fetch(MARKETS_LIST_API);
      if (!response.ok) {
        throw new Error('Error get data');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Fetch Error:', error);
      return null;
    }
  };