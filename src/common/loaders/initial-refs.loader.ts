import { ReferenceBookService } from '../../reference-book/reference-book.service';
import { ReferenceValuesService } from '../../reference-values/reference-values.service';
import * as list from '../../@parsing/currency/currency-list.json';
import { Injectable } from '@nestjs/common';

@Injectable()
export class InitialRefsLoader {
  constructor(
    private readonly referenceBookService: ReferenceBookService,
    private readonly refValuesService: ReferenceValuesService,
  ) {}

  async loadCurrencyRefs() {
    let refBook = await this.referenceBookService.findOne('currency');

    if (!refBook) {
      try {
        refBook = await this.referenceBookService.create({
          refCodeName: 'currency',
          refName: 'Валюты',
        });
      } catch (e) {}
    }

    for (const currency of list) {
      try {
        await this.refValuesService.create({
          codeName: currency.name,
          value: currency.value,
          refId: refBook.id,
        });
      } catch (e) {}
    }
  }

  async init() {
    await this.loadCurrencyRefs();
  }
}
