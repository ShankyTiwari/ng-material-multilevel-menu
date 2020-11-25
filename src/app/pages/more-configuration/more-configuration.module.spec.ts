import { MoreConfigurationModule } from './more-configuration.module';

describe('MoreConfigurationModule', () => {
  let moreConfigurationModule: MoreConfigurationModule;

  beforeEach(() => {
    moreConfigurationModule = new MoreConfigurationModule();
  });

  it('should create an instance', () => {
    expect(moreConfigurationModule).toBeTruthy();
  });
});
