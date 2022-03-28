import React from 'react';
import { Link } from 'react-router-dom';

export default function Cards() {
  return (
    <section className="mb-10 mt-10 md:mb-24 md:mt-24 container mx-auto md:grid grid-cols-12 gap-6">
      <div className="md:col-span-12 md:mb-5">
        <h3 className="mb-5 text-purple leading-tight text-4xl md:text-5xl uppercase">
          Be the first to know!
        </h3>
      </div>

      <Link to="/playtoearn/training" className="md:col-span-4">
        <div
          className="md:col-span-4 p-8 rounded-2xl border-2 border-gray-600 mb-5 bg-purple-100"
          aria-label="Training"
        >
          <h3 className="text-white uppercase text-3xl mb-3">Training</h3>
          <p className="text-white opacity-50 leading-tight mb-10">
            Train your golfers or earn cash as a trainer. Learn how now!
          </p>
        </div>
      </Link>

      <Link to="/playtoearn/proshop" className="md:col-span-4">
        <div
          className="md:col-span-4 p-8 rounded-2xl border-2 border-gray-600 mb-5 bg-purple-100"
          aria-label="Pro Gear"
        >
          <h3 className="text-white uppercase text-3xl mb-3">Pro Gear</h3>
          <p className="text-white opacity-50 leading-tight mb-10">
            Buy gear to level up your game! Earn cash by becoming a pro shop
            owner. Learn how now!
          </p>
        </div>
      </Link>
    </section>
  );
}
