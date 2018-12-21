function display(Class, properties = {}) {
  const name = 'display'
  const data = new Class()
  Object.assign(data, properties)

  return {
    name,
    data,
  }
}

export default display
