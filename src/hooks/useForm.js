import { useState } from 'react';

export const useForm = (initialValue) => {
    const [value, setValue] = useState(initialValue);

    return [
        value,
        e => setValue(e.target.value)
    ]
}