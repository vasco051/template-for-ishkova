import {makeAutoObservable} from 'mobx';

import {TemplateStore} from '../templateStore.ts';

import {IRootStore} from 'types/stores/IRootStore.ts';
import {ITemplateStore} from 'types/stores/ITemplateStore.ts';

export class Store implements IRootStore {
  template: ITemplateStore

  constructor() {
    this.template = new TemplateStore()
    makeAutoObservable(this);
  }
}

export const store = new Store();