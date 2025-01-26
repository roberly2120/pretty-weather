import minimist from "minimist";

const parseArgs = () => {
  const argValues = {};
  const args = minimist(process.argv.slice(2), {
    default: {
      location: '80487',
      units: 'F'
    },
    alias: {
      l: 'location',
      u: 'units',
    },
  });

  return {
    location: args.location,
    units: args.units,
    command: args._[0] || null,
  }
}
export default parseArgs