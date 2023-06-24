'use client'
import Image from 'next/image'
import styles from './page.module.css'
import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

const Page = () => {
  
  const {acceptedFiles, getRootProps, getInputProps} = useDropzone();

  const files = acceptedFiles.map((file:File) => (
    <li key={file.name}>
      {file.name} - {file.size} bytes
    </li>
  ));

  const uploadCsv = () => {
    const file = acceptedFiles[0];
    const formData = new FormData();
    formData.append('file', file);
    fetch("http://localhost:8000/upload",  
      {
        method:"POST",
        body: formData,
      }
    )
    .then(res=>console.debug("file uploaded :",res))
    .catch(res=>console.error("file error : ", res))
  }

  const clickUploadCsv = () => {
    if(acceptedFiles[0])
    { 
      uploadCsv() 
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
