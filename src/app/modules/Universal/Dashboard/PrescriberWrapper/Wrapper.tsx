import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../PrescriberWrapper/Header/Header';
import './Wrapper.css'
import Profile from './Profile/Profile';
import CreatePatient from './CreatePatient/CreatePatient';
// Define interface for prescriber data


const Wrapper = () => {
  const { id } = useParams<{ id: string }>();
  
  return (
    <>
      <Header />
      {id ? <Profile id={id} /> : <p>No ID provided</p>}
      {id ? <CreatePatient /> : <p>No ID provided</p>}
    </>
  );
};

export default Wrapper;
