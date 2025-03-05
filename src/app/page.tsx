//"use client";
import { getAllEvents } from '@/server/actions/event';
import { NextResponse } from 'next/server';
//import { GET } from "@/app/api/events/route"
//require('dotenv').config()
//import dbConnect from "@/utils/db-connect";
//import React from 'react';
//import { Button } from "@mui/material";
//import mongoose from "mongoose";
//import Script from "next/script";

export default async function Home() {
  //console.log(process.env.MONGODB_URI)
  /*mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });*/
  //console.log(getAllEvents());
  console.log(JSON.parse(JSON.stringify(await getAllEvents())));
  //<Button onClick={createPressed}>Create Event</Button>
  // let test: NextResponse = {}
  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
}
