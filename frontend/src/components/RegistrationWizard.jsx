import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'; 

import { AppContext } from "../context/AppContext";
import ProgressBar from './ProgressBar';
import BusinessTypeCard from './BusinessTypeCard';
import BusinessInfoCard from './BusinessInfoCard';
import SpaceInfoCard from './SpaceInfoCard';
import SpaceTypeCard from './SpaceTypeCard';
import EquipmentListCard from './EquipmentListCard';


import '../styles/RegistrationWizard.css'
import SpaceLocationCard from './SpaceLocation';
import CapacityAndAvailability from './Capacity&Availability';
import Pricing from './Pricing';
import Amenities from './FormAmenities';

export default function RegistrationWizard(){
    const {user, token} = useContext(AppContext);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

     const [formData, setFormData] = useState({
            business: {
            company_name: '',
            description: '',
            phone: '',
            business_type: '',
            },
            space: {
            name: '',
            description: '',
            type_of_space: '',
            address: '',
            capacity: '',
            availibility :'' ,
            price_per_hour: '',
            price_per_day: '',
            amenities: {
                wifi: false,
                parking: false,
                projector: false,
                whiteboard: false,
                airConditioning: false,
                heating: false,
                restrooms: false,
                security: false,
                soundSystem: false,
                lightingEquipment: false,
                Soundproof: false,
                Lockers: false,
                },
            },
            equipments: [] 
    });
    const getSteps = () => {
        if (formData.business.business_type === "Equipment provider") {
            return [
            "BusinessType",
            "BusinessInfo",
            "Equipments"
            ];
        } else {
            return [
            "BusinessType",
            "BusinessInfo",
            "SpaceInfo",
            "SpaceType",
            "SpaceLocation",
            "CapacityAndAvailability",
            "PricingAndAmenities"
            ];
        }
        };

    const steps = getSteps();

   const next = () => {
    const steps = getSteps(); // recalculate in case business_type changed
    if (step < steps.length) {
        setStep(step + 1);
    }};

  const prev = () =>  
    {
        if (step > 1) {
        setStep(step - 1);
        }
    };

  console.log("Current step:", step);
  console.log('data :', formData);


    function updateFormData(section, data) {
        setFormData(prev => {
            if (section === 'equipments' && Array.isArray(data)) {
            // For equipments (array), replace the entire array
            return {
                ...prev,
                [section]: data
            };
            }

            // For other sections (objects), merge as usual
            return {
            ...prev,
            [section]: {
                ...prev[section],
                ...data
            }
            };
        });
        }

    const handleSubmit = async () => {
    try {
        const endpoint = formData.business.business_type === "Equipment provider"
        ? '/api/equipment-provider/create'
        : '/api/business-space/create';
        console.log("Endpoint:", endpoint);
        const body =
        formData.business.business_type === "Equipment provider"
            ? {
                business: formData.business,
                equipments: formData.equipments
            }
            : {
                business: formData.business,
                space: formData.space
            };

        const res = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
        });

        const result = await res.json();
        navigate('/businessProfile');
        } catch (err) {
            console.error(err);
        }
    };


    return(
        <div className="wizard-container">
        <ProgressBar currentStep={step} totalSteps={steps.length} />
        {user.role ==="Service-provider" && (
       
            <div className="space-registration-card">
            {steps[step - 1] === "BusinessType" && (
            <BusinessTypeCard 
                data={formData.business}
                updateData={data => updateFormData('business', data)}
                next={next}
                prev={prev}
                username={user.name}
            />
            )}

            {steps[step - 1] === "BusinessInfo" && (
            <BusinessInfoCard
                data={formData.business}
                updateData={data => updateFormData('business', data)}
                next={next}
                prev={prev}
            />
            )}

            {steps[step - 1] === "SpaceInfo" && (
            <SpaceInfoCard
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                next={next}
                prev={prev}
            />
            )}

            {steps[step - 1] === "SpaceType" && (
            <SpaceTypeCard
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                next={next}
                prev={prev}
            />
            )}

            {steps[step - 1] === "SpaceLocation" && (
            <SpaceLocationCard
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                next={next}
                prev={prev}
            />
            )}

            {steps[step - 1] === "CapacityAndAvailability" && (
            <CapacityAndAvailability
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                next={next}
                prev={prev}
            />
            )}

            {steps[step - 1] === "PricingAndAmenities" && (
            <>
                <Pricing
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                />
                <Amenities
                data={formData.space}
                updateData={data => updateFormData('space', data)}
                prev={prev}
                onSubmit={handleSubmit}
                />
            </>
            )}

            {steps[step - 1] === "Equipments" && (
            <EquipmentListCard
                data={formData.equipments}
                updateData={data => updateFormData('equipments', data)}
                prev={prev}
                onSubmit={handleSubmit}
            />
            )}
                        
            </div>
        )}
        </div>
    )
}