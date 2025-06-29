import { useState } from 'react';
export default function Pricing({ data, updateData}) {
    const [pricePerHour, setPricePerHour] = useState(data.pricePerHour || "");
    const [pricePerDay, setPricePerDay] = useState(data.pricePerDay || "");

    const handlePriceChange = (name, value) => {
        if (name === "pricePerHour") setPricePerHour(value);
        else if (name === "pricePerDay") setPricePerDay(value);

        updateData({ [name]: value });
    };

    return (
        <div className="pricing-container">
            <div className="price-form">
                <h3>Price per hour</h3>
                <input
                    type="number"
                    value={pricePerHour}
                    onChange={(e) => handlePriceChange("pricePerHour", e.target.value)}
                />
            </div>
            <div className="price-form">
                <h3>Price per day</h3>
                <input
                    type="number"
                    value={pricePerDay}
                    onChange={(e) => handlePriceChange("pricePerDay", e.target.value)}
                />
            </div>
        </div>
    );
}
