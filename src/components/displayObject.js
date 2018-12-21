function displayObject(Class, properties = {}) {
  const name = 'displayObject'
  const data = new Class()
  Object.assign(data, properties)

  return {
    name,
    data,
  }
}

export default displayObject
