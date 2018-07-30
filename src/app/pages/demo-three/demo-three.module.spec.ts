import { DemoThreeModule } from './demo-three.module';

describe('DemoThreeModule', () => {
  let demoThreeModule: DemoThreeModule;

  beforeEach(() => {
    demoThreeModule = new DemoThreeModule();
  });

  it('should create an instance', () => {
    expect(demoThreeModule).toBeTruthy();
  });
});
