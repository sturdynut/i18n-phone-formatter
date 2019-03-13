import _ from 'lodash';
import {
  cleanPhone,
  countryCodeToName,
  countryForE164Number,
  exampleLandlineNumber,
  exampleMobileNumber,
  formatE164,
  formatInternational,
  formatLocal,
  formatNumberForMobileDialing,
  isValidNumber
} from './index';

describe('cleanPhone', () => {
  test('it can clean a decent numbers', () => {
    const phonesToClean = [
      '+(555)-555-5555',
      '+(555) 555 5555',
      '+(555).555.5555',
      '+555-555-5555',
      '+555 555 5555',
      '+555.555.5555',
      '(555)-555-5555',
      '(555) 555 5555',
      '(555).555.5555',
      '555-555-5555',
      '555 555 5555',
      '555.555.5555',
    ];

    const cleanedPhonesCount = _(phonesToClean)
      .map(cleanPhone)
      .uniq()
      .value()
      .length;

    expect(cleanedPhonesCount).toEqual(2);
  });

  test('it can clean indecent numbers', () => {
    const phonesToClean = [
      '_____+(555)-_)@#$#@!(555-5555',
      '+(555) 555 ___))(  # #**$&5555',
      '~!!@##    ?/.<><+~~(555).555.5555',
      '+ 5 5     5 - 5  5     5-:{":;;    5 5 5 5   ',
      '+                    555 555 5555 \n\n^28**8 INSERT INTO * FROM',
    ];

    const cleanedPhonesCount = _(phonesToClean)
      .map(cleanPhone)
      .uniq()
      .value()
      .length;

    expect(cleanedPhonesCount).toEqual(2);
  });
});

describe('countryCodeToName', () => {
  test('it can get a country code for a name', () => {
    const toMatch = [
      {
        code: 'AF',
        val: 'Afghanistan'
      },
      {
        code: 'DJ',
        val: 'Djibouti'
      },
      {
        code: 'ZW',
        val: 'Zimbabwe'
      },
    ];

    toMatch.forEach(({ code, val }) => {
      expect(countryCodeToName(code)).toEqual(val);
    });
  });

  test('it returns null for invalid iput', () => {
    const toMatch = [
      {
        code: null,
        val: null
      },
      {
        code: undefined,
        val: null
      },
      {
        code: 123,
        val: null
      },
    ];

    toMatch.forEach(({ code, val }) => {
      expect(countryCodeToName(code)).toEqual(val);
    });
  });
});

describe('countryForE164Number', () => {
  test('it can detect a US number', () => {
    const result = countryForE164Number('+14155552671');
    expect(result).toBe('US');
  });

  test('it can detect a Finnish number', () => {
    const result = countryForE164Number('+358 9 1911');
    expect(result).toBe('FI');
  });

  test('it can detect an Indonesian number', () => {
    const result = countryForE164Number('+62 623 61751214');
    expect(result).toBe('ID');
  });
});

describe('exampleLandlineNumber', () => {
  test('it can get a US landline number', () => {
    const result = exampleLandlineNumber('US');
    expect(result).toBe('2015550123');
  });

  test('it can get a Finnish landline number', () => {
    const result = exampleLandlineNumber('FI');
    expect(result).toBe('131234567');
  });

  test('it can get an Indonesian landline number', () => {
    const result = exampleLandlineNumber('IN');
    expect(result).toBe('7410410123');
  });

  test('it can get a Japanese landline number', () => {
    const result = exampleLandlineNumber('JP');
    expect(result).toBe('312345678');
  });
});

describe('exampleMobileNumber', () => {
  test('it can get a US mobile number', () => {
    const result = exampleMobileNumber('US');
    expect(result).toBe('2015550123');
  });

  test('it can get a Finnish mobile number', () => {
    const result = exampleMobileNumber('FI');
    expect(result).toBe('412345678');
  });

  test('it can get an Indonesian mobile number', () => {
    const result = exampleMobileNumber('IN');
    expect(result).toBe('8123456789');
  });

  test('it can get a Japanese mobile number', () => {
    const result = exampleMobileNumber('JP');
    expect(result).toBe('9012345678');
  });
});

