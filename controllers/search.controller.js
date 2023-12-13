const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class SearchController {
	static async searchProducts(req, res) {
		try {
			const { q } = req.query;

			// by name or on description
			const products = await prisma.product.findMany({
				where: {
					OR: [
						{ name: { contains: q, mode: "insensitive" } },
						{ description: { contains: q, mode: "insensitive" } },
					],
				},
			});

			res.status(200).json({
				status: "success",
				data: products,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}

	static async filterProductsByCategory(req, res) {
		try {
			const { category } = req.params;

			// by category
			const products = await prisma.product.findMany({
				where: {
					category: { contains: category, mode: "insensitive" },
				},
			});

			res.status(200).json({
				status: "success",
				data: products,
			});
		} catch (error) {
			console.error(error);
			res.status(500).json({ error: "Internal Server Error" });
		}
	}
}

module.exports = SearchController;
