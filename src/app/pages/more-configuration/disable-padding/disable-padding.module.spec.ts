import { DisablePaddingModule } from './disable-padding.module';

describe('DisablePaddingModule', () => {
  let disablePaddingModule: DisablePaddingModule;

  beforeEach(() => {
    disablePaddingModule = new DisablePaddingModule();
  });

  it('should create an instance', () => {
    expect(disablePaddingModule).toBeTruthy();
  });
});
