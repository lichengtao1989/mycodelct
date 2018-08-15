import base from 'base'
import logistics from 'logistics'
import marketing from 'marketing'
import trace from 'trace'
import codeSecurity from 'codeSecurity'
import code from 'code'
import other from 'other'
import {addLogoutHandler, addClearHandler} from './utils/logout'

const sites = [
  base,
  logistics,
  marketing,
  trace,
  code,
  codeSecurity,
  other
];
export default {
  init(){
    return new Promise((resolve)=> {
      this.addLogoutHandlers();
      this.addClearHandlers();

      Promise.all(sites.map(site=> {
        return site.init();
      })).then(()=>{
        resolve();
      })
    })
  },
  addLogoutHandlers(){
    sites.forEach(site=> {
      if(site.logout){
        addLogoutHandler(site.logout);
      }
    });
  },
  addClearHandlers(){
    sites.forEach(site=> {
      if(site.clear){
        addClearHandler(site.clear);
      }
    });
  }
}
