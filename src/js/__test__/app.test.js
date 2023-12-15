import GameSavingLoader from '../app';

describe('GameSaving check', () => {
  test('should load game saving data successfully', async () => {
    const savingPromise = GameSavingLoader.load();

    const saving = await savingPromise;
    expect.assertions(1);
    expect(saving).toEqual({
      id: 9,
      created: 1546300800,
      userInfo: {
        id: 1,
        name: 'Hitman',
        level: 10,
        points: 2000,
      },
    });
  });
});
