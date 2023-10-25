import { ALL_SERVICE_TYPES } from './api-interfaces';
// import './api-interfaces'

describe('apiInterfaces', () => {
  it('should work', () => {
    expect(ALL_SERVICE_TYPES.length).toEqual(4);
  });
});
