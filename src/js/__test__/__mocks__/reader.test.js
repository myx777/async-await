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

  test('should throw an error if readData fails', async () => {
    // создаю объект ошибки, чтобы имитировать ситуацию, когда readData завершается с ошибкой
    const mockError = new Error('Read error');
    // мокирую readData и заставляю его возвращать отклоненный промис с ошибкой
    readData.mockRejectedValue(mockError);

    expect.assertions(3);

    try {
      await GameSavingLoader.load();
    } catch (error) {
      expect(error.message).toEqual(`An error occurred: ${mockError.message}`);
    }

    // проверка, что parseData не вызывается
    expect(parseData).not.toHaveBeenCalled();

    // Проверка, что readData был вызван
    expect(readData).toHaveBeenCalled();
  });
});
