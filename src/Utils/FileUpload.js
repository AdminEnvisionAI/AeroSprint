import React, { useState } from 'react';
import { PrimaryButton } from '@fluentui/react';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = () => {
        // Handle file upload logic here
        console.log(selectedFile);
    };

    return (       
              <>
                <label for='File'>File</label>
                <input type="file" onChange={handleFileChange} />
                <PrimaryButton text="Upload File" onClick={handleUpload} />
            </>
        
    );
};

export default FileUpload;