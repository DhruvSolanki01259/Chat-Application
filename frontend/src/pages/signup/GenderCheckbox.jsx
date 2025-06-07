const GenderCheckbox = () => {
  return (
    <div className='flex gap-6 mt-2 p-2'>
      {/* Male Option */}
      <div className='form-control'>
        <label className='label cursor-pointer gap-2'>
          <input
            type='checkbox'
            className='checkbox checkbox-sm border-slate-700'
          />
          <span className='text-sm text-gray-200'>Male</span>
        </label>
      </div>

      {/* Female Option */}
      <div className='form-control'>
        <label className='label cursor-pointer gap-2'>
          <input
            type='checkbox'
            className='checkbox checkbox-sm border-slate-700'
          />
          <span className='text-sm text-gray-200'>Female</span>
        </label>
      </div>
    </div>
  );
};

export default GenderCheckbox;
