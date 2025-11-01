import { Company } from "../models/company.model.js";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloud.js";

// REGISTER COMPANY
export const registerCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    if (!companyName) {
      return res.status(400).json({ message: "Company name is required", success: false });
    }

    const existingCompany = await Company.findOne({ name: companyName, userId: req.id });
    if (existingCompany) {
      return res.status(409).json({ message: "Company already exists", success: false });
    }

    const company = await Company.create({
      name: companyName,
      userId: req.id,
    });

    res.status(201).json({ message: "Company registered successfully", success: true, company });
  } catch (error) {
    console.error("Error in registerCompany:", error);
    res.status(500).json({ message: "Internal server error", success: false });
  }
};

// GET ALL COMPANIES FOR LOGGED-IN USER
export const getAllCompanies = async (req, res) => {
  try {
    const companies = await Company.find({ userId: req.id });

    if (!companies || companies.length === 0) {
      return res.status(404).json({ message: "No companies found", success: false });
    }

    res.status(200).json({ success: true, companies });
  } catch (error) {
    console.error("Error in getAllCompanies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// GET COMPANY BY ID
export const getCompanyById = async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    res.status(200).json({ success: true, company });
  } catch (error) {
    console.error("Error in getCompanyById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// UPDATE COMPANY DETAILS
export const updateCompany = async (req, res) => {
  try {
    let { name, description, website, location } = req.body;

    // If using "companyName" in frontend instead of "name"
    if (!name && req.body.companyName) {
      name = req.body.companyName;
    }

    const updateData = { name, description, website, location };

    // Logo upload only if a file is provided
    if (req.file) {
      const fileUri = getDataUri(req.file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      updateData.logo = cloudResponse.secure_url;
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true });

    if (!company) {
      return res.status(404).json({ message: "Company not found", success: false });
    }

    res.status(200).json({ message: "Company updated successfully", success: true, company });
  } catch (error) {
    console.error("Error in updateCompany:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
