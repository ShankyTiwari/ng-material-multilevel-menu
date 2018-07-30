import { DemoTwoModule } from './demo-two.module';

describe('DemoTwoModule', () => {
  let demoTwoModule: DemoTwoModule;

  beforeEach(() => {
    demoTwoModule = new DemoTwoModule();
  });

  it('should create an instance', () => {
    expect(demoTwoModule).toBeTruthy();
  });
});
