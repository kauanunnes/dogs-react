import React from "react";

const types = {
  email: {
    regex:  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: 'Type a valid e-mail'
  },
  number: {
    regex: /^\d+$/,
    message: 'Type a valid number'
  }
}

const useForm = (type) => {
  const [value, setValue] = React.useState('')
  const [error, setError] = React.useState(null)

  function onChange({ target }) {
    if (error) {
      validate(target.value)
    }
    setValue(target.value)
  } 

  const validate = (value) => {
    if (type === false) return true
    if (value.length === 0) {
      setError('Type a value.')
      return false
    } else if (types[type] && !types[type].regex.test(value)) {
      setError(types[type].message)
      return false
    } else {
      setError(null)
      return true
    }
  }

  return {
    value, 
    setValue, 
    onChange, 
    validate: () => validate(value),
    onBlur: () => validate(value),
    error
  }
}

export default useForm