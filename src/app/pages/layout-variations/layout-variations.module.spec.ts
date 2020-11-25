import { LayoutVariationsModule } from './layout-variations.module';

describe('LayoutVariationsModule', () => {
  let layoutVariationsModule: LayoutVariationsModule;

  beforeEach(() => {
    layoutVariationsModule = new LayoutVariationsModule();
  });

  it('should create an instance', () => {
    expect(layoutVariationsModule).toBeTruthy();
  });
});
