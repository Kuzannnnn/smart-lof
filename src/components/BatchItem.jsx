import React from 'react';
import { Activity, CheckCircle2 } from 'lucide-react';

const BatchItem = ({ id, status, date }) => {
  const isActive = status === 'Active';

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 sm:p-5 bg-gray-50 hover:bg-gray-100/50 transition-colors rounded-2xl md:rounded-3xl border border-gray-100 w-full gap-4">
      
      <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
        <div className={`p-3 rounded-xl shadow-sm flex-shrink-0 ${isActive ? 'bg-emerald-100 text-emerald-600' : 'bg-white text-gray-400 border border-gray-200'}`}>
          {isActive ? <Activity size={20} /> : <CheckCircle2 size={20} />}
        </div>
        <div className="flex flex-col flex-1">
          <span className="text-sm md:text-base font-black text-gray-900">Batch #{id}</span>
          <span className="text-[10px] md:text-xs font-bold text-gray-500 uppercase tracking-wide">{date}</span>
        </div>
      </div>

      <div className={`px-4 py-2 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest w-full sm:w-auto text-center ${
        isActive 
          ? 'bg-emerald-500 text-white shadow-md shadow-emerald-200' 
          : 'bg-gray-200 text-gray-500'
      }`}>
        {status}
      </div>
      
    </div>
  );
};

export default BatchItem;