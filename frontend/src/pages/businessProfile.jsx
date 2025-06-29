import React, { useEffect, useState , useContext} from 'react';
import { MapPin, Phone, Users, DollarSign, Heart, Calendar, Leaf, Activity, Edit, Eye, Save, X, Check, Star, Wifi, Car, Coffee, Music, Dumbbell, Camera, Upload } from 'lucide-react';
import '../styles/BusinessProfile.css'; 
import Sidebar from '../components/sidebar';
import NewSpaceWizard from '../components/newSpaceWizard';
import BusinessHeader from '../components/BusinessHeader';
import SpaceCard from '../components/SpaceCard';
import EquipmentCard from '../components/EquipmentCard';
import AddEquipmentForm from '../components/AddEquipmentForm';
import { AppContext } from "../context/AppContext";
import SpaceBookings from '../components/SpaceBookings';
import { useNavigate } from 'react-router-dom'; 

const BusinessProfile = () => {
  
  const {token} = useContext(AppContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAddSpace, setShowAddSpace] = useState(false);
  const [showAddEquipment, setShowAddEquipment] = useState(false);
  const [editingSpace, setEditingSpace] = useState(null);
  const [spaceForm, setSpaceForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [viewBookings, setViewBookings] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [availableAmenities, setAvailableAmenities] = useState([]);
  const [amenities, setAmenities] = useState({});
  const navigate = useNavigate();
  
  

  useEffect(() => {
    fetch('api/business-space/showAllSpaces', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((res) => {
        console.log("Fetched data:", res);
        setData({
        ...res,
        equipments: (res.equipments || []).filter(Boolean), // Remove any null
      });
        setLoading(false);
        console.log("Fetched spaces:", res);
      })
      .catch((error) => {
        console.error("Error fetching spaces:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() =>{
    const getAminities= async() => {
    const response = await fetch('api/amenities');
    const aminitydata = await response.json();
    setAvailableAmenities(aminitydata.amenities.map(a => a.name));
    };
    getAminities();
  }, []);

  const getAmenityIcon = (amenity) => {
      const amenityLower = amenity.toLowerCase();
      if (amenityLower.includes('wifi') || amenityLower.includes('internet')) return <Wifi size={14} />;
      if (amenityLower.includes('parking') || amenityLower.includes('car')) return <Car size={14} />;
      if (amenityLower.includes('coffee') || amenityLower.includes('tea')) return <Coffee size={14} />;
      if (amenityLower.includes('sound') || amenityLower.includes('music')) return <Music size={14} />;
      if (amenityLower.includes('gym') || amenityLower.includes('fitness')) return <Dumbbell size={14} />;
      return <Activity size={14} />;
    };
  const handleEditSpace = (space, index) => {
    setSpaceForm({
      ...space,
      index: index,
      amenities: space.amenities.join(', '),
      images: space.images || []
    });
    setEditingSpace(index);
  };
  

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // In a real app, you'd upload to a service and get URLs back
    const imageUrls = files.map(file => URL.createObjectURL(file));
    setSpaceForm({
      ...spaceForm,
      images: [...(spaceForm.images || []), ...imageUrls]
    });
  };

  const handleSaveSpace = async () => {
    setSaving(true);
    const spaceData = {
      ...spaceForm,
    };
    delete spaceData.index;
    console.log("updating:", data.spaces[editingSpace].id);

    try {
      const response = await fetch(`api/business-space/update/${data.spaces[editingSpace].id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(spaceData),
      });

      if (!response.ok) {
        throw new Error("Failed to update space");
      }

      const updatedSpace = await response.json();
      setData(prev => ({
        ...prev,
        spaces: prev.spaces.map((space, index) => 
          index === editingSpace ? updatedSpace : space
        )
      }));
      setEditingSpace(null);
      navigate('/businessProfile');
      setSuccessMessage('Space updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (error) {
      console.error("Error updating space:", error);
      alert('Failed to update space information');
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateEquipment = async (updatedEquipment) => {
  const token = localStorage.getItem("token");
  try {
    const res = await fetch(`/api/equipments/update/${updatedEquipment.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(updatedEquipment),
    });

    if (!res.ok) throw new Error("Failed to update equipment");

    const saved = await res.json();
    console.log("Equipment updated:", saved);
    setData((prev) => ({
      ...prev,
      equipments: prev.equipments.map((eq) =>{
        console.log("Comparing equipment:", eq.id, "with saved:", saved.id);
        return eq.id === saved.equipment.id ? saved.equipment : eq;
      }
        
      ),
    }));
  } catch (error) {
    console.error(error);
    alert("Could not save equipment.");
  }
};

const handleAddEquipment = async (formData)=>{
    try{
        const res= await fetch('/api/addEquipment',{
            method : "POST",
            headers: {
                'Content-Type': 'application/json',
                 "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        });
        const result = await res.json();
            console.log("New equipment added:", result);
            setData((prev) => ({
              ...prev,
              equipments: [...prev.equipments, result.equipment],
            }));
            console.log("New data added:", data);
             
    }catch (err) {
        console.error(err);
    }
   }

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.street}, ${address.city}, ${address.state}`;
  };

  if (loading) return <div className="loading-container"><p>Loading your spaces...</p></div>;
  if (!data) return <div className="no-data-container"><p>No spaces found.</p></div>;

  const { business, spaces, equipments } = data;
  console.log("Equipments data:", equipments);

  return (

    <div className="space-profile-container">
      
      <BusinessHeader business={business} spaces={spaces}/>

      {viewBookings && (
        <SpaceBookings spaceId={viewBookings} onClose={() => setViewBookings(null)}/>
      )}
      
      <div className="spaces-section">
       {business.business_type === "Space Provider" && (
        <>
          <h2>Your Wellness Spaces</h2>
          <button className="add-space-btn" onClick={() => setShowAddSpace(true)}>
            <span>+</span> Add New Space
          </button>
          {showAddSpace && <NewSpaceWizard />}

          <div className="spaces-grid">
            {spaces.map((space, index) => (
              
              <SpaceCard
                key={index}
                space={space}
                index={index}
                editingSpace={editingSpace}
                spaceForm={spaceForm}
                setSpaceForm={setSpaceForm}
                handleEditSpace={handleEditSpace}
                handleSaveSpace={handleSaveSpace}
                cancelEdit={() => setEditingSpace(null)}
                saving={saving}
                handleImageUpload={handleImageUpload}
                onViewBookings={() => setViewBookings(space.id)}
              />
            ))}
            </div>
          </>
        )}


        {business.business_type === "Equipment Provider" && (
              <>
              <h2>Your Equipments</h2>

               <button className="add-space-btn" onClick={() => setShowAddEquipment(true)}>
                <span>+</span> Add New Equipment
              </button>

              {showAddEquipment && <AddEquipmentForm onSubmit={handleAddEquipment}/>}
              <div className="equipments-grid">
                {data.equipments.map((equipment, index) => (
                  <EquipmentCard key={index} equipment={equipment}  onSave={(updatedEquipment)=>handleUpdateEquipment(updatedEquipment)}/>
                ))}
              </div>
            </>
          )}
      </div>
  </div>
);
};
              

export default BusinessProfile;