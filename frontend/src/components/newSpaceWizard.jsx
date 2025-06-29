import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'; 

import { AppContext } from "../context/AppContext";
import ProgressBar from './ProgressBar';
import SpaceInfoCard from './SpaceInfoCard';
import SpaceTypeCard from './SpaceTypeCard';


import '../styles/RegistrationWizard.css'
import SpaceLocationCard from './SpaceLocation';
import CapacityAndAvailability from './Capacity&Availability';
import Pricing from './Pricing';
import Amenities from './FormAmenities';

export default function NewSpaceWizard(){
    const {user, token} = useContext(AppContext);
    const [step, setStep] = useState(1);
    const navigate = useNavigate();

     const [formData, setFormData] = useState({
            
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
    });
    const next = () => {
        if (step < 6) {
        setStep(step + 1);
    }}
  const prev = () =>  {
            if (step > 1) {
            setStep(step - 1);
            }
        };

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
            const res= await fetch('/api/business-space/addSpace',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formData),
            });
            const result = await res.json();
            navigate('/businessProfile');
            console.log(result);
        }catch (err) {
      console.error(err);
    }
    };

    return(
        <div className="wizard-container">
        <ProgressBar currentStep={step} totalSteps={5} />
        {user.role ==="Service-provider" && (
       
            <div className="space-registration-card">
    
            {step ===1 && (
                <SpaceInfoCard  data={formData.space} 
                       updateData={data=>updateFormData('space', data)} next={next} prev={prev}/>
             )}

            
            {step===2 &&(
                <SpaceTypeCard data={formData.space}
                       updateData={data=>updateFormData('space', data)} next={next} prev={prev}/>
            )}

            {step===3 && (
                <SpaceLocationCard data={formData.space} 
                        updateData={data=>updateFormData('space', data)} next={next} prev={prev}/>
            )}
             
             {step===4 && (
                <CapacityAndAvailability data={formData.space}
                        updateData={data=>updateFormData('space', data)} next={next} prev={prev}/>

             )}

             {step===5 && (
                <>
                <Pricing data={formData.space}
                        updateData={data=>updateFormData('space', data)}/>
                <Amenities data={formData.space}
                        updateData={data=>updateFormData('space', data)} prev={prev} onSubmit={handleSubmit}/>
                </>
             )}
            
            </div>
        )}
        </div>
    )
}