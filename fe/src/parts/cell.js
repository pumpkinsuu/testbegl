import React from "react";


export default function EditableCell ({
      value: initialValue,
      row: { index },
      column: { id },
      updateMyData,
  }) {
    const [value, setValue] = React.useState(initialValue)
    const onChange = e => {
        setValue(e.target.value)
    }
    const onBlur = () => {
        updateMyData(index, id, value)
    }

    React.useEffect(() => {
        setValue(initialValue)
    }, [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} />
}
