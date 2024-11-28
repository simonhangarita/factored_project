import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const EmployeeScroller = () => {
  const scrollRef = useRef(null);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/employees");
      if (response.ok) {
        const data = await response.json();
        setEmployees(data);
      } else {
        console.error("Failed to fetch employees");
      }
    } catch (error) {
      console.error("Error fetching employees:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchEmployees();
  }, []);

  const scroll = (direction: string) => {
    const scrollAmount = 700;
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getChartData = (skills: string | string[]) => {
    const allSkills = [
      "Python",
      "SQL",
      "JavaScript",
      "CSS",
      "Pandas",
      "HTML",
      "React",
      "Tableau",
      "Java",
    ];
    const data = {
      labels: allSkills,
      datasets: [
        {
          label: "Skill Levels",
          data: allSkills.map((skill) =>
            skills.includes(skill) ? 100 : 0
          ),
          backgroundColor: "lightblue",
          borderColor: "grey",
          borderWidth: 2,
          pointBackgroundColor: "white",
        },
      ],
    };
    return data;
  };

  const chartOptions = {
    responsive: true,
    scale: {
      ticks: {
        beginAtZero: true,
        max: 100,
      },
    },
  };

  if (loading) {
    return <Typography>Loading employees...</Typography>;
  }


    return (
    <Box display="flex" alignItems="center" gap={2}>
      <IconButton onClick={() => scroll("left")}>
        <ArrowBackIosIcon />
      </IconButton>

      <Box
        ref={scrollRef}
        display="flex"
        overflow="auto"
        gap={2}
        sx={{
          backgroundColor: "#003366",
          width: "100%",
          height: "auto",
          scrollBehavior: "smooth",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        {employees.map((employee, index) => (
          <Card key={index} sx={{ minWidth: 800, minHeight: 700 }}>
            <CardMedia
              component="img"
              height="350"
              image={employee.avatar}
              alt="Avatar"
            />
            <CardContent>
              <Typography variant="h6">{employee.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                Position: {employee.role}
              </Typography>
              <Box sx={{ height: 300, width: 300 }}>
                <Radar
                  data={getChartData(employee.skills)}
                  options={chartOptions}
                />
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
      <IconButton onClick={() => scroll("right")}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default EmployeeScroller;
