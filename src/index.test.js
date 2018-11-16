import _ from 'lodash';
import {
  cleanPhone,
  countryForE164Number,
  formatNumberForMobileDialing
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
})

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

describe('formatNumberForMobileDialing', () => {
  test('it can format a US number', () => {
    const result = formatNumberForMobileDialing('US', '4155552671');
    expect(result).toBe('+1 415-555-2671');
  });

  test('it can format a Finnish number', () => {
    const result = formatNumberForMobileDialing('FI', '+358-9-1911');
    expect(result).toBe('09 1911'); // @todo - This seems a bit off...wth
  });

  test('it can format an Indonesian number', () => {
    const result = formatNumberForMobileDialing('IN', '+62 623 61751214');
    expect(result).toBe('+62 623 61751214');
  });
});




// // -------------------------------------------------------------------------
// function isValidNumber(phone, country, type) {
//   /*

//   Tests whether a phone number matches a valid pattern. Note this doesn't
//   verify the number is actually in use, which is impossible to tell by just
//   looking at a number itself.

//   */

//   try {
//       var phone = cleanPhone(phone);
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var number = phoneUtil.parseAndKeepRawInput(phone, country);
//       if (typeof type === 'string') {
//           var type = type.toUpperCase();
//           if (phoneUtil.isValidNumber(number) &&
//               phoneUtil.getNumberType(number) === i18n.phonenumbers.PhoneNumberType[type]) {
//               return true;
//           }
//           else {
//               return false;
//           }
//       }
//       else {
//           return phoneUtil.isValidNumber(number);
//       }
//   } catch (e) {
//       return false;
//   }
// }

// // -------------------------------------------------------------------------
// function formatE164(country, phone) {
//   /*

//   Return the phone number in e164 format

//   country (String) 2 digit country code
//   phone (String) phone number to format

//   */

//   try {
//       var phone = cleanPhone(phone);
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var number = phoneUtil.parseAndKeepRawInput(phone, country);
//       var PNF = i18n.phonenumbers.PhoneNumberFormat;
//       var output = new goog.string.StringBuffer();
//       output = phoneUtil.format(number, PNF.E164);
//       return output.toString();
//   } catch (e) {
//       return phone
//   }
// }


// // -------------------------------------------------------------------------
// function formatInternational(country, phone) {
//   /*

//   Return the phone number in international format

//   country (String) 2 digit country code
//   phone (String) phone number to format

//   */

//   try {
//       var phone = cleanPhone(phone);
//       var formatter = new i18n.phonenumbers.AsYouTypeFormatter(country);
//       var output = new goog.string.StringBuffer();
//       for (var i = 0; i < phone.length; ++i) {
//           var inputChar = phone.charAt(i);
//           output = (formatter.inputDigit(inputChar));
//       }
//       return output.toString();
//   } catch (e) {
//       return phone;
//   }
// }

// // -------------------------------------------------------------------------
// function formatLocal(country, phone) {
//   /*

//   Return the phone number in the format local to the user

//   country (String) 2 digit country code
//   phone (String) phone number to format

//   */

//   try {
//       var phone = cleanPhone(phone);
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var number = phoneUtil.parseAndKeepRawInput(phone, country);
//       if (phoneUtil.isValidNumberForRegion(number, country)) {
//           var PNF = i18n.phonenumbers.PhoneNumberFormat;
//           var output = new goog.string.StringBuffer();
//           output = phoneUtil.format(number, PNF.NATIONAL);
//           return output.toString();
//       } else {
//           return formatInternational(country, phone);
//       }
//   } catch (e) {
//       return formatInternational(country, phone);
//   }
// }

// // -------------------------------------------------------------------------
// function exampleLandlineNumber(country) {
//   /*

//   Returns an example land line phone number for the specified country

//   country (String) 2 digit country code

//   */

//   try {
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var output = phoneUtil.getExampleNumber(country);
//       return ""+output.getNationalNumber();
//   } catch (e) {
//       return "";
//   }
// }

// // -------------------------------------------------------------------------
// function exampleMobileNumber(country) {
//   /*

//   Returns an example mobile phone number for the specified country

//   country (String) 2 digit country code

//   */

//   try {
//       var phoneUtil = i18n.phonenumbers.PhoneNumberUtil.getInstance();
//       var output = phoneUtil.getExampleNumberForType(country, i18n.phonenumbers.PhoneNumberType.MOBILE);
//       return ""+output.getNationalNumber();
//   } catch (e) {
//       return "";
//   }
// }


