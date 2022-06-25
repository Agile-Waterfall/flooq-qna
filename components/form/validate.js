export const required = value => (value ? undefined : 'This field is required')

// TODO: Only match ZHAW emails? 
export const email = value => value.match(/^(.+)@(.+)$/) ? undefined : 'Must be a valid email (e.g. name@students.zhaw.ch)'

export const composeValidators = (...validators) => value => validators.reduce((error, validator) => error || validator(value), undefined)
