import { Field } from "react-final-form"

export const InputTextarea = ({ id, label, validate, ...rest }) => (
  <Field
    name={id}
    validate={validate}
    render={({ input, meta }) => (
      <div className="mt-4">
        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
          {label}
        </label>
        <div className="mt-1">
          <textarea
            id={id}
            name={id}
            className={`shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 rounded-md ${meta.touched && meta.error && 'border-red-300 text-red-900 placeholder-red-300'}`}
            {...rest}
            {...input}
          >
          </textarea>
        </div>
        <div className="mt-1">
          {meta.touched && meta.error && <span className="text-red-400 text-sm">{meta.error}</span>}
        </div>
      </div>
    )}
  />
)