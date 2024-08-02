import { useState, useEffect } from 'react';
import {
  FaReact,
  FaFileCode,
  FaFileImage,
  FaFolder,
  FaFolderOpen,
  FaFile,
  FaFileAlt,
  FaCss3Alt,
  FaJs,
} from 'react-icons/fa';

const Recursive = ({ data, onUpdateData }) => {
  const [openFolders, setOpenFolders] = useState({});
  const [newName, setNewName] = useState('');
  const [isCreatingFolder, setIsCreatingFolder] = useState(true);
  const [creatingInFolder, setCreatingInFolder] = useState(null);
  const [inputTimer, setInputTimer] = useState(null);

  useEffect(() => {
    if (inputTimer) {
      clearTimeout(inputTimer);
    }
    if (creatingInFolder !== null) {
      const timer = setTimeout(() => {
        setCreatingInFolder(null);
        setNewName('');
      }, 10000);
      setInputTimer(timer);
    }
    return () => {
      if (inputTimer) {
        clearTimeout(inputTimer);
      }
    };
  }, [creatingInFolder]);

  const toggleFolder = (id) => {
    setOpenFolders((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getFileIcon = (name) => {
    if (name.endsWith('.jsx')) {
      return <FaReact className="inline" color="blue" />;
    }
    if (
      name.endsWith('.png') ||
      name.endsWith('.jpg') ||
      name.endsWith('.jpeg')
    ) {
      return <FaFileImage className="inline" color="grey" />;
    }
    if (
      name.endsWith('.json') ||
      name.endsWith('.md') ||
      name.endsWith('.config.js')
    ) {
      return <FaFileAlt className="inline" />;
    }
    if (name.endsWith('.js')) {
      return <FaJs className="inline" color="yellow" />;
    }
    if (name.endsWith('.css')) {
      return <FaCss3Alt className="inline" color="blue" />;
    }
    return <FaFile className="inline" />;
  };

  const getFolderIcon = (id) => {
    return openFolders[id] ? (
      <FaFolderOpen className="inline" />
    ) : (
      <FaFolder className="inline" />
    );
  };

  const handleCreate = (parentId) => {
    if (newName.trim() === '') return;

    const newItem = {
      id: Date.now(),
      isFolder: !isCreatingFolder,
      name: newName,
      items: isCreatingFolder ? [] : undefined,
    };

    const addItem = (data) => {
      for (let item of data) {
        if (item.id === parentId) {
          item.items = item.items || [];
          item.items.push(newItem);
          return true;
        }
        if (item.isFolder && addItem(item.items)) {
          return true;
        }
      }
      return false;
    };

    const updatedData = [...data];
    addItem(updatedData);
    onUpdateData(updatedData);
    setNewName('');
    setCreatingInFolder(null);
  };

  return (
    <div className="text-white text-[1.5rem] w-full m-5">
      {data.map((files) => (
        <div key={files.id} className="mb-2">
          {files.isFolder ? (
            <>
              <div className="flex items-center">
                <h1
                  onClick={
                    files.items.length > 0
                      ? () => toggleFolder(files.id)
                      : undefined
                  }
                  className={`cursor-${
                    files.items.length > 0 ? 'pointer' : 'default'
                  } ${
                    openFolders[files.id] ? 'text-green-500' : 'text-blue-500'
                  }`}
                >
                  {getFolderIcon(files.id)} {files.name}
                </h1>
                <div className="ml-4">
                  {creatingInFolder === files.id ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder={`New ${
                          isCreatingFolder ? 'Folder' : 'File'
                        } Name`}
                        className="p-1 border border-gray-300 rounded-sm text-black bg-gray-100 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                      />
                      <button
                        onClick={() => handleCreate(files.id)}
                        className="bg-blue-500 text-white text-sm p-1 rounded-sm hover:bg-blue-600 transition"
                      >
                        Create {isCreatingFolder ? 'Folder' : 'File'}
                      </button>
                      <button
                        onClick={() => setIsCreatingFolder((prev) => !prev)}
                        className="bg-gray-500 text-white text-sm p-1 rounded-sm hover:bg-gray-600 transition"
                      >
                        Switch to {isCreatingFolder ? 'File' : 'Folder'}
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setCreatingInFolder(files.id)}
                      className="bg-green-500 text-white text-sm p-1 rounded-sm hover:bg-green-600 transition"
                    >
                      New {isCreatingFolder ? 'Folder' : 'File'}
                    </button>
                  )}
                </div>
              </div>
              {openFolders[files.id] && files.items.length > 0 && (
                <div className="ml-6">
                  <Recursive data={files.items} onUpdateData={onUpdateData} />
                </div>
              )}
            </>
          ) : (
            <div className="flex items-center">
              {getFileIcon(files.name)}{' '}
              <span className="ml-2">{files.name}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Recursive;
