import { useEffect, useState } from "react";
import { DivInput, InputInput, InputLabel, InputTextLabel } from "./style";

interface InputComponentProps {
    label: string;
    name: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    required?: boolean
}

export default function InputComponent({ label, name, value, onChange, type = "text", required = false }: InputComponentProps) {
    const [isTrue, setIsTrue] = useState(false)

    useEffect(() => {
        const hasValue = value.length > 0;
        setIsTrue(hasValue);
    }, [value]);

    return (
        <DivInput>
            <InputLabel $focusField={false}>
                <InputTextLabel $focusField={isTrue}>{label}</InputTextLabel>
                <InputInput
                    type={type}
                    name={name}
                    value={value}
                    required={required}
                    onChange={onChange}
                />
            </InputLabel>
        </DivInput >
    );
}
