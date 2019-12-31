const join = (...parts) => parts.filter(Boolean).join(', ');

const NUMBERS_TYPE = 'numbers';

const STREETS_TYPE = 'streets';

const POSTCODE_TYPE = 'postcode';

module.exports = {
  listAddresses() {
    const { numbers, postcode, streets, city, locality } = this;

    const suffix = join(city || locality, postcode);

    if (numbers && numbers.length > 0) {
      return numbers.map(({ number, street, building }, index) => [
        `${NUMBERS_TYPE}:${index}`,
        join(number, building, street, suffix),
      ]);
    }

    if (streets && streets.length > 0) {
      return streets.map((street, index) => [
        `${STREETS_TYPE}:${index}`,
        join(street, suffix),
      ]);
    }

    const postcodeData = [
      `${POSTCODE_TYPE}:0`,
      suffix,
    ];

    return [postcodeData];
  },
};
