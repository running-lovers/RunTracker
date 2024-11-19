'use client'

import React, { useState } from "react";

const HomePage: React.FC = () => {
  
  const handleLogin = async() => {
    try {
      const res = await fetch('http://localhost:8080/api/strava/auth')
      const data = await res.json()
      window.location.href = data.authUrl
    } catch (error) {
      console.error('Error initiating Strava auth:', error)
    }
  }

  return (
    <div>
      {/* Header */}
      <header className="bg-black text-white flex justify-between items-center p-5">
        <div className="text-2xl font-bold">RunTracker</div>
        <div>
          <button 
            onClick={handleLogin}
            className="text-white mr-4">Log In</button>
          <button className="bg-orange-500 text-white px-5 py-2 rounded">Join for Free</button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-[url('https://web-assets.strava.com/assets/landing-pages/_next/static/media/ALP-hero-bg-running-xxlarge@2x.633e3580.webp')] bg-cover bg-center text-center text-white py-40 px-5">
        <h1 className="text-5xl font-bold mb-4">Train With the Free Running App</h1>
        <p className="text-xl mb-6">Track and share activities. Analyze your progress. Stay motivated.</p>
        <button className="bg-orange-500 text-white px-8 py-3 text-lg rounded">Join for Free</button>
      </section>

      {/* Features Section */}
      <section className="text-center py-16 px-5">
        <h2 className="text-4xl font-bold mb-4">More Than a Running Tracker</h2>
        <p className="text-lg mb-10">
          Strava gives you the tools to reach your fitness goals. From first steps to ultra-marathons, take your training to the next level. Get the free running app today.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-40">
          {/* Feature 1 */}
          <div className="max-w-xs text-center">
            <img src="https://web-assets.strava.com/assets/landing-pages/_next/static/media/ALP-tracker-activity-running-en-US@1x.c143bb29.png" alt="Share Your Achievements" className="w-full h-52 object-cover rounded mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Share Your Achievements</h3>
            <p className="text-base">
              Get encouragement from friends and fellow runners around the world.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="max-w-xs text-center">
            <img src="https://web-assets.strava.com/assets/landing-pages/_next/static/media/ALP-tracker-you-running-en-US@1x.8eeda7d0.png" alt="Analyze Your Progress" className="w-full h-52 object-cover rounded mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Analyze Your Progress</h3>
            <p className="text-base">
              See a detailed breakdown of each run, plus an overall look at how you’re improving.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="max-w-xs text-center">
            <img src="https://web-assets.strava.com/assets/landing-pages/_next/static/media/ALP-tracker-maps-running-en-US@1x.0ef6263a.png" alt="Explore New Routes" className="w-full h-52 object-cover rounded mb-4"/>
            <h3 className="text-2xl font-semibold mb-2">Explore New Routes</h3>
            <p className="text-base">
              Browse popular roads and trails, or go your own way with our running route planner.
            </p>
          </div>
        </div>

        <button className="bg-orange-500 text-white px-8 py-3 text-lg rounded mt-10">Get Started</button>
      </section>
    </div>
  );
};

export default HomePage;