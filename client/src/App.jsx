import React, { useEffect, useState } from "react";
import { api } from "./api/api";

export default function App() {
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contact, setContact] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    api.get("/departments").then((r) => setDepartments(r.data));
    api.get("/courses").then((r) => setCourses(r.data));
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await api.post("/contacts", contact);
      setStatus("✅ Message sent!");
      setContact({ name: "", email: "", message: "" });
    } catch (e) {
      setStatus("❌ Failed to send");
    }
  };

  return ( 
    <div className="bg-light min-vh-100 d-flex flex-column">
      {/* Navbar */}
      {/* Navbar */}
<nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top">
  <div className="container">
    <a className="navbar-brand fw-bold" href="#">
      <img src="./src/logo.svg" alt="" style={{ height: "50px", objectFit: "cover" }} />
    </a>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navMenu"
    >
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navMenu">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <a className="nav-link" href="#about">
            About
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#departments">
            Departments
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#courses">
            Courses
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link" href="#contact">
            Contact
          </a>
        </li>
      </ul>
    </div>
  </div>
</nav>


      {/* Main Content */}
      <main className="flex-grow-1">
        {/* Hero Section with Carousel */}
<section className="shadow-sm">
  <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="0" className="active"></button>
      <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="1"></button>
      <button type="button" data-bs-target="#heroCarousel" data-bs-slide-to="2"></button>
    </div>
    <div className="carousel-inner">
      <div className="carousel-item active">
        <img src="./src/college4.avif" className="d-block w-100 carousel-img" alt="College Campus" style={{ height: "500px", objectFit: "cover" }} />
        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2>Welcome to My College</h2>
          <p>Empowering futures, one course at a time.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="./src/college2.webp" className="d-block w-100 carousel-img" alt="Students" style={{ height: "500px", objectFit: "cover" }}  />
        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2>Explore Our Departments</h2>
          <p>From Science to Arts, we offer world-class education.</p>
        </div>
      </div>
      <div className="carousel-item">
        <img src="./src/college3.avif" className="d-block w-100 carousel-img" alt="Library"style={{ height: "500px", objectFit: "cover" }}  />
        <div className="carousel-caption d-none d-md-block bg-dark bg-opacity-50 rounded p-2">
          <h2>Join Our Community</h2>
          <p>Where learning meets innovation and opportunity.</p>
        </div>
      </div>
    </div>
    <button className="carousel-control-prev" type="button" data-bs-target="#heroCarousel" data-bs-slide="prev">
      <span className="carousel-control-prev-icon"></span>
    </button>
    <button className="carousel-control-next" type="button" data-bs-target="#heroCarousel" data-bs-slide="next">
      <span className="carousel-control-next-icon"></span>
    </button>
  </div>
</section>


        {/* About Section */}
        <section id="about" className="py-5">
          <div className="container">
            <h2 className="mb-3">About</h2>
            <p className="text-muted">
              Welcome to our college — where students thrive through excellence
              in academics, research, and community. We are committed to
              building bright futures with quality education.
            </p>
          </div>
        </section>

        {/* Departments Section */}
        <section id="departments" className="py-5 bg-white">
          <div className="container">
            <h2 className="mb-4">Departments</h2>
            <div className="row g-4">
              {departments.map((d) => (
                <div key={d._id} className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">{d.name}</h5>
                      <p className="card-text text-muted">{d.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-5">
          <div className="container">
            <h2 className="mb-4">Courses</h2>
            <div className="row g-4">
              {courses.map((c) => (
                <div key={c._id} className="col-md-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-body">
                      <h5 className="card-title">
                        {c.code} — {c.title}
                      </h5>
                      <p className="card-text text-muted">
                        {c.department?.name}
                      </p>
                      <p className="card-text small">{c.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        {/* Quick Links Section */}
<section className="py-5 bg-light">
  <div className="container">
    <h2 className="mb-4 text-center">Quick Links</h2>
    <div className="row g-4">
      <div className="col-md-4">
        <div className="card h-100 shadow-sm text-center border-0">
          <div className="card-body">
            <i className="bi bi-book-half display-4 text-primary mb-3"></i>
            <h5 className="card-title">View Courses</h5>
            <p className="card-text text-muted">
              Explore our wide range of academic programs designed to help you excel.
            </p>
            <a href="#courses" className="btn btn-outline-primary">
              Explore Courses
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 shadow-sm text-center border-0">
          <div className="card-body">
            <i className="bi bi-pencil-square display-4 text-success mb-3"></i>
            <h5 className="card-title">Apply Now</h5>
            <p className="card-text text-muted">
              Start your application process and take the first step toward your future.
            </p>
            <a href="#contact" className="btn btn-outline-success">
              Apply Online
            </a>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card h-100 shadow-sm text-center border-0">
          <div className="card-body">
            <i className="bi bi-telephone-forward display-4 text-danger mb-3"></i>
            <h5 className="card-title">Contact Us</h5>
            <p className="card-text text-muted">
              Have questions? Get in touch with our admissions team today.
            </p>
            <a href="#contact" className="btn btn-outline-danger">
              Get in Touch
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>



        {/* Contact Section */}
        <section id="contact" className="py-5 bg-white">
          <div className="container">
            <h2 className="mb-4">Contact</h2>
            <div className="row">
              <div className="col-md-6">
                <p>
                  <strong>Address:</strong> 123 College Rd, City
                </p>
                <p>
                  <strong>Phone:</strong> +91-000-000-0000
                </p>
                <p>
                  <strong>Email:</strong> info@college.com
                </p>
              </div>
              <div className="col-md-6">
                <form onSubmit={onSubmit} className="card shadow-sm p-4">
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your name"
                      value={contact.name}
                      onChange={(e) =>
                        setContact({ ...contact, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your email"
                      value={contact.email}
                      onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <textarea
                      rows={4}
                      className="form-control"
                      placeholder="Your message"
                      value={contact.message}
                      onChange={(e) =>
                        setContact({ ...contact, message: e.target.value })
                      }
                      required
                    />
                  </div>
                  <button className="btn btn-primary w-100">Send</button>
                  {status && (
                    <div className="mt-2 text-center text-muted">{status}</div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-primary text-white text-center py-3 mt-auto">
        © {new Date().getFullYear()} RMU all right reserved
      </footer>
    </div>
  );
}
