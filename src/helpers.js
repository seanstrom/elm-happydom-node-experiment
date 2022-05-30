export const toLower = string =>
  string.toLowerCase()

export const propNamesToAttrNames = propNames =>
  propNames.map(toLower)

export const toAttrNameMap = (attrNames, propNames) =>
  attrNames.reduce((nameMap, attrName, index) => {
    return Object.assign(nameMap, {
      [attrName]: propNames[index]
    })
  }, {})

export const attrsToProps = attrNameMap => attrs => {
    const keys = Object.keys(attrs)
    const toPropName = attrName => attrNameMap[attrName]

    return keys.reduce((props, attrName) => {
      return Object.assign(props, {
        [toPropName(attrName)]: attrs[attrName]
      })
    }, {})
  }
