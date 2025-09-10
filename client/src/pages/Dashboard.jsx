import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, setAuthToken } from "../api/api";

export default function Dashboard() {
  const nav = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [courses, setCourses] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Modal form states
  const [deptForm, setDeptForm] = useState({ _id: null, name: "", description: "" });
  const [courseForm, setCourseForm] = useState({ _id: null, title: "", code: "", department: "", description: "" });

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) return nav("/admin");
    setAuthToken(t);
    loadAll();
  }, []);

  const loadAll = async () => {
    const [d, c] = await Promise.all([api.get("/departments"), api.get("/courses")]);
    setDepartments(d.data);
    setCourses(c.data);
    try {
      const r = await api.get("/contacts");
      setContacts(r.data);
    } catch {}
  };

  // ===== Departments CRUD =====
  const saveDepartment = async (e) => {
    e.preventDefault();
    if (deptForm._id) {
      await api.put(`/departments/${deptForm._id}`, deptForm);
    } else {
      await api.post("/departments", deptForm);
    }
    setDeptForm({ _id: null, name: "", description: "" });
    loadAll();
  };

  const editDepartment = (d) => setDeptForm(d);
  const deleteDepartment = async (id) => {
    if (window.confirm("Delete this department?")) {
      await api.delete(`/departments/${id}`);
      loadAll();
    }
  };

  // ===== Courses CRUD =====
  const saveCourse = async (e) => {
    e.preventDefault();
    if (courseForm._id) {
      await api.put(`/courses/${courseForm._id}`, courseForm);
    } else {
      await api.post("/courses", courseForm);
    }
    setCourseForm({ _id: null, title: "", code: "", department: "", description: "" });
    loadAll();
  };

  const editCourse = (c) =>
    setCourseForm({
      _id: c._id,
      title: c.title,
      code: c.code,
      department: c.department?._id,
      description: c.description,
    });

  const deleteCourse = async (id) => {
    if (window.confirm("Delete this course?")) {
      await api.delete(`/courses/${id}`);
      loadAll();
    }
  };

  return (
    <div className="container-fluid min-vh-100 bg-light">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-3">
        <a className="navbar-brand fw-bold" href="#">Admin Dashboard</a>
        <button
          className="btn btn-outline-light ms-auto"
          onClick={() => {
            localStorage.removeItem("token");
            nav("/admin");
          }}
        >
          Logout
        </button>
      </nav>

      {/* Content */}
      <div className="container py-4">
        {/* Departments Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Departments</h5>
            <button
              className="btn btn-sm btn-success"
              data-bs-toggle="modal"
              data-bs-target="#deptModal"
              onClick={() => setDeptForm({ _id: null, name: "", description: "" })}
            >
              + Add Department
            </button>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {departments.map((d) => (
                  <tr key={d._id}>
                    <td>{d.name}</td>
                    <td>{d.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#deptModal"
                        onClick={() => editDepartment(d)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteDepartment(d._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Courses Section */}
        <div className="card mb-4 shadow-sm">
          <div className="card-header d-flex justify-content-between align-items-center">
            <h5 className="mb-0">Courses</h5>
            <button
              className="btn btn-sm btn-success"
              data-bs-toggle="modal"
              data-bs-target="#courseModal"
              onClick={() => setCourseForm({ _id: null, title: "", code: "", department: "", description: "" })}
            >
              + Add Course
            </button>
          </div>
          <div className="card-body">
            <table className="table table-hover">
              <thead>
                <tr>
                  <th>Code</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>Description</th>
                  <th style={{ width: "150px" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {courses.map((c) => (
                  <tr key={c._id}>
                    <td>{c.code}</td>
                    <td>{c.title}</td>
                    <td>{c.department?.name}</td>
                    <td>{c.description}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-primary me-2"
                        data-bs-toggle="modal"
                        data-bs-target="#courseModal"
                        onClick={() => editCourse(c)}
                      >
                        Edit
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => deleteCourse(c._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Contacts Section */}
        <div className="card shadow-sm">
          <div className="card-header">
            <h5 className="mb-0">Contact Submissions</h5>
          </div>
          <div className="card-body">
            <ul className="list-group">
              {contacts.map((ct) => (
                <li key={ct._id} className="list-group-item">
                  <strong>{ct.name}</strong> ({ct.email}) — {ct.message}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Department Modal */}
      <div className="modal fade" id="deptModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={saveDepartment} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{deptForm._id ? "Edit Department" : "Add Department"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-3"
                placeholder="Name"
                value={deptForm.name}
                onChange={(e) => setDeptForm({ ...deptForm, name: e.target.value })}
                required
              />
              <textarea
                className="form-control"
                placeholder="Description"
                value={deptForm.description}
                onChange={(e) => setDeptForm({ ...deptForm, description: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Course Modal */}
      <div className="modal fade" id="courseModal" tabIndex="-1" aria-hidden="true">
        <div className="modal-dialog">
          <form onSubmit={saveCourse} className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{courseForm._id ? "Edit Course" : "Add Course"}</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input
                className="form-control mb-3"
                placeholder="Course Code"
                value={courseForm.code}
                onChange={(e) => setCourseForm({ ...courseForm, code: e.target.value })}
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Title"
                value={courseForm.title}
                onChange={(e) => setCourseForm({ ...courseForm, title: e.target.value })}
                required
              />
              <select
                className="form-select mb-3"
                value={courseForm.department}
                onChange={(e) => setCourseForm({ ...courseForm, department: e.target.value })}
                required
              >
                <option value="">Select Department</option>
                {departments.map((d) => (
                  <option key={d._id} value={d._id}>
                    {d.name}
                  </option>
                ))}
              </select>
              <textarea
                className="form-control"
                placeholder="Description"
                value={courseForm.description}
                onChange={(e) => setCourseForm({ ...courseForm, description: e.target.value })}
              />
            </div>
            <div className="modal-footer">
              <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
