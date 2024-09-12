"use client"; // Indique que ce fichier est un composant client

import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';

import { title } from "@/components/primitives";

import {
  Bird,
  Book,
  Bot,
  Code2,
  CornerDownLeft,
  LifeBuoy,
  Mic,
  Paperclip,
  Rabbit,
  Settings,
  Settings2,
  Share,
  SquareTerminal,
  SquareUser,
  Triangle,
  Turtle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge";
import { } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import * as XLSX from 'xlsx';
import { BsFillCloudArrowUpFill } from "react-icons/bs";
import { FcImageFile } from "react-icons/fc";
import { FaFilePdf } from "react-icons/fa";
import { FaFileExcel } from "react-icons/fa";
import { FaFile } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
// import styles from '@/app/styles/ExcelTable.module.css';
import  styles  from '@/styles/ExcelTable.module.css';
import Image from 'next/image';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { GoCheckCircleFill } from "react-icons/go";

export default function AboutPage() {
  const [editing, setEditing] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileData, setFileData] = useState<{ name: string; type: string; temps: number | null; src: string | any[][] }[]>([]);
  const [selectedFile, setSelectedFile] = useState<number | null>(null);
  const [loadTime, setLoadTime] = useState<number | null>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLoading, setIsLoading] = useState<boolean>(false); // Pour gérer le chargement
  const [value, setValue] = React.useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAvatarClick = () => {
    setEditing(true);
    document.getElementById("fileInput")?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;

    const newFiles = Array.from(selectedFiles); // Convert FileList to Array
    setFiles([...files, ...newFiles]); // Add new files to the state

    setLoadTime(null);  // Reset load time

    // Start the timer
    const startTime = performance.now();

    for (const file of newFiles) {
      const fileType = file.type;

      // Handle image files
      if (fileType.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const endTime = performance.now();
          const loadTime = endTime - startTime; // Calculer le temps de chargement

          setFileData(prevData => [...prevData, { name: file.name, type: 'image', temps: loadTime, src: reader.result as string }]);
          setEditing(false);
        };
        reader.readAsDataURL(file);
      }
      // Handle PDF files
      else if (fileType === 'application/pdf') {
        const fileURL = URL.createObjectURL(file);
        const endTime = performance.now();
        const loadTime = endTime - startTime; // Calculer le temps de chargement

        setFileData(prevData => [...prevData, { name: file.name, type: 'pdf', temps: loadTime, src: fileURL }]);
        setEditing(false);
      }
      // Handle Excel files (.xlsx, .xls, .csv)
      else if (fileType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
        fileType === 'application/vnd.ms-excel' ||
        fileType === 'text/csv') {
        const reader = new FileReader();
        reader.onload = (event) => {
          const data = event.target?.result;
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
          const endTime = performance.now();
          const loadTime = endTime - startTime; // Calculer le temps de chargement

          setFileData(prevData => [...prevData, { name: file.name, type: 'excel', temps: loadTime, src: jsonData }]);
          setEditing(false);
        };
        reader.readAsBinaryString(file);
      }
    }
  };

  const handleDelete = (index: number) => {
    setFileData(prevData => prevData.filter((_, i) => i !== index));
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
    if (selectedFile === index) setSelectedFile(null); // If the deleted file is selected, clear the preview
  };

  const handleUpload = async () => {
    setIsLoading(true); // Commencer le chargement
    for (const file of files) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("username", "testUser"); // Static user value, replace as needed
      formData.append("id", "12345"); // Static id, replace as needed

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        });
        if (!response.ok) throw new Error("Failed to upload");

        const result = await response.json();

        if (result.message == 'Fichier téléversé avec succès') {
          onOpen();
        }
        console.log('File uploaded:', result);
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
    setIsLoading(false); // Terminer le chargement
  };

  const handleFileClick = (index: number) => {
    if (selectedFile === index) {
      // If the file is already selected, deselect it (hide)
      setSelectedFile(null);
    } else {
      // If the file is not selected, select it (show)
      setSelectedFile(index);
    }
  };

  useEffect(() => {
    if (isCompleted) return; // Ne démarre pas un nouvel intervalle si la progression est terminée

    const interval = setInterval(() => {
      setValue((v) => {
        if (v >= 100) {
          clearInterval(interval); // Nettoyez l'intervalle lorsque la valeur atteint 100
          setIsCompleted(true); // Marquer la progression comme terminée
          return 100; // Assurez-vous que la valeur ne dépasse pas 100
        }
        return v + 10;
      });
    }, 500);

    // Nettoyage de l'intervalle lorsqu'un composant est démonté ou avant de recréer un intervalle
    return () => clearInterval(interval);
  }, [isCompleted]); // Dépendance sur isCompleted




  return (
    <div>
      <div className="grid h-screen w-full pl-[56px]">
        <div className="flex flex-col">
          <header className="sticky top-0 z-10 flex h-[57px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">Playground</h1>
          </header>
          <main className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-2 lg:grid-cols-3">
            <div
              className="relative hidden flex-col items-start gap-8 md:flex" x-chunk="dashboard-03-chunk-0"
            >
              <form className="grid w-full items-start gap-6">
                <fieldset className="grid gap-6 rounded-lg border p-4" style={{ width: '26rem', }}>
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    téléverser
                  </legend>
                  <div onClick={handleAvatarClick} className="grid gap-3">
                    <div className='flex items-center space-x-5 cursor-pointer'>
                      <div className='flex justify-center items-center'>
                        <BsFillCloudArrowUpFill className='w-11 h-11' />
                      </div>
                      <div>Browse Files to Upload</div>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="fileInput"
                    accept="image/*,.pdf,.xlsx,.xls,.csv"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                    multiple // Allows multiple file selection
                  />
                </fieldset>
                <fieldset className="grid gap-6 rounded-lg border p-4" style={{ height: '25rem', overflow: 'auto' }}>
                  <legend className="-ml-1 px-1 text-sm font-medium">
                    Liste
                  </legend>
                  <ul>
                    {fileData.map((file, index) => (
                      <li key={index} className='mb-5 drop-shadow-lg border-b-2 border-gray-200'>
                        <div onClick={() => handleFileClick(index)} className="flex justify-between cursor-pointer items-center hover:bg-gray-100 rounded-md px-2" style={{ height: '5rem' }}>
                          <div>
                            {
                              file.type === 'image' ? (
                                <FcImageFile className='w-8 h-8' />
                              ) : file.type === 'pdf' ? (
                                <FaFilePdf className='w-8 h-8 text-red-600' />
                              ) : file.type === 'excel' ? (
                                <FaFileExcel className='w-8 h-8 text-green-600' />
                              ) : (
                                <FaFile />
                              )
                            }
                          </div>
                          <div>
                            <div>
                              <span className="">
                                {file.name.length > 15 ? `${file.name.substring(0, 25)}...` : file.name}
                              </span>
                            </div>
                            <div className='flex space-x-2 items-center'>
                              <Progress
                                aria-label="Downloading..."
                                size="md"
                                value={value}
                                color="success"
                                showValueLabel={true}
                                className={`${styles.contentProgress} max-w-md`}
                              />
                            </div>
                          </div>
                          <div>
                            <IoClose onClick={() => handleDelete(index)} className='ml-4 text-red-600 w-5 h-5 hover:bg-red-600 hover:text-white cursor-pointer rounded-full' />
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </fieldset>
                {
                  fileData.length ?
                    (
                      <button
                        type="button"
                        onClick={handleUpload}
                        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
                        disabled={isLoading} // Désactiver pendant le chargement
                      >
                        {isLoading ? 'Uploading...' : 'Upload Files'}
                      </button>
                    ) : (
                      <div></div>
                    )
                }
              </form>
            </div>
            <div className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 lg:col-span-2">
              <Badge variant="outline" className="absolute right-3 top-3">
                Vue
              </Badge>
              {/* File preview section */}
              {selectedFile !== null && (
                <div className={`border p-4 my-4`}>
                  {fileData[selectedFile]?.type === 'image' ? (
                    <div className="flex-1">
                      <Image
                        src={fileData[selectedFile].src as string}
                        alt="Uploaded image"
                        width={400}
                        height={400}
                        className='w-full h-full'
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                  ) : fileData[selectedFile]?.type === 'pdf' ? (
                    <div className="flex-1">
                      <embed
                        src={fileData[selectedFile].src as string}
                        type="application/pdf"
                        width="850rem"
                        height="530rem"
                      />
                    </div>
                  ) : fileData[selectedFile]?.type === 'excel' ? (
                    <div className={`${styles.contentFileData} flex-1`}>
                      <table className={styles.excelTable}>
                        <tbody>
                          {(fileData[selectedFile].src as any[][]).map((row, rowIndex) => (
                            <tr key={rowIndex}>
                              {row.map((cell, cellIndex) => (
                                <td
                                  key={cellIndex}
                                  className={styles.excelCell}
                                >
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : null}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Message</ModalHeader>
              <ModalBody>
                <p>
                  Fichier téléversé avec succès
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

    </div>
  );
}
