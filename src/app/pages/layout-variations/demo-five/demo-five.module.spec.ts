import { DemoFiveModule } from './demo-five.module';

describe('DemoFiveModule', () => {
  let demoFiveModule: DemoFiveModule;

  beforeEach(() => {
    demoFiveModule = new DemoFiveModule();
  });

  it('should create an instance', () => {
    expect(demoFiveModule).toBeTruthy();
  });
});
