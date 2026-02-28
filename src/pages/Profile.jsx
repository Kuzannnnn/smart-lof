import React, { useState, useEffect } from 'react';
import { User, MapPin, ArrowLeft, Building2, Save, Edit2, Loader2 } from 'lucide-react';
import { supabase } from '../supabaseClient';

const Profile = ({ setCurrentView, user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false); // separate loading state for the save button
  
  const [profileData, setProfileData] = useState({
    fullName: "",
    company: "",
    address: ""
  });

  // Fetch profile data on load
  useEffect(() => {
    const fetchProfile = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (data) {
        setProfileData({
          fullName: data.full_name || "",
          company: data.company_name || "",
          address: data.address || ""
        });
      }
      setLoading(false);
    };
    
    if (user?.id) fetchProfile();
  }, [user]);

  const handleSave = async () => {
    setSaving(true);
    const { error } = await supabase.from('profiles').upsert({
      id: user.id,
      full_name: profileData.fullName,
      company_name: profileData.company,
      address: profileData.address,
      updated_at: new Date()
    });

    if (!error) {
      setIsEditing(false);
    } else {
      alert(error.message);
    }
    setSaving(false);
  };

  if (loading && !isEditing) return <div className="flex justify-center p-20"><Loader2 className="animate-spin text-emerald-500" size={40} /></div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-900">Profile Settings</h1>
        <button onClick={() => setCurrentView('overview')} className="flex items-center gap-2 text-emerald-600 font-bold bg-emerald-50 px-4 py-2 rounded-xl hover:bg-emerald-100 transition-colors">
          <ArrowLeft size={18} /> Back
        </button>
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 p-10 space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Full Name Field */}
          <div className={`p-6 rounded-3xl border transition-all ${isEditing ? 'bg-white border-emerald-500 ring-4 ring-emerald-50' : 'bg-gray-50 border-transparent'}`}>
            <div className="flex items-center gap-3 mb-2 text-emerald-600">
              <User size={20} />
              <span className="text-xs font-black uppercase tracking-wider">Full Name</span>
            </div>
            {isEditing ? (
              <input 
                value={profileData.fullName}
                onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                className="w-full bg-transparent border-b-2 border-emerald-200 focus:border-emerald-500 outline-none font-bold text-gray-800 transition-colors py-1"
                placeholder="Enter your full name"
              />
            ) : (
              <p className="text-gray-800 font-bold">{profileData.fullName || "Not set"}</p>
            )}
          </div>

          {/* Company Name Field */}
          <div className={`p-6 rounded-3xl border transition-all ${isEditing ? 'bg-white border-emerald-500 ring-4 ring-emerald-50' : 'bg-gray-50 border-transparent'}`}>
            <div className="flex items-center gap-3 mb-2 text-emerald-600">
              <Building2 size={20} />
              <span className="text-xs font-black uppercase tracking-wider">Company Name</span>
            </div>
            {isEditing ? (
              <input 
                value={profileData.company}
                onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                className="w-full bg-transparent border-b-2 border-emerald-200 focus:border-emerald-500 outline-none font-bold text-gray-800 transition-colors py-1"
                placeholder="Enter your company name"
              />
            ) : (
              <p className="text-gray-800 font-bold">{profileData.company || "Not set"}</p>
            )}
          </div>

          {/* Address Field (Spans full width) */}
          <div className={`md:col-span-2 p-6 rounded-3xl border transition-all ${isEditing ? 'bg-white border-emerald-500 ring-4 ring-emerald-50' : 'bg-gray-50 border-transparent'}`}>
            <div className="flex items-center gap-3 mb-2 text-emerald-600">
              <MapPin size={20} />
              <span className="text-xs font-black uppercase tracking-wider">Address</span>
            </div>
            {isEditing ? (
              <input 
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                className="w-full bg-transparent border-b-2 border-emerald-200 focus:border-emerald-500 outline-none font-bold text-gray-800 transition-colors py-1"
                placeholder="Enter your full address"
              />
            ) : (
              <p className="text-gray-800 font-bold">{profileData.address || "Not set"}</p>
            )}
          </div>

        </div>

        <button 
          onClick={isEditing ? handleSave : () => setIsEditing(true)}
          disabled={saving}
          className="w-full bg-gray-900 text-white font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-800 transition-all transform active:scale-[0.98]"
        >
          {saving ? (
            <Loader2 className="animate-spin" size={20} />
          ) : isEditing ? (
            <><Save size={20} /> Save to Database</>
          ) : (
            <><Edit2 size={20} /> Edit Profile</>
          )}
        </button>
      </div>
    </div>
  );
};

export default Profile;