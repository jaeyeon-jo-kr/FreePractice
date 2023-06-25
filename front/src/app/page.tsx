'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Page = () => {
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();
  const [content, setContent] = useState<String|ArrayBuffer>("");

  const files = acceptedFiles.map((file:File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const readCsv = () => {
    const reader = new FileReader();
    reader.addEventListener("load", (event) => {
      uploadCsv(reader.result)
    })
    reader.readAsText(acceptedFiles[0])
  }

  const createURL = (csvContent:any) => {
    return "http://localhost:8000/upload?csv=" + csvContent
  }

  const uploadCsv = (csvContent:any) => {
    const url = createURL(csvContent)
    fetch(url,  
      {
        method:"GET"
      }
    )
    .then(res=>console.debug("file uploaded :",res))
    .catch(res=>console.error("file error : ", res))
  }

  const clickUploadCsv = () => {
    if(acceptedFiles[0])
    { 
      readCsv()
    }
  }

  return (
    <main>
    <section className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <p>Drag drop some file here, or click to select file</p>
      </div>
      <aside>
        <h4>Files</h4>
        <ul>{files}</ul>
      </aside>
      <button onClick={clickUploadCsv}>
        Click to upload file
      </button>
    </section>
    </main>
  );
  
}

export default Page;
