const Service = require("../models/Service");

const getServices = async (req, res) => {
    try {
        const services = await Service.find().sort({ name: 1 });
        return res.status(200).json({
            count: services.length,
            services
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao listar serviços.",
            error: error.message
        });
    }
};

const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({
                message: "Serviço não encontrado."
            });
        }

        return res.status(200).json(service);
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao obter serviço.",
            error: error.message
        }); 
    }
};

const createService = async (req, res) => { 
    try {
        const { name, description, estimated_time } = req.body;
        
        if (!name || !description || !estimated_time) {
            return res.status(400).json({
                message: "Nome, descrição e tempo estimado são obrigatórios."
            });
        }

        const existingService = await Service.findOne({ name });
        
        if (existingService) {
            return res.status(409).json({
                message: "Já existe um serviço com este nome."
            });
        }
        
        const service = await Service.create({
            name,
            description,
            estimated_time
        });
        
        return res.status(201).json({
            message: "Serviço criado com sucesso.",
            service
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao criar serviço.",
            error: error.message
        });
    }
};

const updateService = async (req, res) => { 
    try {
        const { name, description, estimated_time } = req.body;
        
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({
                message: "Serviço não encontrado."
            });
        }

        service.name = name || service.name;
        service.description = description || service.description;
        service.estimated_time = estimated_time || service.estimated_time;
        
        const updatedService = await service.save();
        
        return res.status(200).json({
            message: "Serviço atualizado com sucesso.",
            service: updatedService
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao atualizar serviço.",
            error: error.message
        });
    }
};

const deleteService = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        
        if (!service) {
            return res.status(404).json({
                message: "Serviço não encontrado."
            });
        }
    
        await service.deleteOne();
    
        return res.status(200).json({
            message: "Serviço eliminado com sucesso."
        });
    } catch (error) {
        return res.status(500).json({
            message: "Erro ao eliminar serviço.",
            error: error.message
        });
    }
};

module.exports = {
    getServices,
    getServiceById,
    createService,
    updateService,
    deleteService
};