import readData from './reader';
import parseData from './parser';

//  реализация загрузки из JSON
export default class GameSavingLoader {
  static async load() {
    try {
      const data = await readData();
      const jsonData = await parseData(data);
      return JSON.parse(jsonData);
    } catch (error) {
      throw new Error(`An error occurred: ${error.message}`);
    }
  }
}
