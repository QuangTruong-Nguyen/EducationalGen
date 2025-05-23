
// 'use client'

// import React from "react"
// import { useDropzone } from "react-dropzone"
// import { Inbox } from "lucide-react"

// type Props = {}

// const FileUpload = () => {
//     const { getRootProps, getInputProps } = useDropzone({
//         accept: { "application/pdf" : [".pdf"]},
//         maxFiles: 1,
//         onDrop: (acceptedFiles) => {
//             console.log(acceptedFiles);
//         }
//     });
    
//     return <div className="p-2 bg-white rounded-xl">
//         <div {...getRootProps({
//             className: "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col"
//         })}
//         >                    
            
//         <input {...getInputProps()} />
//         <>
//             <Inbox className="w-10 h-10 text-blue-500" />
//             <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
//         </>
//         </div>
//     </div>
// }

// export default FileUpload;
// /components/FileUpload.tsx
// import React from "react";

// const FileUpload = ({ onFileSelected }: { onFileSelected: (file: File) => void }) => {
//   return (
//     <input
//       type="file"
//       onChange={e => {
//         if (e.target.files && e.target.files[0]) {
//           onFileSelected(e.target.files[0]);
//         }
//       }}
//     />
//   );
// };

// export default FileUpload;


// /components/FileUpload.tsx
"use client";

import React from "react";
import { useDropzone } from "react-dropzone";
import { Inbox } from "lucide-react";

type FileUploadProps = {
  onFileSelected: (file: File) => void;
};

const FileUpload = ({ onFileSelected }: FileUploadProps) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "application/pdf": [".pdf"] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      if (acceptedFiles && acceptedFiles[0]) {
        onFileSelected(acceptedFiles[0]);
      }
    },
  });

  return (
    <div className="p-2 bg-white rounded-xl">
      <div
        {...getRootProps({
          className:
            "border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center flex-col",
        })}
      >
        <input {...getInputProps()} />
        <>
          <Inbox className="w-10 h-10 text-blue-500" />
          <p className="mt-2 text-sm text-slate-400">Drop PDF here</p>
        </>
      </div>
    </div>
  );
};

export default FileUpload;