describe('formatE164', () => {
  test('it can format a US number', () => {
    const result = formatE164('US', '4155552671');
    expect(result).toBe('+14155552671');
  });

  test('it can format a Finnish number', () => {
    const result = formatE164('FI', '+358-9-1911');
    expect(result).toBe('+35891911');
  });

  test('it can format an Indonesian number', () => {
    const result = formatE164('IN', '+62 623 61751214');
    expect(result).toBe('+6262361751214');
  });

  test('it can format a Japanese number', () => {
    const result = formatE164('JP', '81 3-5159-8200');
    expect(result).toBe('+81351598200');
  });
});

describe('formatInternational', () => {
  test('it can format a US number', () => {
    const result = formatInternational('US', '4155552671');
    expect(result).toBe('(415) 555-2671');
  });

  test('it can format a Finnish number', () => {
    const result = formatInternational('FI', '+358-9-1911');
    expect(result).toBe('+358 9 1911');
  });

  test('it can format an Indonesian number', () => {
    const result = formatInternational('IN', '+62 623 61751214');
    expect(result).toBe('+62 623 61751214');
  });

  test('it can format a Japanese number', () => {
    const result = formatInternational('JP', '81 3-5159-8200');
    expect(result).toBe('81351598200');
  });
});

describe('formatLocal', () => {
  test('it can format a US number', () => {
    const result = formatLocal('US', '4155552671');
    expect(result).toBe('(415) 555-2671');
  });

  test('it can format a Finnish number', () => {
    const result = formatLocal('FI', '+358-9-1911');
    expect(result).toBe('09 1911');
  });

  test('it can format an Indonesian number', () => {
    const result = formatLocal('IN', '+62 623 61751214');
    expect(result).toBe('+62 623 61751214');
  });

  test('it can format a Japanese number', () => {
    const result = formatLocal('JP', '81 3-5159-8200');
    expect(result).toBe('03-5159-8200');
  });
});

describe('formatNumberForMobileDialing', () => {
  test('it can format a US number', () => {
    const result = formatNumberForMobileDialing('US', '4155552671');
    expect(result).toBe('+1 415-555-2671');
  });

  test('it can format a Finnish number', () => {
    const result = formatNumberForMobileDialing('FI', '+358-9-1911');
    expect(result).toBe('09 1911');
  });

  test('it can format an Indonesian number', () => {
    const result = formatNumberForMobileDialing('IN', '+62 623 61751214');
    expect(result).toBe('+62 623 61751214');
  });

  test('it can format a Japanese number', () => {
    const result = formatNumberForMobileDialing('JP', '81 3-5159-8200');
    expect(result).toBe('03-5159-8200');
  });
});

describe('isValidNumber', () => {
  test('it can validate a valid number', () => {
    const validNumberTests = [
      {
        number: '4155552671',
        country: 'US',
        type: 1
      },
      {
        number: '35891911',
        country: 'FI',
        type: 1
      },
      {
        number: '81 3-5159-8200',
        country: 'JP',
        type: 1
      },
    ]

    validNumberTests.forEach(({ number, country, type }) => {
      expect(isValidNumber(number, country, type)).toBeTruthy();
    })
  });

  test('it can invalidate an invalid number', () => {
    const invalidNumberTests = [
      {
        number: 'aaa',
        country: 'US',
        type: 1
      },
      {
        number: 'bbb',
        country: 'FI',
        type: 1
      },
      {
        number: 'ccc',
        country: 'JP',
        type: 1
      },
    ]

    invalidNumberTests.forEach(({ number, country, type }) => {
      expect(isValidNumber(number, country, type)).toBeFalsy();
    })
  });
})
