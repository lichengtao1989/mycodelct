import BaseModel from '../base.js';
import MenuModel from './menu';
import RoleModel from './role';
import StoreModel from './store';
class SystemModel extends BaseModel {
  constructor() {
    super();
    this.menu = new MenuModel();
    this.role = new RoleModel();
    this.store = new StoreModel();
  }
}
export default SystemModel;
