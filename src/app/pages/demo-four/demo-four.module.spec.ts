import { DemoFourModule } from './demo-four.module';

describe('DemoFourModule', () => {
  let demoFourModule: DemoFourModule;

  beforeEach(() => {
    demoFourModule = new DemoFourModule();
  });

  it('should create an instance', () => {
    expect(demoFourModule).toBeTruthy();
  });
});
