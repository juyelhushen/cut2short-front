import React from "react";

const Features = () => {
  return (
    <section className="w-full px-20 bg-gray-100 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-8">Why Choose Cut2Short?</h2>
        <p className="text-gray-600 mb-12">
          A simple, powerful tool to manage your links and analyze their
          performance.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-lg font-bold mb-2">Easy Link Shortening</h3>
            <p className="text-gray-600">
              Simplify your links and share them anywhere.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-lg font-bold mb-2">Advanced Analytics</h3>
            <p className="text-gray-600">
              Track your link clicks and engagement data.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-md">
            <h3 className="text-lg font-bold mb-2">Seamless Integrations</h3>
            <p className="text-gray-600">
              Connect with other tools and platforms effortlessly.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
