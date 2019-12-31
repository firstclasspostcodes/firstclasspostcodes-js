const RECOGNISED_TYPE_REGEX = /^(postcode|streets|numbers)$/;

const join = (...parts) => parts.filter(Boolean).join(', ');

module.exports = {
  formatAddress(index) {
    const [type, element] = index.split(':');

    if (!RECOGNISED_TYPE_REGEX.test(type)) {
      throw new Error(`Received unrecognised type "${type}"`);
    }

    const typeMismatchError = new Error(`Received index "${index}" but no ${type} data.`);

    const { city, locality, county, region, postcode, country } = this;

    const data = {
      locality: city || locality,
      region: county || region,
      postcode,
      country,
    };

    if (type === 'postcode') {
      return data;
    }

    const { [type]: list } = this;

    if (!list || list.length === 0) {
      throw typeMismatchError;
    }

    const component = list[element];

    let address;

    if (type === 'numbers') {
      const { number, street, building } = component;
      address = join(number, building, street);
    } else {
      address = component;
    }

    return {
      address,
      ...data,
    };
  },
};
