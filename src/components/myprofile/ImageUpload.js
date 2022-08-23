import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// Import React FilePond
import { FilePond, registerPlugin } from 'react-filepond';

// Import FilePond styles
import 'filepond/dist/filepond.min.css';

// Note: These need to be installed separately
// `npm i filepond-plugin-image-preview filepond-plugin-image-exif-orientation --save`
import FilePondPluginImageExifOrientation from 'filepond-plugin-image-exif-orientation';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';

// Register the plugins
registerPlugin(FilePondPluginImageExifOrientation, FilePondPluginImagePreview);

// Our app
function ImageUpload({id}) {
    const [files, setFiles] = useState([]);
    const  fileUploaded = () => {
        // alert("File uploaded")
    }
    return (
        <div className="App">
            <FilePond
                files={files}
                onupdatefiles={fileUploaded}
                server={process.env.REACT_APP_API_URL+`user/upload-image/${id}`}
                name="file"
                labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
            />
        </div>
    );
}
export default ImageUpload
