import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Table,
  TableCell,
  TableContainer,
  TableFooter,
  TableHeader,
  Pagination,
} from "@windmill/react-ui";
import PageTitle from "@/components/Typography/PageTitle";
import { FiEdit, FiTrash2, FiPlus } from "react-icons/fi";
import { useTranslation } from "react-i18next";
import { FiDelete } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";
import { notifySuccess } from "@/utils/toast";
const AddProperty = () => {
  const { t } = useTranslation();
  const token = localStorage.getItem("authToken");
  const [allHomeDetail, setAllHomeDetail] = useState({
    title: "",
    description: "",
    price: "",
    floor_no: "",
    address: "",
    country: "",
    state: "",
    city: "",
    zip: "",
    size: "",
    rooms: "",
    bathrooms: "",
    garages: "",
    garage_size: "",
    basement: "",
    roofing: "",
    available_from: "",
  });
  const [images, setImages] = useState([]);
  const [previewURLs, setPreviewURLs] = useState([]);

  useEffect(() => {
    console.log("Updated state", images);
  }, [allHomeDetail, images]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAllHomeDetail({
      ...allHomeDetail,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);

    const imagePreviews = files.map((file) => URL.createObjectURL(file));
    setPreviewURLs([...previewURLs, ...imagePreviews]);
  };
  let bed = 4;
  let interior_details = ['none','non'];
  let outdoor_details = ['none','non'];
  let utilities = ['none','non'];
  let other_features = ['none','non'];
  const handleSubmit = async () => {
    const formData = new FormData();


    formData.append("title", allHomeDetail.title);
    formData.append("description", allHomeDetail.description);
    formData.append("price", allHomeDetail.price);
    formData.append("address", allHomeDetail.address);
    formData.append("country", allHomeDetail.country);
    formData.append("state", allHomeDetail.state);
    formData.append("city", allHomeDetail.city);
    formData.append("zip", allHomeDetail.zip);
    formData.append("size", allHomeDetail.size);
    formData.append("rooms", allHomeDetail.rooms);
    formData.append("bathrooms", allHomeDetail.bathrooms);
    formData.append("badrooms", bed);
    formData.append("garages", allHomeDetail.garages);
    formData.append("garage_size", allHomeDetail.garage_size);
    formData.append("basement", allHomeDetail.basement);
    formData.append("roofing", allHomeDetail.roofing);
    formData.append("floor_no", allHomeDetail.floor_no);
    formData.append("available_from", allHomeDetail.available_from);
    formData.append("interior_details", interior_details);
    formData.append("outdoor_details", outdoor_details);
    formData.append("utilities", utilities);
    formData.append("other_features",other_features);


    // Append images to the FormData object
    images.forEach((image, index) => {
      formData.append(`photo_${index}`, image);
    });

    // Make the POST request with the FormData object
    try {
      
      const response = await axios.post("http://localhost:5000/api/admin/addHome", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data", 
        },
      });
      notifySuccess("created")
    } catch (error) {
      console.error("Error:", error);
      
    }
  };


  return (
    <>
      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 flex justify-between items-center">
          <PageTitle>{t("Add Properties Here")}</PageTitle>
          <form className=" md:pb-0 grid gap-4 lg:gap-6 xl:gap-6 xl:flex justify-end h-fit">
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/Add-Property">
                <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
                  <Button className="w-full rounded-md h-12" onClick={() => handleSubmit()}>
                    <span className="mr-2">
                      <FiPlus />
                    </span>
                    {t("Save  Property")}
                  </Button>
                </div>
              </Link>
            </div>
          </form>
        </CardBody>
      </Card>

      <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 my-5 p-4">
        <CardBody className="p-0 ">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label htmlFor="photos" className="mb-2 lableClass  flex">
                Photos
              </label>
              <input onChange={handleImageChange} id="photos" name="photos" type="file" />
              <br />
              <div className=" flex">
                {previewURLs.map((previewURL, index) => (
                  <img
                    key={index}
                    src={previewURL}
                    alt={`Preview ${index}`}
                    className="mr-2 mb-2"
                    style={{ maxWidth: "70px" }}
                  />
                ))}
              </div>
            </div>
            <div className="flex flex-col">
              <label htmlFor="title" className="mb-2 lableClass">
                Title
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="title"
                name="title"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter Title"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="description" className="mb-2 lableClass">
                Description
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="description"
                name="description"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter description"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="price" className="mb-2 lableClass">
                Price
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="price"
                name="price"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter price"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="floor_no" className="mb-2 lableClass">
                Floor No
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="floor_no"
                name="floor_no"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter floor no"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="address" className="mb-2 lableClass">
                Address
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="address"
                name="address"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter address"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="country" className="mb-2 lableClass">
                Country
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="country"
                name="country"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter country"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="state" className="mb-2 lableClass">
                State
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="state"
                name="state"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter state"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="city" className="mb-2 lableClass">
                City
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="city"
                name="city"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter city"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="zip" className="mb-2 lableClass">
                ZIP
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="zip"
                name="zip"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter ZIP"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="size" className="mb-2 lableClass">
                Size
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="size"
                name="size"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter size"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="rooms" className="mb-2 lableClass">
                Rooms
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="rooms"
                name="rooms"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter rooms"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="bathrooms" className="mb-2 lableClass">
                Bathrooms
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="bathrooms"
                name="bathrooms"
                className="react-tag-input__input"
                type="number"
                placeholder="Press enter bathrooms"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="garages" className="mb-2 lableClass">
                Garages
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="garages"
                name="garages"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter garages"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="garage_size" className="mb-2 lableClass">
                Garage Size
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="garage_size"
                name="garage_size"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter garage size"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="basement" className="mb-2 lableClass">
                Basement (Yes / No)
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="basement"
                name="basement"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter basement"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="roofing" className="mb-2 lableClass">
                Roofing (Yes / No)
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="roofing"
                name="roofing"
                className="react-tag-input__input"
                type="text"
                placeholder="Press enter roofing"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="available_from" className="mb-2 lableClass">
                Available From
              </label>
              <input
                onChange={(e) => handleInputChange(e)}
                id="available_from"
                name="available_from"
                className="react-tag-input__input"
                type="date"
                placeholder="Press enter available from"
              />
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default AddProperty;
