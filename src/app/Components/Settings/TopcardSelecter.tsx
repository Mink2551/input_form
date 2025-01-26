import React, { JSX } from 'react';

function TopcardSelecter({selectedCard, handleSelect} : {selectedCard: string, handleSelect:(name: string) => void}): JSX.Element {
    const Topcard = ({ name }: { name: string }): JSX.Element => {
        return (
            <h2
                onClick={() => handleSelect(name)}
                className={`
                    ${name === selectedCard ? "translate-y-0 text-gray-600 opacity-100" : "rounded-b-xl translate-y-5 opacity-60"} 
                    duration-300 w-fit cursor-pointer bg-white rounded-t-lg shadow-xl text-gray-400 font-bold px-4 py-2
                    capitalize transform hover:translate-y-2 hover:opacity-100
                `}
            >
                {name} Settings
            </h2>
        );
    };

    return (
        <div className="flex gap-4">
            <Topcard name="profile" />
            <Topcard name="department" />
            <Topcard name="contact" />
        </div>
    );
}

export default TopcardSelecter;
