import { NgMaterialMultilevelMenuModule } from './ng-material-multilevel-menu.module';

describe('NgMaterialMultilevelMenuModule', () => {
  let ngMaterialMultilevelMenuModule: NgMaterialMultilevelMenuModule;

  beforeEach(() => {
    ngMaterialMultilevelMenuModule = new NgMaterialMultilevelMenuModule();
  });

  it('should create an instance', () => {
    expect(ngMaterialMultilevelMenuModule).toBeTruthy();
  });
});
