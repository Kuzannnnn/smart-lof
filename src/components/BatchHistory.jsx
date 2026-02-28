// src/components/BatchHistory.jsx
import React, { useState } from 'react';
import { Trash2, CheckCircle } from 'lucide-react';
import BatchItem from './BatchItem.jsx';

const BatchHistory = () => {
  // Convert hardcoded items into state so we can delete them
  const [batches, setBatches] = useState([
    { id: '002', status: 'Active', date: 'Feb 28, 2026' },
    { id: '001', status: 'Completed', date: 'Feb 20, 2026' },
    { id: '000', status: 'Completed', date: 'Feb 10, 2026' },
  ]);

  // Alert state for notifications
  const [alert, setAlert] = useState({ show: false, message: '' });

  // Function to show the alert and auto-hide it after 3 seconds
  const triggerAlert = (message) => {
    setAlert({ show: true, message });
    setTimeout(() => {
      setAlert({ show: false, message: '' });
    }, 3000);
  };

  // Function to handle deleting a batch
  const deleteBatch = (id) => {
    setBatches(batches.filter(batch => batch.id !== id));
    triggerAlert(`Batch ${id} has been successfully deleted.`);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500 w-full relative">
      
      {/* Alert Notification */}
      {alert.show && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-4 py-2 rounded-full shadow-lg flex items-center gap-2 text-sm font-semibold">
            <CheckCircle size={16} />
            {alert.message}
          </div>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-black text-gray-900 tracking-tight">Batch Records</h1>
      
      <div className="bg-white rounded-3xl md:rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden w-full">
        <div className="flex flex-col divide-y divide-gray-50 w-full">
          {batches.length > 0 ? (
            batches.map((batch) => (
              <div key={batch.id} className="flex items-center justify-between p-2 md:p-4 hover:bg-gray-50 transition-colors">
                {/* Batch Item Container */}
                <div className="flex-1">
                  <BatchItem 
                    id={batch.id} 
                    status={batch.status} 
                    date={batch.date} 
                  />
                </div>
                
                {/* Delete Button */}
                <button 
                  onClick={() => deleteBatch(batch.id)}
                  className="p-3 ml-2 md:ml-4 text-gray-400 hover:text-red-500 transition-colors bg-red-50/0 hover:bg-red-50 rounded-xl"
                  title="Delete Record"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-gray-400 italic text-sm">
              No batch records found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BatchHistory;