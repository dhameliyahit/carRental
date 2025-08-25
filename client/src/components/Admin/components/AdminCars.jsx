import React, { useState, useEffect } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const base_url = "http://localhost:9000";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCar, setSelectedCar] = useState(null);

  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  // ✅ Fetch Cars
  const fetchCars = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${base_url}/api/cars`);
      if (res.data.success) {
        setCars(res.data.cars);
      }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching cars:", err);
      setLoading(false);
    }
  };

  // ✅ Add Car
  const addCar = async (data) => {
    try {
      const formData = new FormData();
      Object.keys(data).forEach((key) => {
        if (key === "carImage") {
          formData.append("carImage", data.carImage[0]);
        } else {
          formData.append(key, data[key]);
        }
      });

      await axios.post(`${base_url}/api/create/car`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setShowAddModal(false);
      fetchCars();
    } catch (err) {
      console.error("Error adding car:", err);
    }
  };

  // ✅ Update Car
  const updateCar = async (data) => {
    try {
      const formData = new FormData();

      // Append all fields
      Object.keys(data).forEach((key) => {
        if (data[key]) formData.append(key, data[key]);
      });

      // Append image if selected
      if (data.carImage instanceof File) {
        formData.append("carImage", data.carImage);
      }

      await axios.patch(`${base_url}/api/update/car/${selectedCar._id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Car Info Edit Successfully");
      setShowEditModal(false);
      fetchCars();
    } catch (err) {
      console.error("Error updating car:", err);
      toast.error("Car Info Not Edit");
    }
  };



  // ✅ Delete Car
  const deleteCar = async (id) => {
    if (!window.confirm("Are you sure you want to delete this car?")) return;
    try {
      await axios.delete(`${base_url}/api/delete/car/${id}`);
      toast.success("Car Delete Successfully")
      fetchCars();
    } catch (err) {
      console.error("Error deleting car:", err);
      toast.error("Not Not Deleted")
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  if (loading) return <p className="text-center">Loading cars...</p>;

  return (
    <div className="p-6 bg-gray-900 min-h-screen text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cars Management</h1>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add Car
        </button>
      </div>

      {/* Cars Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div key={car._id} className="card bg-gray-800 shadow-md rounded-xl overflow-hidden">
            <figure className="h-48">
              <img
                src={car.carImage}
                alt={car.carName}
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{car.carName}</h2>
              <p className="text-sm">{car.carYear} • {car.carFuel} • {car.carGear}</p>
              <p className="text-sm">Seats: {car.carSeats} • {car.location}</p>
              <p className="font-bold text-blue-400">${car.carRent}/day</p>

              <div className="flex justify-between mt-4">
                <button
                  className="btn btn-sm btn-warning"
                  onClick={() => { setSelectedCar(car); setShowEditModal(true); }}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-error"
                  onClick={() => deleteCar(car._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Car Modal */}
      {showAddModal && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-800 text-white">
            <h3 className="font-bold text-lg mb-4">Add New Car</h3>
            <CarForm onSubmit={addCar} />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowAddModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Car Modal */}
      {showEditModal && selectedCar && (
        <div className="modal modal-open">
          <div className="modal-box bg-gray-800 text-white">
            <h3 className="font-bold text-lg mb-4">Edit Car</h3>
            <CarForm onSubmit={updateCar} defaultValues={selectedCar} isEdit />
            <div className="modal-action">
              <button className="btn" onClick={() => setShowEditModal(false)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};



const CarForm = ({ onSubmit, defaultValues = {}, isEdit = false }) => {
  const { register, handleSubmit } = useForm({
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Car Name */}
      <input
        {...register("carName", { required: true })}
        placeholder="Car Name"
        className="input input-bordered w-full"
      />

      {/* Category */}
      <select {...register("carCategory", { required: true })} className="select select-bordered w-full">
        <option value="">Select Category</option>
        <option value="Sedan">Sedan</option>
        <option value="SUV">SUV</option>
        <option value="Hatchback">Hatchback</option>
        <option value="Coupe">Coupe</option>
        <option value="Convertible">Convertible</option>
        <option value="Wagon">Wagon</option>
        <option value="Van">Van</option>
        <option value="Pickup">Pickup</option>
        <option value="Sports">Sports</option>
      </select>

      {/* Year */}
      <input {...register("carYear")} placeholder="Car Year" className="input input-bordered w-full" />

      {/* Seats */}
      <input {...register("carSeats", { required: true })} placeholder="Seats" className="input input-bordered w-full" />

      {/* Fuel */}
      <select {...register("carFuel", { required: true })} className="select select-bordered w-full">
        <option value="">Select Fuel</option>
        <option value="Diesel">Diesel</option>
        <option value="Petrol">Petrol</option>
        <option value="Hybrid">Hybrid</option>
      </select>

      {/* Gear */}
      <select {...register("carGear", { required: true })} className="select select-bordered w-full">
        <option value="">Select Gear</option>
        <option value="Manual">Manual</option>
        <option value="Automatic">Automatic</option>
      </select>

      {/* Location */}
      <input {...register("location", { required: true })} placeholder="Location" className="input input-bordered w-full" />

      {/* Rent */}
      <input {...register("carRent", { required: true })} placeholder="Rent Price" className="input input-bordered w-full" />

      {/* Car Image (only required for Add) */}
      {!isEdit && (
        <input type="file" {...register("carImage", { required: true })} className="file-input file-input-bordered w-full" />
      )}

      <button type="submit" className="btn btn-primary w-full">
        {isEdit ? "Update Car" : "Add Car"}
      </button>
    </form>
  );
};


export default AdminCars;
