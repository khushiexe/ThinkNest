import React, { createContext, useState , useContext } from 'react';
import axios from "axios" ;
import { AppContext} from "../context/AppContext";
import {toast} from "react-toastify";

export const AdminContext = createContext();

const AdminContextProvider = (props) => {

  const [aToken, setAToken] = useState( localStorage.getItem("aToken") ? localStorage.getItem("aToken") : "");
  const { backendUrl } = useContext(AppContext);
  const [tutors, setTutors] = useState([]);
  const [sessions , setSessions ] = useState([]) ;

  const getAllTutors = async () => {
    try {
      const { data } = await axios.post( backendUrl + "/api/admin/all-tutors",{},{ headers: { aToken } });
      if (data.success) {
        setTutors(data.tutors);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAllSessions = async () => {
    try {

        const { data } = await axios.get( backendUrl + "/api/admin/sessions",{ headers: { aToken } });
        if (data.success) {
            setSessions(data.sessions);
        }else {
            toast.error(data.message);
        }
    }catch (error) {
        console.log(error);
        toast.error(error.message);
    }
  };

  const value = { aToken, setAToken , getAllTutors,tutors,getAllSessions,sessions,setSessions};

  return (
    <AdminContext.Provider value={value}>
      {props.children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;