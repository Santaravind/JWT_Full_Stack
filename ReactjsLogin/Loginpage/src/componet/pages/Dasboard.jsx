import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Header from './Header';
import Footer from './Footer';
import { Outlet, Route } from 'react-router-dom';
function Dasboard() {

  return(
 <>
 <div className=' bg-rose-500 justify-center items-center text-black w-full'>

 Welcome in Dasboard

 </div>

 </>
  )
  
}

export default Dasboard
