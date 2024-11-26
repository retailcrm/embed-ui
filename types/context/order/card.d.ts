import type { Field, ReadonlyField } from '../schema'

export type Schema = {
  'id': ReadonlyField<number | null>;
  'externalId': ReadonlyField<string | null>;
  'number': ReadonlyField<string | null>;
  'customer.type': ReadonlyField<string | null>;
  'customer.lastName': Field<string | null>;
  'customer.firstName': Field<string | null>;
  'customer.patronymic': Field<string | null>;
  'customer.email': Field<string | null>;
  'customer.phone': Field<string | null>;
  'country': ReadonlyField<string | null>;
  'currency': ReadonlyField<string>;
  'status': ReadonlyField<string>;
  'company.name': Field<string | null>;
  'company.legalName': Field<string | null>;
  'company.legalAddress': Field<string | null>;
  'company.INN': Field<string | null>;
  'company.OKPO': Field<string | null>;
  'company.BIK': Field<string | null>;
  'company.bank': Field<string | null>;
  'company.bankAddress': Field<string | null>;
  'company.corrAccount': Field<string | null>;
  'company.bankAccount': Field<string | null>;
  'delivery.address': Field<string | null>;
}