// // -------------------------------------------------------------------------
// function countryCodeToName(countryCode) {
//   /*

//   Convert the country code to a name

//   country (String) 2 digit country code

//   */

//   var arrCountry = new Array();
//   arrCountry['AF'] = "Afghanistan";
//   arrCountry['AL'] = "Albania";
//   arrCountry['DZ'] = "Algeria";
//   arrCountry['AS'] = "American Samoa";
//   arrCountry['AD'] = "Andorra";
//   arrCountry['AO'] = "Angola";
//   arrCountry['AI'] = "Anguilla";
//   arrCountry['AQ'] = "Antarctica";
//   arrCountry['AG'] = "Antigua And Barbuda";
//   arrCountry['AR'] = "Argentina";
//   arrCountry['AM'] = "Armenia";
//   arrCountry['AW'] = "Aruba";
//   arrCountry['AC'] = "Ascension Island";
//   arrCountry['AU'] = "Australia";
//   arrCountry['AT'] = "Austria";
//   arrCountry['AZ'] = "Azerbaijan";
//   arrCountry['BS'] = "Bahamas";
//   arrCountry['BH'] = "Bahrain";
//   arrCountry['BD'] = "Bangladesh";
//   arrCountry['BB'] = "Barbados";
//   arrCountry['BY'] = "Belarus";
//   arrCountry['BE'] = "Belgium";
//   arrCountry['BZ'] = "Belize";
//   arrCountry['BJ'] = "Benin";
//   arrCountry['BM'] = "Bermuda";
//   arrCountry['BT'] = "Bhutan";
//   arrCountry['BO'] = "Bolivia";
//   arrCountry['BA'] = "Bosnia And Herzegovina";
//   arrCountry['BW'] = "Botswana";
//   arrCountry['BV'] = "Bouvet Island";
//   arrCountry['BR'] = "Brazil";
//   arrCountry['IO'] = "British Indian Ocean Territory";
//   arrCountry['BN'] = "Brunei";
//   arrCountry['BG'] = "Bulgaria";
//   arrCountry['BF'] = "Burkina Faso";
//   arrCountry['BI'] = "Burundi";
//   arrCountry['KH'] = "Cambodia";
//   arrCountry['CM'] = "Cameroon";
//   arrCountry['CA'] = "Canada";
//   arrCountry['CV'] = "Cape Verde";
//   arrCountry['KY'] = "Cayman Islands";
//   arrCountry['CF'] = "Central African Republic";
//   arrCountry['TD'] = "Chad";
//   arrCountry['CL'] = "Chile";
//   arrCountry['CN'] = "China";
//   arrCountry['CX'] = "Christmas Island";
//   arrCountry['CC'] = "Cocos (Keeling) Islands";
//   arrCountry['CO'] = "Colombia";
//   arrCountry['KM'] = "Comoros";
//   arrCountry['CG'] = "Congo";
//   arrCountry['CK'] = "Cook Islands";
//   arrCountry['CR'] = "Costa Rica";
//   arrCountry['CI'] = "Cote D'Ivorie (Ivory Coast)";
//   arrCountry['HR'] = "Croatia (Hrvatska)";
//   arrCountry['CU'] = "Cuba";
//   arrCountry['CY'] = "Cyprus";
//   arrCountry['CZ'] = "Czech Republic";
//   arrCountry['CD'] = "Democratic Republic Of Congo (Zaire)";
//   arrCountry['DK'] = "Denmark";
//   arrCountry['DJ'] = "Djibouti";
//   arrCountry['DM'] = "Dominica";
//   arrCountry['DO'] = "Dominican Republic";
//   arrCountry['TL'] = "East Timor";
//   arrCountry['EC'] = "Ecuador";
//   arrCountry['EG'] = "Egypt";
//   arrCountry['SV'] = "El Salvador";
//   arrCountry['GQ'] = "Equatorial Guinea";
//   arrCountry['ER'] = "Eritrea";
//   arrCountry['EE'] = "Estonia";
//   arrCountry['ET'] = "Ethiopia";
//   arrCountry['FK'] = "Falkland Islands (Malvinas)";
//   arrCountry['FO'] = "Faroe Islands";
//   arrCountry['FJ'] = "Fiji";
//   arrCountry['FI'] = "Finland";
//   arrCountry['FR'] = "France";
//   arrCountry['FX'] = "France, Metropolitan";
//   arrCountry['GF'] = "French Guinea";
//   arrCountry['PF'] = "French Polynesia";
//   arrCountry['TF'] = "French Southern Territories";
//   arrCountry['GA'] = "Gabon";
//   arrCountry['GM'] = "Gambia";
//   arrCountry['GE'] = "Georgia";
//   arrCountry['DE'] = "Germany";
//   arrCountry['GH'] = "Ghana";
//   arrCountry['GI'] = "Gibraltar";
//   arrCountry['GR'] = "Greece";
//   arrCountry['GL'] = "Greenland";
//   arrCountry['GD'] = "Grenada";
//   arrCountry['GP'] = "Guadeloupe";
//   arrCountry['GU'] = "Guam";
//   arrCountry['GT'] = "Guatemala";
//   arrCountry['GN'] = "Guinea";
//   arrCountry['GW'] = "Guinea-Bissau";
//   arrCountry['GY'] = "Guyana";
//   arrCountry['HT'] = "Haiti";
//   arrCountry['HM'] = "Heard And McDonald Islands";
//   arrCountry['HN'] = "Honduras";
//   arrCountry['HK'] = "Hong Kong";
//   arrCountry['HU'] = "Hungary";
//   arrCountry['IS'] = "Iceland";
//   arrCountry['IN'] = "India";
//   arrCountry['ID'] = "Indonesia";
//   arrCountry['IR'] = "Iran";
//   arrCountry['IQ'] = "Iraq";
//   arrCountry['IE'] = "Ireland";
//   arrCountry['IM'] = "Isle of Man";
//   arrCountry['IL'] = "Israel";
//   arrCountry['IT'] = "Italy";
//   arrCountry['JM'] = "Jamaica";
//   arrCountry['JP'] = "Japan";
//   arrCountry['JO'] = "Jordan";
//   arrCountry['KZ'] = "Kazakhstan";
//   arrCountry['KE'] = "Kenya";
//   arrCountry['KI'] = "Kiribati";
//   arrCountry['KW'] = "Kuwait";
//   arrCountry['KG'] = "Kyrgyzstan";
//   arrCountry['LA'] = "Laos";
//   arrCountry['LV'] = "Latvia";
//   arrCountry['LB'] = "Lebanon";
//   arrCountry['LS'] = "Lesotho";
//   arrCountry['LR'] = "Liberia";
//   arrCountry['LY'] = "Libya";
//   arrCountry['LI'] = "Liechtenstein";
//   arrCountry['LT'] = "Lithuania";
//   arrCountry['LU'] = "Luxembourg";
//   arrCountry['MO'] = "Macau";
//   arrCountry['MK'] = "Macedonia";
//   arrCountry['MG'] = "Madagascar";
//   arrCountry['MW'] = "Malawi";
//   arrCountry['MY'] = "Malaysia";
//   arrCountry['MV'] = "Maldives";
//   arrCountry['ML'] = "Mali";
//   arrCountry['MT'] = "Malta";
//   arrCountry['MH'] = "Marshall Islands";
//   arrCountry['MQ'] = "Martinique";
//   arrCountry['MR'] = "Mauritania";
//   arrCountry['MU'] = "Mauritius";
//   arrCountry['YT'] = "Mayotte";
//   arrCountry['MX'] = "Mexico";
//   arrCountry['FM'] = "Micronesia";
//   arrCountry['MD'] = "Moldova";
//   arrCountry['MC'] = "Monaco";
//   arrCountry['MN'] = "Mongolia";
//   arrCountry['ME'] = "Montenegro";
//   arrCountry['MS'] = "Montserrat";
//   arrCountry['MA'] = "Morocco";
//   arrCountry['MZ'] = "Mozambique";
//   arrCountry['MM'] = "Myanmar (Burma)";
//   arrCountry['NA'] = "Namibia";
//   arrCountry['NR'] = "Nauru";
//   arrCountry['NP'] = "Nepal";
//   arrCountry['NL'] = "Netherlands";
//   arrCountry['AN'] = "Netherlands Antilles";
//   arrCountry['NC'] = "New Caledonia";
//   arrCountry['NZ'] = "New Zealand";
//   arrCountry['NI'] = "Nicaragua";
//   arrCountry['NE'] = "Niger";
//   arrCountry['NG'] = "Nigeria";
//   arrCountry['NU'] = "Niue";
//   arrCountry['NF'] = "Norfolk Island";
//   arrCountry['KP'] = "North Korea";
//   arrCountry['MP'] = "Northern Mariana Islands";
//   arrCountry['NO'] = "Norway";
//   arrCountry['OM'] = "Oman";
//   arrCountry['PK'] = "Pakistan";
//   arrCountry['PW'] = "Palau";
//   arrCountry['PS'] = "Palestine";
//   arrCountry['PA'] = "Panama";
//   arrCountry['PG'] = "Papua New Guinea";
//   arrCountry['PY'] = "Paraguay";
//   arrCountry['PE'] = "Peru";
//   arrCountry['PH'] = "Philippines";
//   arrCountry['PN'] = "Pitcairn";
//   arrCountry['PL'] = "Poland";
//   arrCountry['PT'] = "Portugal";
//   arrCountry['PR'] = "Puerto Rico";
//   arrCountry['QA'] = "Qatar";
//   arrCountry['RE'] = "Reunion";
//   arrCountry['RO'] = "Romania";
//   arrCountry['RU'] = "Russia";
//   arrCountry['RW'] = "Rwanda";
//   arrCountry['SH'] = "Saint Helena";
//   arrCountry['KN'] = "Saint Kitts And Nevis";
//   arrCountry['LC'] = "Saint Lucia";
//   arrCountry['PM'] = "Saint Pierre And Miquelon";
//   arrCountry['VC'] = "Saint Vincent And The Grenadines";
//   arrCountry['SM'] = "San Marino";
//   arrCountry['ST'] = "Sao Tome And Principe";
//   arrCountry['SA'] = "Saudi Arabia";
//   arrCountry['SN'] = "Senegal";
//   arrCountry['RS'] = "Serbia";
//   arrCountry['SC'] = "Seychelles";
//   arrCountry['SL'] = "Sierra Leone";
//   arrCountry['SG'] = "Singapore";
//   arrCountry['SK'] = "Slovak Republic";
//   arrCountry['SI'] = "Slovenia";
//   arrCountry['SB'] = "Solomon Islands";
//   arrCountry['SO'] = "Somalia";
//   arrCountry['ZA'] = "South Africa";
//   arrCountry['GS'] = "South Georgia And South Sandwich Islands";
//   arrCountry['KR'] = "South Korea";
//   arrCountry['ES'] = "Spain";
//   arrCountry['LK'] = "Sri Lanka";
//   arrCountry['SD'] = "Sudan";
//   arrCountry['SR'] = "Suriname";
//   arrCountry['SJ'] = "Svalbard And Jan Mayen";
//   arrCountry['SZ'] = "Swaziland";
//   arrCountry['SE'] = "Sweden";
//   arrCountry['CH'] = "Switzerland";
//   arrCountry['SY'] = "Syria";
//   arrCountry['TW'] = "Taiwan";
//   arrCountry['TJ'] = "Tajikistan";
//   arrCountry['TZ'] = "Tanzania";
//   arrCountry['TH'] = "Thailand";
//   arrCountry['TG'] = "Togo";
//   arrCountry['TK'] = "Tokelau";
//   arrCountry['TO'] = "Tonga";
//   arrCountry['TT'] = "Trinidad And Tobago";
//   arrCountry['TN'] = "Tunisia";
//   arrCountry['TR'] = "Turkey";
//   arrCountry['TM'] = "Turkmenistan";
//   arrCountry['TC'] = "Turks And Caicos Islands";
//   arrCountry['TV'] = "Tuvalu";
//   arrCountry['UG'] = "Uganda";
//   arrCountry['UA'] = "Ukraine";
//   arrCountry['AE'] = "United Arab Emirates";
//   arrCountry['GB'] = "United Kingdom";
//   arrCountry['US'] = "United States";
//   arrCountry['UM'] = "United States Minor Outlying Islands";
//   arrCountry['UY'] = "Uruguay";
//   arrCountry['UZ'] = "Uzbekistan";
//   arrCountry['VU'] = "Vanuatu";
//   arrCountry['VA'] = "Vatican City (Holy See)";
//   arrCountry['VE'] = "Venezuela";
//   arrCountry['VN'] = "Vietnam";
//   arrCountry['VG'] = "Virgin Islands (British)";
//   arrCountry['VI'] = "Virgin Islands (US)";
//   arrCountry['WF'] = "Wallis And Futuna Islands";
//   arrCountry['EH'] = "Western Sahara";
//   arrCountry['WS'] = "Western Samoa";
//   arrCountry['YE'] = "Yemen";
//   arrCountry['YU'] = "Yugoslavia";
//   arrCountry['ZM'] = "Zambia";
//   arrCountry['ZW'] = "Zimbabwe";

//   var name = arrCountry[countryCode.toUpperCase()];
//   if (name === undefined) {
//       return "";
//   }
//   return name;
// }