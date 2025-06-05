// Mock data for drivers
export const mockDrivers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=33',
    vehicle: 'Toyota Camry',
    licensePlate: 'ABC-1234',
    status: 'active',
    safetyScore: 87,
    lastTrip: '2025-07-10T15:30:00'
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=23',
    vehicle: 'Honda Accord',
    licensePlate: 'XYZ-5678',
    status: 'active',
    safetyScore: 92,
    lastTrip: '2025-07-10T14:15:00'
  },
  {
    id: '3',
    name: 'Michael Brown',
    email: 'mike.brown@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    vehicle: 'Ford F-150',
    licensePlate: 'DEF-9012',
    status: 'inactive',
    safetyScore: 75,
    lastTrip: '2025-07-09T08:45:00'
  },
  {
    id: '4',
    name: 'Emily Davis',
    email: 'emily.d@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    vehicle: 'Chevrolet Malibu',
    licensePlate: 'GHI-3456',
    status: 'active',
    safetyScore: 88,
    lastTrip: '2025-07-10T09:20:00'
  },
  {
    id: '5',
    name: 'David Wilson',
    email: 'david.w@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=15',
    vehicle: 'Nissan Altima',
    licensePlate: 'JKL-7890',
    status: 'suspended',
    safetyScore: 62,
    lastTrip: '2025-07-08T16:10:00'
  },
  {
    id: '6',
    name: 'Jennifer Martinez',
    email: 'jen.m@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=25',
    vehicle: 'Hyundai Sonata',
    licensePlate: 'MNO-1234',
    status: 'active',
    safetyScore: 90,
    lastTrip: '2025-07-10T12:40:00'
  },
  {
    id: '7',
    name: 'Robert Taylor',
    email: 'rob.t@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=60',
    vehicle: 'Kia Optima',
    licensePlate: 'PQR-5678',
    status: 'active',
    safetyScore: 85,
    lastTrip: '2025-07-10T10:15:00'
  },
  {
    id: '8',
    name: 'Lisa Anderson',
    email: 'lisa.a@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?img=45',
    vehicle: 'Mazda 6',
    licensePlate: 'STU-9012',
    status: 'inactive',
    safetyScore: 78,
    lastTrip: '2025-07-07T14:30:00'
  }
];

// Mock data for alerts
export const mockAlerts = [
  {
    id: '1',
    driverName: 'John Smith',
    driverId: '1',
    vehicleId: 'ABC-1234',
    type: 'drowsy',
    timestamp: '2025-07-10T14:35:00',
    location: 'Highway 101, Mile 45',
    duration: '15 seconds'
  },
  {
    id: '2',
    driverName: 'Sarah Johnson',
    driverId: '2',
    vehicleId: 'XYZ-5678',
    type: 'distracted',
    timestamp: '2025-07-10T13:20:00',
    location: 'Main Street & 5th Ave',
    duration: '8 seconds'
  },
  {
    id: '3',
    driverName: 'David Wilson',
    driverId: '5',
    vehicleId: 'JKL-7890',
    type: 'drunk',
    timestamp: '2025-07-08T15:45:00',
    location: 'Interstate 95, Exit 23',
    duration: '30 seconds'
  },
  {
    id: '4',
    driverName: 'Emily Davis',
    driverId: '4',
    vehicleId: 'GHI-3456',
    type: 'drowsy',
    timestamp: '2025-07-10T08:50:00',
    location: 'County Road 18',
    duration: '12 seconds'
  },
  {
    id: '5',
    driverName: 'Michael Brown',
    driverId: '3',
    vehicleId: 'DEF-9012',
    type: 'distracted',
    timestamp: '2025-07-09T08:30:00',
    location: 'Riverside Drive',
    duration: '10 seconds'
  },
  {
    id: '6',
    driverName: 'Jennifer Martinez',
    driverId: '6',
    vehicleId: 'MNO-1234',
    type: 'drowsy',
    timestamp: '2025-07-10T12:15:00',
    location: 'Highway 280, Mile 32',
    duration: '20 seconds'
  },
  {
    id: '7',
    driverName: 'Robert Taylor',
    driverId: '7',
    vehicleId: 'PQR-5678',
    type: 'distracted',
    timestamp: '2025-07-10T09:40:00',
    location: 'Oak Street & Pine Ave',
    duration: '6 seconds'
  },
  {
    id: '8',
    driverName: 'David Wilson',
    driverId: '5',
    vehicleId: 'JKL-7890',
    type: 'drunk',
    timestamp: '2025-07-08T16:00:00',
    location: 'Interstate 95, Exit 28',
    duration: '25 seconds'
  },
  {
    id: '9',
    driverName: 'John Smith',
    driverId: '1',
    vehicleId: 'ABC-1234',
    type: 'drowsy',
    timestamp: '2025-07-10T15:10:00',
    location: 'Highway 101, Mile 52',
    duration: '18 seconds'
  },
  {
    id: '10',
    driverName: 'Sarah Johnson',
    driverId: '2',
    vehicleId: 'XYZ-5678',
    type: 'distracted',
    timestamp: '2025-07-10T13:50:00',
    location: 'Washington Blvd',
    duration: '7 seconds'
  }
];

