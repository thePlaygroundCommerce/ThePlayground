const stringifyBigIntReplacer = (key, value) => typeof value === 'bigint' ? +value.toString() : value

export {
    stringifyBigIntReplacer
}