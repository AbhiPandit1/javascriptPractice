import { useState } from 'react';
import Recursive from './Recursive';

const File = () => {
  // State to manage file/folder data
  const [data, setData] = useState([
    {
      id: 1,
      isFolder: true,
      name: 'src',
      items: [
        {
          id: 2,
          isFolder: true,
          name: 'assets',
          items: [
            { id: 3, isFolder: false, name: 'logo.png' },
            { id: 4, isFolder: false, name: 'styles.css' },
          ],
        },
        {
          id: 5,
          isFolder: true,
          name: 'components',
          items: [
            {
              id: 6,
              isFolder: true,
              name: 'Navbar',
              items: [
                { id: 7, isFolder: false, name: 'Navbar.jsx' },
                { id: 8, isFolder: false, name: 'Navbar.css' },
              ],
            },
            {
              id: 9,
              isFolder: true,
              name: 'Footer',
              items: [
                { id: 10, isFolder: false, name: 'Footer.jsx' },
                { id: 11, isFolder: false, name: 'Footer.css' },
              ],
            },
            { id: 12, isFolder: false, name: 'Button.jsx' },
            { id: 13, isFolder: false, name: 'Card.jsx' },
          ],
        },
        {
          id: 14,
          isFolder: true,
          name: 'pages',
          items: [
            { id: 15, isFolder: false, name: 'Home.jsx' },
            { id: 16, isFolder: false, name: 'About.jsx' },
            { id: 17, isFolder: false, name: 'Contact.jsx' },
            { id: 18, isFolder: false, name: 'Profile.jsx' },
          ],
        },
        {
          id: 19,
          isFolder: true,
          name: 'hooks',
          items: [
            { id: 20, isFolder: false, name: 'useFetch.js' },
            { id: 21, isFolder: false, name: 'useForm.js' },
          ],
        },
        {
          id: 22,
          isFolder: true,
          name: 'context',
          items: [
            { id: 23, isFolder: false, name: 'AuthContext.js' },
            { id: 24, isFolder: false, name: 'ThemeContext.js' },
          ],
        },
        {
          id: 25,
          isFolder: true,
          name: 'utils',
          items: [
            { id: 26, isFolder: false, name: 'constants.js' },
            { id: 27, isFolder: false, name: 'helpers.js' },
          ],
        },
        { id: 28, isFolder: false, name: 'App.jsx' },
        { id: 29, isFolder: false, name: 'index.js' },
        { id: 30, isFolder: false, name: 'index.css' },
      ],
    },
    {
      id: 31,
      isFolder: false,
      name: 'package.json',
    },
    {
      id: 32,
      isFolder: false,
      name: 'README.md',
    },
    {
      id: 33,
      isFolder: false,
      name: '.gitignore',
    },
    {
      id: 34,
      isFolder: false,
      name: 'webpack.config.js',
    },
  ]);

  // Function to update the data
  const updateData = (updatedData) => {
    setData(updatedData);
  };

  return (
    <div className="min-h-[100vh] bg-black p-4">
      <Recursive data={data} onUpdateData={updateData} />
    </div>
  );
};

export default File;
