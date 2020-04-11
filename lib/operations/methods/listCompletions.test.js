const callable = require('./listCompletions');

describe('#listCompletions', () => {
  let testResponse = [];

  beforeEach(() => {
    Object.assign(testResponse, callable);
  });

  it('it is a function', () => (
    expect(testResponse.listCompletions).toEqual(expect.any(Function))
  ));

  describe('when there are no matching completions', () => {
    it('returns an empty list', () => {
      expect(testResponse.listCompletions()).toEqual([]);
    });
  });

  describe('when there are matching completions', () => {
    describe('when there are matching streets', () => {
      beforeEach(() => {
        testResponse = Object.assign([
          [
            'TEST',
            [
              'STREET A',
              'STREET B',
            ],
          ],
        ], callable);
      });

      it('returns a list containing streets', () => {
        expect(testResponse.listCompletions()).toEqual([
          'STREET A, TEST',
          'STREET B, TEST',
        ]);
      });
    });

    describe('when there are no matching streets', () => {
      beforeEach(() => {
        testResponse = Object.assign([
          [
            'TEST', [],
          ],
        ], callable);
      });

      it('returns a list containing the postcode', () => {
        expect(testResponse.listCompletions()).toEqual([
          'TEST',
        ]);
      });
    });
  });
});
