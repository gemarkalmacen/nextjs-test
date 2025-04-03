import React from 'react'

type CheckBoxProps = {
    id: string
    label: string
    checked?: boolean
    onChange: (checked: boolean) => void
    className?: string
}

const CheckBox: React.FC<CheckBoxProps> = ({ id, label, checked = false, onChange, className="" }) => {
  return (
    <div className={`flex items-center space-x-2 ${className}`}>
        <input 
            type="checkbox"
            id={id}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="w-3 h-3 lg:w-5 lg:h-5 text-blue-600 rounded-sm"
        />
        <label className="text-xs lg:text-sm font-medium text-gray-900" htmlFor={id}>
            {label}
        </label>
    </div>
  )
}

export default CheckBox