// Mock data for user trips
export const mockUserTrips = [
  {
    id: '1',
    name: 'Morning Delivery Route',
    date: '2025-07-10T08:30:00',
    from: 'Warehouse District',
    to: 'Downtown Shopping Center',
    distance: '12.5 km',
    duration: '45 minutes',
    safetyScore: 92
  },
  {
    id: '2',
    name: 'Airport Transfer',
    date: '2025-07-09T14:15:00',
    from: 'City Center',
    to: 'International Airport',
    distance: '28.3 km',
    duration: '55 minutes',
    safetyScore: 88
  },
  {
    id: '3',
    name: 'Suburban Delivery',
    date: '2025-07-08T10:45:00',
    from: 'Distribution Center',
    to: 'Oakwood Suburbs',
    distance: '15.7 km',
    duration: '35 minutes',
    safetyScore: 90
  },
  {
    id: '4',
    name: 'Evening Shift',
    date: '2025-07-07T18:20:00',
    from: 'Company HQ',
    to: 'Northern District',
    distance: '18.2 km',
    duration: '40 minutes',
    safetyScore: 85
  },
  {
    id: '5',
    name: 'Cross-town Transport',
    date: '2025-07-06T12:30:00',
    from: 'East End Terminal',
    to: 'West Side Mall',
    distance: '22.1 km',
    duration: '50 minutes',
    safetyScore: 87
  },
  {
    id: '6',
    name: 'Hospital Supply Run',
    date: '2025-07-05T09:15:00',
    from: 'Medical Warehouse',
    to: 'General Hospital',
    distance: '8.4 km',
    duration: '25 minutes',
    safetyScore: 95
  },
  {
    id: '7',
    name: 'Industrial Zone Route',
    date: '2025-07-04T11:40:00',
    from: 'Central Depot',
    to: 'Manufacturing District',
    distance: '16.9 km',
    duration: '38 minutes',
    safetyScore: 89
  },
  {
    id: '8',
    name: 'School District Run',
    date: '2025-07-10T07:30:00',
    from: 'Bus Terminal',
    to: 'Educational Complex',
    distance: '9.2 km',
    duration: '30 minutes',
    safetyScore: 94
  }
];

// Mock data for user alerts
export const mockUserAlerts = [
  {
    id: '1',
    type: 'drowsy',
    timestamp: '2025-07-10T09:15:00',
    location: 'Highway 101, Mile 45',
    duration: '15 seconds',
    details: 'Detected repeated blinking and head nodding'
  },
  {
    id: '2',
    type: 'distracted',
    timestamp: '2025-07-09T14:40:00',
    location: 'Main Street & 5th Ave',
    duration: '8 seconds',
    details: 'Phone usage detected while driving'
  },
  {
    id: '3',
    type: 'drowsy',
    timestamp: '2025-07-08T16:20:00',
    location: 'Interstate 95, Exit 23',
    duration: '12 seconds',
    details: 'Detected eye closure for extended period'
  },
  {
    id: '4',
    type: 'distracted',
    timestamp: '2025-07-07T11:05:00',
    location: 'Riverside Drive',
    duration: '10 seconds',
    details: 'Attention diverted from road for extended period'
  },
  {
    id: '5',
    type: 'drowsy',
    timestamp: '2025-07-06T15:35:00',
    location: 'Highway 280, Mile 32',
    duration: '18 seconds',
    details: 'Repeated yawning and slow eye movements detected'
  },
  {
    id: '6',
    type: 'distracted',
    timestamp: '2025-07-10T08:50:00',
    location: 'Oak Street & Pine Ave',
    duration: '6 seconds',
    details: 'Eyes off road, possibly checking dashboard'
  },
  {
    id: '7',
    type: 'drowsy',
    timestamp: '2025-07-09T17:25:00',
    location: 'Highway 101, Mile 52',
    duration: '14 seconds',
    details: 'Head drooping detected during straight stretch'
  }
];