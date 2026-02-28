// src/components/ActiveBatches.jsx
import React, { useState } from 'react';
import { History as HistoryIcon, Plus, Trash2, ChevronDown, ChevronUp, Clock, CheckCircle } from 'lucide-react';
import BatchItem from './BatchItem.jsx';

const ActiveBatches = () => {
  const getCurrentDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return 'Unknown Date';
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const [batches, setBatches] = useState([
    { id: '001', status: 'Completed', activeAt: '2026-02-20T08:00', completedAt: '2026-02-20T17:30' },
    { id: '002', status: 'Active', activeAt: '2026-02-28T09:15', completedAt: '' },
  ]);

  const [expandedId, setExpandedId] = useState(null);
  
  // New state for handling the alert notification
  const [alert, setAlert] = useState({ show: false, message: '' });

  // Helper function to trigger the alert and auto-hide it after 3 seconds
  const triggerAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: '' });
    }, 3000);
  };

  const addBatch = () => {
    const newId = (batches.length + 1).toString().padStart(3, '0');
    const newBatch = { 
      id: newId, 
      status: 'Active', 
      activeAt: getCurrentDateTime(),
      completedAt: ''
    };
    setBatches([newBatch, ...batches]);
    setExpandedId(newId);
    triggerAlert(`Batch ${newId} created successfully.`);
  };

  const toggleStatus = (id) => {
    setBatches(batches.map(batch => {
      if (batch.id === id) {
        const isNowCompleted = batch.status === 'Active';
        return { 
          ...batch, 
          status: isNowCompleted ? 'Completed' : 'Active',
          completedAt: isNowCompleted ? getCurrentDateTime() : ''
        };
      }
      return batch;
    }));
  };

  const updateBatchTime = (id, field, value) => {
    setBatches(batches.map(batch => 
      batch.id === id ? { ...batch, [field]: value } : batch
    ));
  };

  const deleteBatch = (id) => {
    setBatches(batches.filter(batch => batch.id !== id));
    // Trigger the delete notification here
    triggerAlert(`Batch ${id} has been successfully deleted.`);
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-white p-6 md:p-8 rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 w-full relative">
      
      {/* Alert Notification */}
      {alert.show && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={16} />
            {alert.message}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <HistoryIcon size={20} className="text-emerald-500" />
          <h2 className="text-lg md:text-xl font-black text-gray-800">Batch Management</h2>
        </div>
        
        <button 
          onClick={addBatch}
          className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-100 transition-colors flex items-center gap-1 text-xs font-bold"
        >
          <Plus size={16} /> New Batch
        </button>
      </div>

      <div className="flex flex-col gap-3 w-full">
        {batches.length > 0 ? (
          batches.map((batch) => (
            <div key={batch.id} className="border border-gray-100 rounded-2xl bg-white overflow-hidden shadow-sm">
              <div className="flex items-center gap-2 p-2 hover:bg-gray-50 transition-colors">
                <div className="flex-1 cursor-pointer" onClick={() => toggleStatus(batch.id)}>
                  <BatchItem 
                    id={batch.id} 
                    status={batch.status} 
                    date={formatDisplayDate(batch.activeAt)} 
                  />
                </div>
                
                <button 
                  onClick={() => toggleExpand(batch.id)}
                  className="p-2 text-gray-400 hover:text-emerald-600 transition-colors bg-gray-50 rounded-lg"
                  title="Edit Times"
                >
                  {expandedId === batch.id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>

                <button 
                  onClick={() => deleteBatch(batch.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors bg-red-50/50 rounded-lg"
                  title="Delete Batch"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              {expandedId === batch.id && (
                <div className="p-4 bg-gray-50 border-t border-gray-100 space-y-4 animate-in slide-in-from-top-2 duration-200">
                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> Time Started (Active)
                    </label>
                    <input 
                      type="datetime-local" 
                      value={batch.activeAt}
                      onChange={(e) => updateBatchTime(batch.id, 'activeAt', e.target.value)}
                      className="text-sm p-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                    />
                  </div>

                  <div className={`flex flex-col gap-1 transition-opacity ${batch.status === 'Completed' ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    <label className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Clock size={12} /> Time Completed
                    </label>
                    <input 
                      type="datetime-local" 
                      value={batch.completedAt}
                      onChange={(e) => updateBatchTime(batch.id, 'completedAt', e.target.value)}
                      className="text-sm p-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 bg-white"
                      disabled={batch.status !== 'Completed'}
                    />
                    {batch.status !== 'Completed' && (
                      <span className="text-[10px] text-gray-400 italic">Toggle status to 'Completed' to unlock.</span>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center text-gray-400 py-4 italic text-sm">No batches found. Start a new run!</p>
        )}
      </div>
    </div>
  );
};

export default ActiveBatches;