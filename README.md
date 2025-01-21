# Pinterest Clone: Full-Stack Web Application

## **Try Pinterest Clone Live**: [https://shreyask.in/projects/pinterest-clone/demo](https://shreyask.in/projects/pinterest-clone/demo)
## **Watch Pinterest Clone Demo**: [Watch Demo Here](https://shreyask.in/projects/pinterest-clone/#demo)

This project is a full-stack Pinterest clone built using **React.js** for the frontend and **Node.js with Express.js** for the backend. It includes features like **Google Authentication**, **Firestore Database**, **AWS S3 for image uploads**, and much more. Hosted on **Oracle Cloud**, the application replicates core functionalities of Pinterest, providing users with a seamless image upload and exploration experience.

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Features and Functionalities](#features-and-functionalities)
- [Technology Stack](#technology-stack)
- [Known Issues and Areas for Improvement](#known-issues-and-areas-for-improvement)
- [Changelog](#changelog)
- [Conclusion](#conclusion)

## Introduction

The Pinterest Clone is designed to mimic key functionalities of the Pinterest platform, offering users the ability to explore images, upload personal content, and manage their uploads through an intuitive and user-friendly interface. It integrates powerful backend technologies, cloud storage, and real-time database management to offer a scalable and efficient solution.

## Project Overview

This project incorporates a **React.js** frontend connected to a **Node.js** backend, hosted on **Oracle Cloud**. The application allows users to sign in via **Google Authentication** or use email-based login. The platform utilizes **Firestore Database** to manage user data, and images are stored in **AWS S3** for quick retrieval. With pages like **Explore**, **MyPins**, and **Profile**, users can easily browse, upload, and organize their content.

## Features and Functionalities

- **Google Authentication**: 
  - Users can sign in with Google or register via email for secure access to the platform.
  
- **Image Upload & Management**: 
  - Users can upload images to **AWS S3**, which are stored and displayed on the **Explore** and **MyPins** pages.
  
- **Explore Page**: 
  - Browse all uploaded content in a clean, user-friendly interface.
  
- **MyPins Page**: 
  - Manage personal uploads and content once signed in.
  
- **Profile Page**: 
  - Access and update user-specific details (currently under development).
  
- **Search Functionality**: 
  - Search for images by title or description to easily find specific content.

- **Firestore Database**: 
  - Efficiently stores user details, uploaded images, and metadata for seamless access.

- **Responsive Design**: 
  - Designed to work on various devices (currently in progress).

## Technology Stack

- **Frontend**: 
  - React.js
  - HTML5
  - CSS
  - JavaScript
  
- **Backend**: 
  - Node.js
  - Express.js
  
- **Database**: 
  - Firebase Firestore
  
- **Cloud Storage**: 
  - AWS S3 for image uploads
  
- **Authentication**: 
  - Google Authentication for secure sign-ins
  
- **Hosting**: 
  - Oracle Cloud
  
- **Version Control**: Git

## Known Issues and Areas for Improvement

### 1. **Search Functionality**  
- The search feature currently works only on the homepage and does not function across other pages. This will be improved in future updates.

### 2. **Responsiveness**  
- The website is not fully responsive and requires adjustments for proper display across all devices.

### 3. **Profile Page**  
- A dedicated user profile page is missing and will be implemented in a future update.

### 4. **Save and Share Buttons**  
- The save and share buttons are not functional yet, and will be added in upcoming releases.

### 5. **Image Upload Preview**  
- The application currently does not display a preview of images being uploaded. This functionality will be added for better user experience.

### 6. **Performance Issues**  
  - The website experiences slow loading times due to large bundled file sizes.
  - Some chunks exceed 500 kB after minification, which affects the website's performance. To address this, code-splitting and other performance optimization techniques will be explored in future versions.

### 7. **Direct Link Issue**  
- When navigating directly to `https://shreyask.in/projects/pinterest-clone/demo/my-pins`, users are shown a loading screen instead of the sign-up prompt. This will be fixed in the next update.

### 8. **Upload Metadata**  
  - The timestamp and uploader's name need to be displayed correctly. Additionally, the title should have a character limit, while the description can be long. Currently, the description can be very long and appears when hovering over the image.

### 9. **Email OTP for Sign-Up**  
  - The sign-up process does not include an OTP (One-Time Password) for email verification. This will be implemented in future updates.

## Changelog

### **Version 1.0**  
#### **Frontend**  
- Implemented the **Explore Page** to showcase all uploaded images.  
- Built **MyPins Page** for users to manage their personal uploaded images.  
- Added **Google Authentication** for secure user login and registration.  
- Developed **Search Functionality** to search images by title or description.  
- Created basic **Responsive Design**, though not fully optimized across all devices.  

#### **Backend**  
- Established a **Node.js** server with **Express.js** for API routes.  
- Integrated **Firestore Database** to store user data and image metadata.  
- Configured **AWS S3** to store uploaded images securely.  

#### **Authentication & Cloud Storage**  
- Integrated **Google Authentication** for user sign-up and login.  
- Set up **AWS S3 Bucket** to handle image uploads efficiently.  
- Configured **Firestore Database** for storing user information and image details.

---

## Conclusion

The Pinterest Clone is a feature-rich, full-stack application that replicates essential functionalities of the Pinterest platform, including image uploads, user authentication, and content management. While there are some known issues and areas for improvement, the project demonstrates the use of modern web technologies and cloud services to build a scalable, efficient, and user-friendly web application.

