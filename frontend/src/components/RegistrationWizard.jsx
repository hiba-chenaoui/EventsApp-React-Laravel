import React, {useContext, useState} from 'react'

import { AppContext } from "../context/AppContext";
import BusinessTypeCard from './BusinessTypeCard';
import BusinessInfoCard from './BusinessInfoCard';
import SpaceInfoCard from './SpaceInfoCard';
import SpaceTypeCard from './SpaceTypeCard';

import '../styles/RegistrationWizard.css'
import SpaceLocationCard from './SpaceLocation';
import CapacityAndAvailability from './Capacity&Availability';

export default function RegistrationWizard(){
    const {user, token} = useContext(AppContext);
    const [step, setStep] = useState(1);

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
            //pricing: '',
            //amenities: [],
            },
    });
    const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);
  console.log("Current step:", step);
  console.log('data :', formData);


    function updateFormData(section, data){
        setFormData(prev=>({
            ...prev,
            [section]:{
                ...prev[section],
                ...data
                 }
        }));
    };

    const handleSubmit= async ()=>{
        try {
            const res= await fetch('/api/register-business',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData.business),
            });
            const result = await res.json();
            console.log(result);
        }catch (err) {
      console.error(err);
    }
    };

    return (
        <>
          {/* Service-provider without background */}
          {user.role === "Service-provider" && (
            <div className="wizard-container">
              <h1>Awesome, {user.name}!</h1>
      
              {step === 1 && (
                <BusinessTypeCard
                  data={formData.business}
                  updateData={(data) => updateFormData('business', data)}
                  next={next}
                  prev={prev}
                />
              )}
              {step === 2 && (
                <BusinessInfoCard
                  data={formData.business}
                  updateData={(data) => updateFormData('business', data)}
                  next={next}
                  prev={prev}
                />
              )}
              {step === 3 && (
                <SpaceInfoCard
                  data={formData.space}
                  updateData={(data) => updateFormData('space', data)}
                  next={next}
                  prev={prev}
                />
              )}
              {step === 4 && (
                <SpaceTypeCard
                  data={formData.space}
                  updateData={(data) => updateFormData('space', data)}
                  next={next}
                  prev={prev}
                />
              )}
              {step === 5 && (
                <SpaceLocationCard
                  data={formData.space}
                  updateData={(data) => updateFormData('space', data)}
                  next={next}
                  prev={prev}
                />
              )}
              {step === 6 && (
                <CapacityAndAvailability
                  data={formData.space}
                  updateData={(data) => updateFormData('space', data)}
                  next={next}
                  prev={prev}
                />
              )}
            </div>
          )}
      
          
        </>
      );
      
}