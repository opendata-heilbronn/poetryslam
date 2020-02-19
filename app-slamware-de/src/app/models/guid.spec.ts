import { Guid } from './guid';

describe('Guid', () => {
  it('should create an instance', () => {
    expect(new Guid()).toBeTruthy();
  });
});
