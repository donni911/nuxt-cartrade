import cars from "@/data/cars.json";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler((e) => {
  const { city } = e.context.params;
  const { make, minPrice, maxPrice } = getQuery(e);

  let filteredCars = cars;

  filteredCars = filteredCars.filter((car) => {
    return car.city.toLowerCase() === city.toLowerCase();
  });

  const filters = {
    city: city.toLowerCase(),
  };

  if (make) {
    filters.make = make;
  }

  if (minPrice || maxPrice) {
    filters.price = {};
  }

  if (minPrice) {
    filters.price.gte = parseInt(minPrice);
  }

  if (maxPrice) {
    filters.price.lte = parseInt(maxPrice);
  }

  return prisma.car.findMany({
    where: filters,
  });
});
