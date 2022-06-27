import { Field } from "react-final-form"

export const InputText = ({ id, label, validate, ...rest }) => (
  <Field
    name={id}
    validate={validate}
    render={({ input, meta }) => (
      <div className="mt-4">
        <label htmlFor="first-name" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2 dark:text-gray-200">
          {label}
        </label>
        <div className="mt-1">
          <input
            className={`
              p-3 block w-full shadow-sm sm:text-sm border rounded-md 
              border-gray-300 focus:border-blue-500 focus:ring-blue-500
              dark:bg-gray-900
              text-gray-900 dark:text-gray-100
              disabled:text-gray-400 disabled:cursor-not-allowed disabled:bg-gray-100 
              disabled:dark:text-gray-500 disabled:dark:bg-gray-700 disabled:dark:border-gray-700"
              ${meta.touched && meta.error && 'border-red-400 text-red-900 placeholder-red-300'}`}
            {...rest}
            {...input}
          />
        </div>
        <div className="mt-1">
          {meta.touched && meta.error && <span className="text-red-400 text-sm">{meta.error}</span>}
        </div>
      </div>
    )}
  />
)