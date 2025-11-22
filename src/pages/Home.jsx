import DashboardLayout from "../partials/DashboardLayout";

import PlantProductionChart from "../partials/charts/PlantProductionChart";
import PlantPerformanceChart from "../partials/charts/PlantPerformanceChart";
import PlantDowntimeChart from "../partials/charts/PlantDowntimeChart";
import PlantQualityChart from "../partials/charts/PlantQualityChart";

import Slider from "react-slick";   // <-- makes Slider available
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

import MachineCard from "../partials/MachineCard";


function Home() {

  const machinesWiseProduction = [
   {
     id: "M1",
     name: "M/C1",
     expected: 500,
     actual: 480,
     productivity: "96%",
   },
   {
     id: "M2",
     name: "M/C2",
     expected: 600,
     actual: 540,
     productivity: "90%",
   },
   {
     id: "M3",
     name: "M/C3",
     expected: 400,
     actual: 300,
     productivity: "75%",
   },
   {
     id: "M4",
     name: "M/C4",
     expected: 400,
     actual: 300,
     productivity: "75%",
   },
   {
     id: "M5",
     name: "M/C5",
     expected: 400,
     actual: 300,
     productivity: "75%",
   },
  ];

  const machinePerformance = [
    {
      id: "M1",
      name: "M/C1",
      expectedQty: 500,
      actualQty: 480,
      plannedCT: 1.2, // Cycle Time in minutes
      actualCT: 1.3,
      performance: "92.3%",
    },
    {
      id: "M2",
      name: "M/C2",
      expectedQty: 600,
      actualQty: 540,
      plannedCT: 1.0,
      actualCT: 1.1,
      performance: "90.9%",
    },
    {
      id: "M3",
      name: "M/C3",
      expectedQty: 400,
      actualQty: 300,
      plannedCT: 1.5,
      actualCT: 2.0,
      performance: "75.0%",
    },
    {
      id: "M4",
      name: "M/C4",
      expectedQty: 700,
      actualQty: 650,
      plannedCT: 0.9,
      actualCT: 1.0,
      performance: "93.0%",
    },
    {
      id: "M5",
      name: "M/C5",
      expectedQty: 550,
      actualQty: 500,
      plannedCT: 1.1,
      actualCT: 1.2,
      performance: "90.9%",
    },
  ];

  const machineAvailability = [
    {
      id: "M1",
      name: "M/C1",
      totalShiftTime: 480,       // in minutes
      plannedProductionTime: 450, // in minutes
      runTime: 430,               // in minutes
      downtime: 50,               // in minutes
      availability: "89.6%",      // (runTime / plannedProductionTime) * 100
    },
    {
      id: "M2",
      name: "M/C2",
      totalShiftTime: 480,
      plannedProductionTime: 460,
      runTime: 420,
      downtime: 60,
      availability: "91.3%",
    },
    {
      id: "M3",
      name: "M/C3",
      totalShiftTime: 480,
      plannedProductionTime: 440,
      runTime: 350,
      downtime: 90,
      availability: "79.5%",
    },
    {
      id: "M4",
      name: "M/C4",
      totalShiftTime: 480,
      plannedProductionTime: 470,
      runTime: 460,
      downtime: 20,
      availability: "97.9%",
    },
    {
      id: "M5",
      name: "M/C5",
      totalShiftTime: 480,
      plannedProductionTime: 450,
      runTime: 430,
      downtime: 40,
      availability: "95.5%",
    },
  ];

  const machineQuality = [
  {
    id: "M1",
    name: "M/C1",
    totalProducedQty: 480,
    rejectedQty: 20,
    goodQty: 460,       // totalProducedQty - rejectedQty
    quality: "95.8%",   // (goodQty / totalProducedQty) * 100
  },
  {
    id: "M2",
    name: "M/C2",
    totalProducedQty: 540,
    rejectedQty: 30,
    goodQty: 510,
    quality: "94.4%",
  },
  {
    id: "M3",
    name: "M/C3",
    totalProducedQty: 300,
    rejectedQty: 15,
    goodQty: 285,
    quality: "95.0%",
  },
  {
    id: "M4",
    name: "M/C4",
    totalProducedQty: 650,
    rejectedQty: 40,
    goodQty: 610,
    quality: "93.8%",
  },
  {
    id: "M5",
    name: "M/C5",
    totalProducedQty: 500,
    rejectedQty: 25,
    goodQty: 475,
    quality: "95.0%",
  },
];


  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: false,      
    variableWidth: false, 
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <DashboardLayout>
      <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-9xl mx-auto">
        
        {/* Cards */}
        <div className="grid grid-cols-12 gap-6">

          {/* Plant vs actual pm  */}
          <div className="col-span-12 md:col-span-6 h-72 p-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2">PM (Plan vs Actual)</h2>
            {/* <PlantProductionChart chartData={chartData} /> */}
            <PlantProductionChart />
          </div>
        
        
          {/* PM Table  */}
          <div className="col-span-12 md:col-span-6 p-4 h-72  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2">PM TABLE </h2>
          </div>

           {/* Plant vs actual HC  */}
          <div className="col-span-12 md:col-span-6 h-72 p-4 bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2">HC (Plan vs Actual)</h2>
            {/* <PlantProductionChart chartData={chartData} /> */}
            <PlantProductionChart />
          </div>
        
        
          {/* HC Table  */}
          <div className="col-span-12 md:col-span-6 p-4 h-72  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2">HC TABLE </h2>
          </div>
        
          {/*  Top 5 Break Down Duration and Occurance  */}
          <div className="col-span-12 md:col-span-6 p-4 h-72  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2">Top 5 BreakDown Duration and OCCURENCE </h2>
          </div>
        </div>

        {/*  Spare part table   */}
          <div className="col-span-12 md:col-span-6 p-4 h-72  bg-white dark:bg-gray-800 shadow-xs rounded-xl">
            <h2 className="font-semibold mb-2"> spare part table </h2>
          </div>
        </div>
    </DashboardLayout>
  );
}

export default Home;
