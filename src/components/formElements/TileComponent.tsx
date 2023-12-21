import { sizes } from '@/types/productTypes';
import React, { FC } from 'react';

interface TileComponentProps {
    data: sizes[];
    selected: sizes[];
    onClick: (dataItem: sizes) => void;
}

const TileComponent: FC<TileComponentProps> = ({ data, selected, onClick }) => {
    return data && data.length ? (
        <div className="mt-3 flex flex-wrap items-center gap-1 text-black">
            {data.map((dataItem) => (
                <label
                    onClick={() => onClick(dataItem)}
                    className={`cursor-pointer ${selected &&
                        selected.length &&
                        selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                        ? "bg-black"
                        : ""
                        }`}
                    key={dataItem.id}
                >
                    <span
                        className={`rounded-lg border border-black px-6 py-2 font-bold ${selected &&
                            selected.length &&
                            selected.map((item) => item.id).indexOf(dataItem.id) !== -1
                            ? "text-white"
                            : ""
                            }`}
                    >
                        {dataItem.label}
                    </span>
                </label>
            ))}
        </div>
    ) : null;
}

export default TileComponent;