// 'use client'

// import React from "react"
// import { 
//     Drawer, 
//     DrawerClose,
//     DrawerContent, 
//     DrawerDescription,
//     DrawerFooter,
//     DrawerHeader, 
//     DrawerTitle, 
//     DrawerTrigger
// } from "@/components/ui/drawer"
// import { Button } from "@/components/ui/button"
// import { useDropzone } from "react-dropzone"
// import FileUpload from "./FileUpload"
// type Props = {}

// const UploadDrawer = ( {children} : { children: React.ReactNode }  ) => {
//     return (
//         <Drawer>
//             <DrawerTrigger>{children}</DrawerTrigger>
//             <DrawerContent>
//                 <DrawerHeader>
//                     <DrawerTitle>Are you absolutely sure?</DrawerTitle>
//                     <DrawerDescription>This action cannot be undone.</DrawerDescription>
//                 </DrawerHeader>

//                 <FileUpload />

//                 <DrawerFooter>
//                     <Button>Summit</Button>
//                     <DrawerClose>
//                         <Button variant="outline">Cancel</Button>
//                     </DrawerClose>
//                 </DrawerFooter>
//             </DrawerContent>
//         </Drawer>
//     )
// }

// export default UploadDrawer;

// /components/UploadDrawer.tsx/////////////////////////////////////////////////////
// "use client";

// import React, { useState } from "react";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Button } from "@/components/ui/button";
// import FileUpload from "./FileUpload";
// import { uploadToS3, getS3Url } from "@/lib/s3";

// const UploadDrawer = ({ children }: { children: React.ReactNode }) => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [isUploading, setIsUploading] = useState(false);
//   const [uploadResult, setUploadResult] = useState<{ file_key: string; file_name: string } | null>(null);
//   const [error, setError] = useState<string | null>(null);

//   const handleSubmit = async () => {
//     if (!selectedFile) {
//       setError("No file selected");
//       return;
//     }
//     setIsUploading(true);
//     setError(null);
//     setUploadResult(null);
//     try {
//       const result = await uploadToS3(selectedFile);
//       setUploadResult(result);
//       setError(null);
//     } catch (err) {
//       setError("Upload failed");
//     } finally {
//       setIsUploading(false);
//     }
//   };

//   return (
//     <Drawer>
//       <DrawerTrigger>{children}</DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader>
//           <DrawerTitle>Upload PDF to S3</DrawerTitle>
//           <DrawerDescription>Chỉ chấp nhận file PDF.</DrawerDescription>
//         </DrawerHeader>

//         <FileUpload onFileSelected={setSelectedFile} />

//         <div className="p-4">
//           {selectedFile && (
//             <p className="text-sm text-gray-700">Selected: {selectedFile.name}</p>
//           )}
//           {uploadResult && (
//             <p className="text-green-600 text-sm">
//               ✅ Uploaded:{" "}
//               <a
//                 href={getS3Url(uploadResult.file_key)}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 {uploadResult.file_name}
//               </a>
//             </p>
//           )}
//           {error && <p className="text-red-600 text-sm">⚠ {error}</p>}
//         </div>

//         <DrawerFooter>
//           <Button onClick={handleSubmit} disabled={isUploading || !selectedFile}>
//             {isUploading ? "Uploading..." : "Summit"}
//           </Button>
//           <DrawerClose>
//             <Button variant="outline">Cancel</Button>
//           </DrawerClose>
//         </DrawerFooter>
//       </DrawerContent>
//     </Drawer>
//   );
// };

// export default UploadDrawer;


///////////////////////////////////////////////////////////////////
"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import FileUpload from "./FileUpload";
import { uploadToS3, getS3Url } from "@/lib/s3";

type UploadDrawerProps = {
  children: React.ReactNode;
  onUploadSuccess?: (fileInfo: { file_key: string; file_name: string }) => void;
};

const UploadDrawer = ({ children, onUploadSuccess }: UploadDrawerProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadResult, setUploadResult] = useState<{ file_key: string; file_name: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!selectedFile) {
      setError("No file selected");
      return;
    }
    setIsUploading(true);
    setError(null);
    setUploadResult(null);

    try {
      const result = await uploadToS3(selectedFile);
      setUploadResult(result);
      setError(null);
      if (onUploadSuccess) {
        onUploadSuccess(result); // Gọi callback khi upload thành công


        /////////////////=======================
        const response = await fetch("http://localhost:8000/api/handle_uploaded_pdf", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            file_url: getS3Url(result.file_key),
            file_name: result.file_name,
          }),
        });
        
        const data = await response.json();
        console.log("Response from FastAPI:", data);
        //======================================
      }
    } catch (err) {
      setError("Upload failed");
    } finally {
      setIsUploading(false);
    }
    
  };

  return (
    <Drawer>
      <DrawerTrigger>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Upload PDF to S3</DrawerTitle>
          <DrawerDescription>Chỉ chấp nhận file PDF.</DrawerDescription>
        </DrawerHeader>

        <FileUpload onFileSelected={setSelectedFile} />

        <div className="p-4">
          {selectedFile && (
            <p className="text-sm text-gray-700">Selected: {selectedFile.name}</p>
          )}
          {uploadResult && (
            <p className="text-green-600 text-sm">
              ✅ Uploaded:{" "}
              <a
                href={getS3Url(uploadResult.file_key)}
                target="_blank"
                rel="noopener noreferrer"
              >
                {uploadResult.file_name}
              </a>
            </p>
          )}
          {error && <p className="text-red-600 text-sm">⚠ {error}</p>}
        </div>

        <DrawerFooter>
          <Button onClick={handleSubmit} disabled={isUploading || !selectedFile}>
            {isUploading ? "Uploading..." : "Summit"}
          </Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default UploadDrawer;
