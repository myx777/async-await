// тестирование асинхронной функции с mock

import GameSavingLoader from '../../app';
import readData from '../../reader';
import parseData from '../../parser';

// мокирую модули
jest.mock('../../reader');
jest.mock('../../parser');

jest.setTimeout(15000);

describe('GameSavingLoader', () => {
  beforeEach(() => {
    // Очистка вызовов моков перед каждым тестом
    jest.clearAllMocks();
  });

  afterEach(() => {
    // Восстанавливаем все моки после каждого теста
    jest.restoreAllMocks();
  });

  test('should throw an error if parseData fails', async () => {
    // мокирую readData и заставить его возвращать успешно завершенный промис с данными.
    // для того чтобы протестировать сценарий успешного выполнения readData.
    // иначе выбрасываеn ошибку промисса readData() и не доходит до parseData()
    readData.mockResolvedValue('some data');

    const mockError = new Error('Parse error');
    parseData.mockRejectedValueOnce(mockError);
    // проверка количества утверждений в тесте
    expect.assertions(3);

    try {
      await GameSavingLoader.load();
    } catch (error) {
      expect(error.message).toEqual(`An error occurred: ${mockError.message}`);
    }

    expect(parseData).toHaveBeenCalled();

    expect(readData).toHaveBeenCalled();
  });
});
