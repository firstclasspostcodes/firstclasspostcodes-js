module.exports = {
  listCompletions() {
    return this.reduce((completions, [postcode, streets]) => {
      if (!streets || streets.length === 0) {
        completions.push(postcode);
      }

      streets.forEach((street) => {
        completions.push(`${street}, ${postcode}`);
      });

      return completions;
    }, []);
  },
};
