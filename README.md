# Storage Poly | [![CircleCI](https://circleci.com/gh/sturdynut/i18n-phone-formatter/tree/master.svg?style=svg&circle-token=c75d9cef31f5d841ff8201af2923ade3e7500602)](https://circleci.com/gh/sturdynut/i18n-phone-formatter/tree/master) [![Coverage Status](https://coveralls.io/repos/github/sturdynut/i18n-phone-formatter/badge.svg?branch=master)](https://coveralls.io/github/sturdynut/i18n-phone-formatter?branch=master)

A Javascript phone number formatter that uses google's i18n library.

## Requirements

* Node 6+

## Install

`yarn add @sturdynut/i18n-phone-formatter` or `npm install @sturdynut/i18n-phone-formatter -S`

## Usage

```javascript
import {
  formatE164
} from '@sturdynut/i18n-phone-formatter'; // or require('@sturdynut/i18n-phone-formatter')


formatE164('US', '4155552671'); // +14155552671

```

## API

| Function                     	| Parameters                                 	| Example                                                                  	|   	|   	|
|------------------------------	|--------------------------------------------	|--------------------------------------------------------------------------	|---	|---	|
| countryForE164Number         	| phoneNumber : string                       	| phoneFormat.countryForE164Number(validInternationalPhoneNumber);         	|   	|   	|
| formatNumberForMobileDialing 	| countryCode : string, phoneNumber : string 	| phoneFormat.formatNumberForMobileDialing(countryCode, validPhoneNumber); 	|   	|   	|
| isValidNumber                	| phoneNumber : string, countryCode : string 	| phoneFormat.isValidNumber(validPhoneNumber, countryCode);                	|   	|   	|
| formatE164                   	| countryCode: string, phoneNumber : string  	| phoneFormat.formatE164(countryCode, validPhoneNumber);                   	|   	|   	|
| formatInternational          	| countryCode : string, phoneNumber : string 	| phoneFormat.formatInternational(countryCode, validPhoneNumber);          	|   	|   	|
| formatLocal                  	| countryCode : string, phoneNumber : string 	| phoneFormat.formatLocal(countryCode, validPhoneNumber);                  	|   	|   	|
| exampleLandlineNumber        	| countryCode : string                       	| phoneFormat.exampleLandlineNumber(countryCode);                          	|   	|   	|
| exampleMobileNumber          	| countryCode : string                       	| phoneFormat.exampleMobileNumber(countryCode);                            	|   	|   	|
| cleanPhone                   	| phoneNumber : string                       	| phoneFormat.cleanPhone(validPhoneNumber);                                	|   	|   	|
| countryCodeToName            	| countryCode : string                       	| phoneFormat.countryCodeToName(countryCode);                              	|   	|   	|



## Questions?

[@sturdynut](https://twitter.com/sturdynut)

## Bugs?

[Submit a bug](https://github.com/sturdynut/i18n-phone-formatter/issues)

## License

This project is distributed under the MIT license.