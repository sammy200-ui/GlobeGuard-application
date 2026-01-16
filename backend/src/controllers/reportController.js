const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const getAllReports = async (req, res) => {
    try {
        const reports = await prisma.report.findMany({
            include: {
                user: {
                    select: { name: true },
                },
            },
            orderBy: { upvotes: 'desc' },
        });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch reports', error: error.message });
    }
};

const createReport = async (req, res) => {
    const { title, type, location, description, userId } = req.body;

    try {
        const report = await prisma.report.create({
            data: {
                title,
                type,
                location,
                description,
                userId: parseInt(userId), // Ensure userId is an integer
            },
        });
        res.status(201).json(report);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create report', error: error.message });
    }
};

module.exports = { getAllReports, createReport };
