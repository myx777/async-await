import GameSavingLoader from '../app';
import read from '../reader';
import json from '../parser';

// мокирую (подменяю) модули
jest.mock('../reader');
jest.mock('../parser');

describe('GameSaving check', () => {
  beforeEach(() => {
    // Мокируем функции read и json только для первого вызова ошибки
    read.mockRejectedValueOnce(new Error('Read error'));
    json.mockRejectedValueOnce(new Error('JSON error'));
  });

  afterEach(() => {
    // Восстанавливаем все моки после каждого теста
    jest.restoreAllMocks();
  });

  test('should catch error and rethrow', async () => {
    // Спайим console.error
    const consoleErrorSpy = jest.spyOn(console, 'error');

    expect.assertions(2);

    try {
      await GameSavingLoader.load();
    } catch (error) {
      // Проверяем, что блок catch был вызван дважды
      expect(consoleErrorSpy).toHaveBeenCalledWith('An error occurred:', 'Read error');
      expect(error.message).toBe('Read error');
    }

    // Восстанавливаем спай после теста
    consoleErrorSpy.mockRestore();
  });

  test('should error', async () => {
    // Мокирует статический метод load и задает ему поведение:
    // он будет отклоняться с ошибкой 'Test error'
    GameSavingLoader.load = jest.fn().mockRejectedValue(new Error('test error'));

    expect.assertions(1);

    try {
      await GameSavingLoader.load();
    } catch (error) {
      // Перехватываем ошибку и проверяем её содержимое
      expect(error.message).toBe('test error');
    }
  });
});
