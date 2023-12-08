import React, { ChangeEvent } from 'react';

interface InputComponentProps {
    label: string;
    placeholder: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type?: string;
}

export default function InputComponent(InputComponentProps: InputComponentProps) {
    const { label, placeholder, onChange, value, type, } = InputComponentProps
    return (
        <div className="relative">
            <p className="pt-0 pr-2 pb-0 pl-2 absolute -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                {label}
            </p>
            <input
                placeholder={placeholder}
                type={type || "text"}
                value={value}
                onChange={onChange}
                className="border placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
            />
        </div>
    );
}