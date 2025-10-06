# React Frontend Example Project

![React](https://img.shields.io/badge/React-19.x-61dafb?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6?logo=typescript&logoColor=white)
![RSuite](https://img.shields.io/badge/RSuite-5.x-ff6f61?logo=rsuite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Why This Project

This project was built as a **frontend showcase** to demonstrate my ability to design scalable and maintainable React applications that consume a RESTful API.
It highlights skills in **TypeScript**, **React Query**, **TailwindCSS**, and **RSuite**, while emphasizing clean architecture, reusable components, and real-world data integration with a **Laravel 12** backend.

---

## Overview

A modern **React + TypeScript** frontend built with **TailwindCSS**, **RSuite**, and **React Query**, designed to interact with a **Laravel 12** API backend.
This project demonstrates scalable frontend architecture, clean component design, and efficient data fetching using React Query.

---

## Features

- Built with **React 19** and **TypeScript**
- API integration with React Query for optimized data fetching and caching
- Styled with **TailwindCSS** and **RSuite** components
- Reusable component and hook structure
- Environment-based API configuration
- Ready for deployment and integration with the Laravel backend

---

## Tech Stack

- **Framework**: React (Vite)
- **Language**: TypeScript
- **Styling**: TailwindCSS + RSuite UI components
- **Data Fetching**: React Query
- **Build Tool**: Vite

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/AlderF-dev/simple-taskboard.git
cd AlderF-dev/simple-taskboard
```

### 2. Install dependencies

```bash
yarn install
```

### 3. Run the development server

```bash
yarn dev
```

Frontend will be available at:
`http://localhost:5173` (default for Vite)

---

## API Integration

This frontend consumes the Laravel API project:
👉 [Backend Repository](https://github.com/AlderF-dev/simple-taskboard-api)

Example React Query usage:

```ts
import { useQuery } from "@tanstack/react-query";

const fetchItems = async () => {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/items`);
  return res.json();
};

export const useItems = () => {
  return useQuery({ queryKey: ["items"], queryFn: fetchItems });
};
```

---

## License

This project is licensed under the [MIT License](LICENSE).
