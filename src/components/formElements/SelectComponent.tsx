import React, { ChangeEvent } from 'react';

interface SelectComponentProps {
    label: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
    options?: OptionItem[];
}

interface OptionItem {
    id: string;
    label: string;
}

export default function SelectComponent(SelectComponentProps: SelectComponentProps) {
    const { label, value, onChange, options = [], } = SelectComponentProps;
    return (
        <div className="relative">
            <p className="pt-0 pr-2 absolute pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600 bg-white">
                {label}
            </p>
            <select
                value={value}
                onChange={onChange}
                className="border placeholder-gray-400 text-gray-800 focus:outline-none focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mr-0 mt-0 ml-0 text-base block bg-white border-gray-300 rounded-md"
            >
                {options && options.length ? (
                    options.map((optionItem) => (
                        <option
                            id={optionItem.id}
                            value={optionItem.id}
                            key={optionItem.id}
                        >
                            {optionItem.label}
                        </option>
                    ))
                ) : (
                    <option id="" value={""}>
                        Select
                    </option>
                )}
            </select>
        </div>
    );
}