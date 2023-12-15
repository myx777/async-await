import read from './reader';
import json from './parser';

export default class GameSavingLoader {
  static async load() {
    try {
      const data = await read();
      const jsonData = await json(data);
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('An error occurred:', error.message);
      throw error; // Переброс ошибки для дальнейшей обработки
    }
  }
}
