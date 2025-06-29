import { Upload } from 'lucide-react';
import React, { useRef } from 'react';

export default function UploadImagesCard({ data, updateData, next, prev }) {
  const inputRef = useRef();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files); // Array of File objects
    updateData({
      ...data,
      images: [...(data.images || []), ...files], // Appending new files to existing
    });
  };

  return (
    <div className="image-upload-section">
      <label>Photos</label>
      <button
        type="button"
        onClick={() => inputRef.current.click()}
        className="upload-button"
      >
        <Upload size={24} />
        <span>Upload Photos</span>
      </button>

      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        style={{ display: 'none' }}
      />

      {/* Display previews */}
      <div>
        {data.images && data.images.map((file, i) => {
          const previewUrl = typeof file === 'string' ? file : URL.createObjectURL(file);
          return <img key={i} src={previewUrl} alt={`preview-${i}`} width={100} />;
        })}
      </div>


      <div className="prev-next">
            <img className="prev" src="/previous.png" onClick={prev} disabled={true}/>
            <img className="next" src="/next.png" onClick={next}  disabled={!data?.business_type}/>
    </div>
    </div>
  );
}
