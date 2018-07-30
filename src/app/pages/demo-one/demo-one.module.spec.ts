import { DemoOneModule } from './demo-one.module';

describe('DemoOneModule', () => {
  let demoOneModule: DemoOneModule;

  beforeEach(() => {
    demoOneModule = new DemoOneModule();
  });

  it('should create an instance', () => {
    expect(demoOneModule).toBeTruthy();
  });
});
