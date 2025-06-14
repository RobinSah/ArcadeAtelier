import React, { useState, useEffect } from 'react';
import CustomerDashboard from './CustomerDashboard';
import AdminDashboard from './AdminDashboard';

interface DashboardProps {
  userType: 'customer' | 'admin';
}

export default function Dashboard({ userType }: DashboardProps) {
  if (userType === 'admin') {
    return <AdminDashboard />;
  } else {
    return <CustomerDashboard />;
  }
}