import {makeAutoObservable} from 'mobx';

import {ITemplateStore} from 'types/stores/ITemplateStore.ts';

export class TemplateStore implements ITemplateStore {
  constructor() {
    makeAutoObservable(this)
  }
}