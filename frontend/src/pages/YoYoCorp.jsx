import React from "react";

function YoYoCorp() {
  return (
    <div className="min-h-screen bg-white text-black">

      {/* Hero Section */}

      <section className="bg-gradient-to-r from-black to-cyan-900 text-white py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="flex flex-col md:flex-row items-center gap-10">

            <div className="flex-1">

              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                YOYO Corp
              </h1>

              <p className="text-xl md:text-2xl text-gray-200 mb-6">
                Building Digital Products, Smart Platforms,
                Data Intelligence & Future Ready Solutions.
              </p>

              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl">
                Explore Our Work
              </button>

            </div>

            <div className="flex-1 flex justify-center">

              <img
                src="/yoyocorp.jpeg"
                alt="YOYO Corp"
                className="w-60 md:w-80 rounded-lg"
              />

            </div>

          </div>

        </div>

      </section>

      {/* About */}

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            About YOYO Corp
          </h2>

          <p className="text-lg text-gray-700 leading-8">
            YOYO Corp is a technology focused digital company
            building innovative web platforms, intelligent
            business systems, survey solutions, AI-powered
            products and student-focused services.
          </p>

          <p className="text-lg text-gray-700 leading-8 mt-5">
            Our mission is to create practical technology
            solutions that help students, businesses and
            communities solve real-world challenges through
            modern web applications and data-driven systems.
          </p>

        </div>

      </section>

      {/* Services */}

      <section className="bg-gray-100 py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold text-center mb-12">
            What We Do
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Web Development
              </h3>

              <p>
                Modern websites, web applications,
                business platforms and digital ecosystems.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                Survey Platforms
              </h3>

              <p>
                Public opinion collection, feedback systems,
                research surveys and analytics.
              </p>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-2xl font-bold mb-4">
                AI Solutions
              </h3>

              <p>
                Intelligent automation, recommendation systems
                and smart digital assistants.
              </p>
            </div>

          </div>

        </div>

      </section>

      {/* Smart Placement Portal */}

      <section className="py-20 px-6">

        <div className="max-w-7xl mx-auto">

          <h2 className="text-4xl font-bold mb-12 text-center">
            Smart Placement Portal
          </h2>

          <div className="grid md:grid-cols-2 gap-10">

            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Student Features
              </h3>

              <ul className="space-y-3">
                <li>✓ Profile Management</li>
                <li>✓ Resume Upload</li>
                <li>✓ Company Listings</li>
                <li>✓ Application Tracking</li>
                <li>✓ Placement Dashboard</li>
              </ul>
            </div>

            <div className="bg-white shadow-xl rounded-2xl p-8">
              <h3 className="text-2xl font-bold mb-4">
                Admin Features
              </h3>

              <ul className="space-y-3">
                <li>✓ Company Management</li>
                <li>✓ Application Monitoring</li>
                <li>✓ Recruitment Tracking</li>
                <li>✓ Placement Analytics</li>
                <li>✓ Student Management</li>
              </ul>
            </div>

          </div>

        </div>

      </section>

      {/* Survey */}

      <section className="bg-black text-white py-20 px-6">

        <div className="max-w-6xl mx-auto">

          <h2 className="text-4xl font-bold mb-8">
            Survey & Public Opinion
          </h2>

          <p className="text-lg leading-8">
            We build survey systems that help organizations
            understand public sentiment, collect valuable
            insights and generate actionable reports through
            large-scale data collection and analysis.
          </p>

          <div className="mt-8 bg-gray-900 p-6 rounded-xl">

            <p className="text-cyan-400 font-bold">
              <a href="https://survey.yoyocorp.online/">survey.yoyocorp.online</a>
              
            </p>

          </div>

        </div>

      </section>

      {/* Vision */}

      <section className="py-20 px-6">

        <div className="max-w-6xl mx-auto text-center">

          <h2 className="text-5xl font-bold mb-8">
            Our Vision
          </h2>

          <p className="text-xl text-gray-700 leading-9">
            To create impactful digital products that empower
            students, businesses and communities through
            innovation, intelligence and accessible technology.
          </p>

        </div>

      </section>

      {/* Footer */}

      <footer className="bg-black text-white py-10">

        <div className="max-w-7xl mx-auto text-center">

          <h2 className="text-3xl font-bold mb-3">
            YOYO Corp
          </h2>

          <p className="text-gray-400">
            Building The Future Through Technology
          </p>

          <p className="mt-5 text-cyan-400">
            www.yoyocorp.online
          </p>

        </div>

      </footer>

    </div>
  );
}

export default YoYoCorp;